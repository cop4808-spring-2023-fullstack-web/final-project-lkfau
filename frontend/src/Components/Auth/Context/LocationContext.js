import { createContext, useState } from "react";

export const locationContext = createContext();

export function LocationContextProvider({ children }) {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) =>
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      );
    }
  };

  return (
    <locationContext.Provider
      value={{
        location,
        getLocation
      }}
    >
      {children}
    </locationContext.Provider>
  );
}
