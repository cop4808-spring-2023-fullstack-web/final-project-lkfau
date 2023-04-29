import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./About.module.css";
import restaurant from "../../../Assets/About/restaurant.jpg";
import favorite from "../../../Assets/About/favorite.jpg";
const About = () => {
  return (
    <Container className={`${styles.card} mb-5 p-5`}>
      <Row
        className="align-items-center gy-5 mb-5 pb-5"
        style={{ borderBottom: `1px solid var(--accent) ` }}
      >
        <Col xs={12} lg={6}>
          <h2>Millions of restaurants at your fingertips.</h2>
          <p>
            Find your favorite restaurants and discover new ones with our
            easy-to-use search tools. Whether you're looking for a quick bite or
            a fine dining experience, we've got you covered. Our app is powered
            by Yelp's public API, so you can be sure you're getting the most
            up-to-date information on restaurants in your area.
          </p>
        </Col>
        <Col xs={12} lg={6} className="d-flex justify-content-center">
          <img src={restaurant} alt="" className="img-fluid" />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs={12} lg={6} className="order-1 order-lg-2 text-lg-end">
          <h2>Save your favorites.</h2>
          <p>
            Keep track of all your favorite restaurants with our easy-to-use
            favorites feature. With just one click, you can add any restaurant
            to your favorites list and access it again later. Never forget a
            great restaurant again!
          </p>
        </Col>
        <Col
          xs={12}
          lg={6}
          className="d-flex justify-content-center order-2 order-lg-1"
        >
          <img src={favorite} alt="" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
