import {
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
} from "../../../../Helpers/API";
import { useState, useEffect } from "react";
import useUserAuth from "../../../Auth/Hooks/useUserAuth";
import { Form } from 'react-bootstrap'
const Favorite = (props) => {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUserAuth();

  const restaurant = props.restaurant;
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

  return (
    <div style={{ zIndex: 1 }} onClick={handleFavoriteClick}>
      <Form>
        <Form.Check type="checkbox" label="Favorite" readOnly checked={isFavorite} />
      </Form>
    </div>
  );
};
export default Favorite;
