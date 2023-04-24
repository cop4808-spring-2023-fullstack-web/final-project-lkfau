import { useContext } from 'react';
import { locationContext } from '../Context/LocationContext';

const useLocationInfo = () => {
  return useContext(locationContext);
}

export default useLocationInfo;