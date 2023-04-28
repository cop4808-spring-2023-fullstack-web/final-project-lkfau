import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Details.module.css";
import Rating from "./Rating/Rating";
import ImageCarousel from "./ImageCarousel/ImagesCarousel";
const Details = ({ restaurant }) => {
  console.log(restaurant);
  return (
    <Container className={`${styles.card} mb-5 mt-5 p-5`}>
      <Row>
        <Col className="d-flex flex-column" xs={12} lg={6}>
          <h1 className={`${styles.accent}`}>{restaurant.name}</h1>
          <Rating rating={restaurant.rating} />
        </Col>
        <Col xs={12} lg={6} className="d-flex justify-content-center"></Col>
      </Row>
      <Row>
        <Col>
        <h2>Pictures</h2>
        <ImageCarousel photos={restaurant.photos}/>
        </Col>
      </Row>
      <Row>
        <Col>
        <h2>Reviews - {restaurant.review_count}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
