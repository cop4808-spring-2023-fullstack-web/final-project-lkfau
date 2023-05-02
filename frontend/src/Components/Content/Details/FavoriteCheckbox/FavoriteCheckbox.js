// Importing functions and modules needed 
import {
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
} from "../../../../Helpers/API";
import { useState, useEffect } from "react";
import useUserAuth from "../../../Auth/Hooks/useUserAuth";
import { Form } from 'react-bootstrap'

// Defining Favorite component that receives props
const Favorite = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);  // Initializing state
  const { user } = useUserAuth();  // Getting user object from useUserAuth hook 

  // Extracting restaurant object
  const restaurant = props.restaurant;

  // Using the useEffect hook to check if the restaurant is favorited by the user
  useEffect(() => {
    const checkIsFavorited = async () => {
      try {
        const response = await checkFavorite(user.accessToken, restaurant.id);
        setIsFavorite(response.status === 200);
      } catch (error) {
        console.error(error);
      }
    };
    checkIsFavorited();
  }, [restaurant.id, user.accessToken]);

  // Defining a function to handle when the favorite button is clicked
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      try {
        await removeFromFavorites(user.accessToken, restaurant.id);
        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await addToFavorites(user.accessToken, restaurant.id, restaurant.name);
        setIsFavorite(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Rendering a form with a checkbox for the favorite button
  return (
    <div style={{ zIndex: 1 }} onClick={handleFavoriteClick}>
      <Form>
        <Form.Check type="checkbox" label="Favorite" readOnly checked={isFavorite} />
      </Form>
    </div>
  );
};
export default Favorite;
