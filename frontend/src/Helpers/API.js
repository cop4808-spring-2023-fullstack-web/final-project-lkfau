const url =
  process.env.NODE_ENV === "production" ? "" : `http://localhost:5678`;

const getConfig = (auth) => {
  return {
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
  };
};

const timeoutFetch = async (url, config) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    let response = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeout);
    return response;
  } catch (err) {
    throw err;
  }
};

const responseHandler = async (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return {
      status: response.status,
      data: await response.json(),
    };
  } else {
    return {
      status: response.status,
      error: response.statusText,
    };
  }
};

export const searchRestaurants = async (
  accessToken,
  searchTerm = "",
  locationData = "Boca Raton",
  page = 0
) => {
  locationData = locationData ? locationData : "Boca Raton";
  try {
    let response;
    if (typeof locationData == "object") {
      response = await timeoutFetch(
        `${url}/api/search?term=${searchTerm}&lat=${locationData.latitude}&long=${locationData.longitude}&page=${page}`,
        getConfig(accessToken)
      );
    } else {
      response = await timeoutFetch(
        `${url}/api/search?term=${searchTerm}&loc=${locationData}`,
        getConfig(accessToken)
      );
    }
    return await responseHandler(response);
  } catch (err) {
    return {
      status: 500,
      error: err,
    };
  }
};

export const addToFavorites = async (
  accessToken,
  business_id,
  restaurant_name
) => {
  try {
    let response = await timeoutFetch(`${url}/api/favorite`, {
      method: "POST",
      ...getConfig(accessToken),
      body: JSON.stringify({ business_id, restaurant_name }),
    });
    return await responseHandler(response);
  } catch (error) {
    console.error(error);
    throw new Error("Error adding business to favorites");
  }
};

export const removeFromFavorites = async (accessToken, business_id) => {
  try {
    let response = await timeoutFetch(`${url}/api/favorite/${business_id}`, {
      method: "DELETE",
      ...getConfig(accessToken),
    });
    return await responseHandler(response);
  } catch (error) {
    console.error(error);
    throw new Error("Error removing business from favorites");
  }
};

export const checkFavorite = async (accessToken, business_id) => {
  try {
    let response = await timeoutFetch(
      `${url}/api/favorite/${business_id}`,

      getConfig(accessToken)
    );
    return await responseHandler(response);
  } catch (error) {
    console.error(error);
    throw new Error("Error adding business to favorites");
  }
};

export const listFavorites = async (
  accessToken,
  restaurant_name = "",
  page
) => {
  try {
    let response = await timeoutFetch(
      `${url}/api/favorites?restaurant_name=${restaurant_name}&page=${page}`,
      getConfig(accessToken)
    );
    return await responseHandler(response);
  } catch (error) {
    console.error(error);
    throw new Error("Error listing favorites");
  }
};

export const viewBusiness = async (accessToken, business_id) => {
  try {
    const response = await timeoutFetch(
      `${url}/api/view/${business_id}`,
      getConfig(accessToken)
    );
    if (response.status >= 200 && response.status <= 299) {
      return {
        status: response.status,
        data: await response.json(),
      };
    } else {
      return {
        status: response.status,
        error: response.statusText,
      };
    }
  } catch (err) {
    return {
      status: 500,
      error: err,
    };
  }
};

export const viewReview = async (accessToken, business_id) => {
  try {
    const response = await timeoutFetch(
      `${url}/api/review/${business_id}`,
      getConfig(accessToken)
    );
    if (response.status >= 200 && response.status <= 299) {
      return {
        status: response.status,
        data: await response.json(),
      };
    } else {
      return {
        status: response.status,
        error: response.statusText,
      };
    }
  } catch (err) {
    return {
      status: 500,
      error: err,
    };
  }
};

export const getAutoComplete = async (accessToken, text) => {
  try {
    const response = await timeoutFetch(
      `${url}/api/autocomplete/${text}`,
      getConfig(accessToken)
    );
    return await responseHandler(response);
  } catch (err) {
    return {
      status: 500,
      error: err,
    };
  }
};
