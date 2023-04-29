import React from "react";
import { Col, Container, Row } from "react-bootstrap";
/*import styles from "./Details.module.css";*/
import Rating from "../../UI/Rating/Rating";
import ImageCarousel from "./ImageCarousel/ImagesCarousel";
import Reviews from "./Reviews/Reviews";
import Favorite from "./FavoriteCheckbox/FavoriteCheckbox";
import Card from "../../UI/Card/Card";
const Details = ({ restaurant, reviews }) => {
  return (
    <Card className="p-5">
      <Container>
        <Row>
          <Col className="d-flex flex-column" xs={12} lg={6}>
            <h1 className="display-2">{restaurant.name}</h1>
            <Rating rating={restaurant.rating} />
            <Favorite
              restaurant_name={restaurant.name}
              business_id={restaurant.id}
            />
          </Col>
          <Col xs={12} lg={6} className="d-flex justify-content-center"></Col>
        </Row>
        <Row className="pb-4">
          <Col>
            <h3>Pictures</h3>
            <ImageCarousel photos={restaurant.photos} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Reviews ({restaurant.review_count})</h3>
          </Col>
          {reviews && <Reviews reviews={reviews.reviews}></Reviews>}
        </Row>
      </Container>
    </Card>
  );
};

export default Details;
