import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./Menu.module.css";
import useLocationInfo from "../../Auth/Hooks/useLocationInfo";
import Tiles from "../Tiles/Tiles";
import { useEffect, useState } from "react";
import { searchRestaurants } from "../../../API/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";



const Menu = () => {

  const [data, setData] = useState();

  const { getLocation } = useLocationInfo();
  const { user } = useUserAuth();

  useEffect(() => {
    const getData = async (searchTerm) => {
      getLocation(async (location) => {
        const res = await searchRestaurants(user.accessToken, searchTerm, location);
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.data);
          setData(res.data);
        }
      });
    };
    getData();
  }, [getLocation, user.accessToken]);
  return (
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
  );
};

export default Menu;
