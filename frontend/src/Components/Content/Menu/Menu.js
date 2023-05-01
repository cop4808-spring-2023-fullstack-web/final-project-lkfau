// Imported modules and components from files
import React from "react";
import { Container, Row, Alert } from "react-bootstrap";
import styles from "./Menu.module.css";
import useLocationInfo from "../../Auth/Hooks/useLocationInfo";
import Tiles from "../Tiles/Tiles";
import { useEffect, useState } from "react";
import { searchRestaurants } from "../../../Helpers/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

// Menu component is defined 
const Menu = () => {
  // Initializing states
  const [data, setData] = useState();
  const { getLocation } = useLocationInfo();
  const { user } = useUserAuth(); // Getting user authentication state

  // Fetch data from API and update state with the results
  useEffect(() => {
    const getData = async (searchTerm) => {
      getLocation(async (location) => {
        const res = await searchRestaurants(user.accessToken, searchTerm, location);
        if (res.error) {
          console.log(res.error);
          setData('error');
        } else {
          setData(res.data);
        }
      });
    };
    getData();
  }, [getLocation, user.accessToken]);

  // Display an error message is data state is 'error'
  // Otherwise, render the Tiles component with the fetched data
  return (data === 'error' ? <Alert className="mt-5" variant="danger">An error has occurred gathering information.</Alert> : (
    <Container className={`${styles.card} my-5 px-5 py-5`}>
      
        
          <h2 className="text-start">Restaurants near you</h2>
          <Row className="my-5 ps-3 pe-3">
            <Tiles type="restaurants" data={data} />
          </Row>
          <h2 className="text-start">Categories</h2>
          <Row
            className="mt-5 pb-3 ps-3 pe-3"
            style={{
              borderCollapse: "collapse",
            }}
          >
            <Tiles type="categories" />
          </Row>    
    </Container>
  ));
};

export default Menu;
