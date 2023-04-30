function getOperatingHours(hours) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const days = {};
  for (const dayOfWeek of daysOfWeek) {
    days[dayOfWeek] = [];
  }

  for (const window of hours[0].open) {
    const dayOfWeek = daysOfWeek[window.day];
    let start = formatTime(window.start);
    let end = formatTime(window.end);
    if (window.is_overnight && end === "12:00 AM") {
      end = "11:59 PM";
    }
    days[dayOfWeek].push(`${start} - ${end}`);
  }

  const result = [];
  for (let i = 0; i < daysOfWeek.length; i++) {
    const currentDay = daysOfWeek[i];
    const currentHours = days[currentDay].join(", ");
    if (currentHours === "") {
      result.push(`${currentDay}: Closed`);
      continue;
    }

    let endDay;
    for (let j = i + 1; j < daysOfWeek.length; j++) {
      const nextDay = daysOfWeek[j];
      const nextHours = days[nextDay].join(", ");
      if (nextHours === currentHours) {
        endDay = nextDay;
        i = j;
      } else {
        break;
      }
    }

    if (endDay) {
      result.push(`${currentDay}-${endDay}: ${currentHours}`);
    } else {
      result.push(`${currentDay}: ${currentHours}`);
    }
  }

  return result;
}

function formatTime(timeString) {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(2));
  const suffix = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes === 0 ? "00" : minutes;
  return `${formattedHours}:${formattedMinutes} ${suffix}`;
}

export default getOperatingHours;