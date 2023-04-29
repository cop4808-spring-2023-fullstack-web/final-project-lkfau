import { addToFavorites, removeFromFavorites, checkFavorite } from '../../../API/API'
import { useState, useEffect } from 'react';
import useUserAuth from '../../Auth/Hooks/useUserAuth';
const Favorite= ({business_id}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {user} = useUserAuth()
  useEffect(() => {
    const checkIsFavorited = async () => {
        console.log("effect")
        try {
          const response = await checkFavorite(business_id, user.accessToken);
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
        await removeFromFavorites(business_id, user.accessToken);
        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await addToFavorites(business_id, user.accessToken);
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