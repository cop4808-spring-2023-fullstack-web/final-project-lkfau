import { addToFavorites, removeFromFavorites, checkFavorite } from '../../../../API/API'
import { useState, useEffect } from 'react';
import useUserAuth from '../../../Auth/Hooks/useUserAuth';
const Favorite= ({business_id, restaurant_name}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {user} = useUserAuth()
  useEffect(() => {
    const checkIsFavorited = async () => {
        console.log("effect")
        try {
          const response = await checkFavorite(user.accessToken, business_id);
          setIsFavorite(response.status === 200);
        } catch (error) {
          console.error(error);
        }
      };
    checkIsFavorited();
  }, [business_id, user.accessToken]);
  

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      try {
        await removeFromFavorites(user.accessToken, business_id);
        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log(user.accessToken)
        console.log(restaurant_name)
        await addToFavorites(user.accessToken, business_id, restaurant_name);
        setIsFavorite(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={() => handleFavoriteClick()}
        />
        Favorite
      </label>
    </div>
  );
  
}
export default Favorite