import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Menu.module.css";
import useLocationInfo from "../Auth/Hooks/useLocationInfo";
import { useEffect, useState } from "react";
import { searchRestaurants } from "../../API/API";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader";
const Menu = () => {

  const [data, setData] = useState();

  const { getLocation } = useLocationInfo();

  useEffect(() => {
    const getData = async (searchTerm) => {
      getLocation(async (location) => {
        const res = await searchRestaurants(searchTerm, location);
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.data);
          setData(res.data);
        }
      });
    };
    getData();
  }, [getLocation]);
  return (
    <Container className={`${styles.card} mb-5 mt-5 p-5`}>
      <h2 className="text-start">Restaurants near you</h2>
      <Row className="mb-5 mt-5 pb-5 ps-3 pe-3">
        {data ? (
          data.businesses
            .filter((item, index) => index < 4)
            .map((restaurant, index) => (
              <Col
                key={index}
                lg={3}
                sm={6}
                xs={12}
                style={{
                  aspectRatio: 4 / 3,
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('${restaurant.image_url}')`,
                }}
                className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
              >
                <h3>{restaurant.name}</h3>
              </Col>
            ))
        ) : (
          <>
            <Col
              lg={3}
              sm={6}
              xs={12}
              style={{
                aspectRatio: 4 / 3,
              }}
              className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
            >
              <ClipLoader color="white" />
            </Col>
            <Col
              lg={3}
              sm={6}
              xs={12}
              style={{
                aspectRatio: 4 / 3,
              }}
              className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
            >
              <ClipLoader color="white" />
            </Col>
            <Col
              lg={3}
              sm={6}
              xs={12}
              style={{
                aspectRatio: 4 / 3,
              }}
              className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
            >
              <ClipLoader color="white" />
            </Col>
            <Col
              lg={3}
              sm={6}
              xs={12}
              style={{
                aspectRatio: 4 / 3,
              }}
              className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
            >
              <ClipLoader color="white" />
            </Col>
          </>
        )}
      </Row>
      <h2 className="text-start">Categories</h2>
      <Row
        className="mb-5 mt-5 pb-5 ps-3 pe-3"
        style={{
          borderCollapse: "collapse",
        }}
      >
        <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
        >
          <FontAwesomeIcon style={{ fontSize: "50px" }} icon={faFish} />
          <h3>Seafood</h3>
        </Col>
        <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
        >
          <FontAwesomeIcon style={{ fontSize: "50px" }} icon={faBowlRice} />
          <h3>Chinese</h3>
        </Col>
        <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
        >
          <FontAwesomeIcon style={{ fontSize: "50px" }} icon={faBurger} />
          <h3>Burgers</h3>
        </Col>
        <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
        >
          <FontAwesomeIcon style={{ fontSize: "50px" }} icon={faPizzaSlice} />
          <h3>Italian</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
