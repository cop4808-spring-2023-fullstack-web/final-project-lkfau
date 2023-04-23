import { useContext } from 'react';
import { userAuthContext } from '../Context/Context';

const useUserAuth = () => {
  return useContext(userAuthContext);
}

export default useUserAuth;