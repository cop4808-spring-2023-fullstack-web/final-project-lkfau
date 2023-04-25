import { createContext, useState, useCallback} from "react";

export const locationContext = createContext();

export function LocationContextProvider({ children }) {

  const getLocation = useCallback((callback) => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          callback(position.coords);
          // setLocation({
          //   latitude: pos.coords.latitude,
          //   longitude: pos.coords.longitude,
          // })
        }, error => {
          callback(null);
        });
      }
      // if (!locationAdded) {
      //   setLocation("blocked");
      // }
    } catch (err) {
      console.log(err);
      callback(null);
    }
    
  }, []);

  return (
    <locationContext.Provider
      value={{
        getLocation,
      }}
    >
      {children}
    </locationContext.Provider>
  );
}
