import axios from 'axios';
import { getAuth } from 'firebase/auth';
import useUserAuth from '../Components/Auth/Hooks/useUserAuth';
const url = process.env.NODE_ENV === 'production' ? 'https://lkhw10.herokuapp.com' : `http://localhost:5678`


export const searchRestaurants = async(searchTerm, locationData = 'Boca Raton', page = 0) => {
  locationData = locationData ? locationData : 'Boca Raton';
  let response;
  try {
    if (typeof locationData == 'object') {
      response = await fetch(`${url}/api/search?term=${searchTerm}&lat=${locationData.latitude}&long=${locationData.longitude}&page=${page}`);
    } else {
      response = await fetch(`${url}/api/search?term=${searchTerm}&loc=${locationData}`);
    }
  } catch (err) {
    return {
      status: 500,
      error: err
    }
  }
   
  if (response.status >= 200 && response.status <= 299) {
    return {
      status: response.status,
      data: await response.json()
    }
  } else {
    return {
      status: response.status,
      error: response.statusText
    }
  }
}

export const addToFavorites = async (businessId, accessToken) => {
  try {
    const response = await axios.post('http://localhost:5678/api/favorite', { business_id: businessId }, {
      headers: {
        Authorization: `${accessToken}`
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error adding business to favorites');
  }
};