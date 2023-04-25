import { useContext } from 'react';
import { userAuthContext } from '../Context/AuthContext';

const useUserAuth = () => {
  return useContext(userAuthContext);
}

export default useUserAuth;