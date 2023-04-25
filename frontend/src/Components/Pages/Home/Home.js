
import useUserAuth from '../../Auth/Hooks/useUserAuth';
import { addToFavorites } from '../../../API/API';
const Home = () => {
  const {user} = useUserAuth()
  
  return (
  <button onClick={()=>{addToFavorites("example business id", user.accessToken)}}>add to favorites</button>
  );
};

export default Home;
