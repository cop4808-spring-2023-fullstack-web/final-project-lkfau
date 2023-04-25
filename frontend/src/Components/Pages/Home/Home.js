import { Link } from 'react-router-dom'
import useUserAuth from '../../Auth/Hooks/useUserAuth';
import { addToFavorites } from '../../../API/API';
import { getAuth } from 'firebase/auth';
const Home = () => {
  const {user} = useUserAuth()
  
  return (
  <button onClick={()=>{addToFavorites("example business id", user.accessToken)}}>add to favorites</button>
  );
};

export default Home;
