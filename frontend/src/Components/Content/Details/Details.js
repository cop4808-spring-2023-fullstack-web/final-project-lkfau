import { useEffect, useState } from "react";
import { Col, Row, Badge } from "react-bootstrap";
import Rating from "../../UI/Rating/Rating";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import Reviews from "./Reviews/Reviews";
import FavoriteCheckbox from "./FavoriteCheckbox/FavoriteCheckbox";
import Card from "../../UI/Card/Card";

import getOperatingHours from "../../../Helpers/Hours";

const Details = ({ restaurant, reviews }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  const wideEnough =
    width > 992 && restaurant.photos && restaurant.photos.length;
  const restaurantInfo = (
    <>
      <h1 className="display-6 mb-0">{restaurant.name}</h1>
      <div className="d-flex my-1">
        <Rating size="24px" rating={restaurant.rating} contain={wideEnough} />
        <div className="d-flex flex-column justify-content-center ps-3">
          {restaurant.hours && (
            <Badge bg={restaurant.is_closed ? "success" : "danger"}>
              {restaurant.hours[0].open.is_open_now ? "Open" : "Closed"}
            </Badge>
          )}
        </div>
      </div>
      <FavoriteCheckbox restaurant={restaurant} />
    </>
  );

  return (
    <Card className="p-5">
      <Row className="pb-4">
        <Col>
          {!wideEnough && (
            <>
              {restaurantInfo}
              <h3 className="pt-3 pb-1">Gallery</h3>
            </>
          )}
          <ImageCarousel photos={restaurant.photos}>
            {wideEnough && restaurantInfo}
          </ImageCarousel>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="mb-sm-5 mb-md-0" md={6}>
          <h3>Information</h3>
          <p className="mb-1">Phone: {restaurant.display_phone}</p>
          {restaurant.location.display_address.map((line, index) => (
            <p key={index} className="mb-1">
              {index === 0 ? "Address:" : ""} {line}
            </p>
          ))}
          <a
            className="text-decoration-none"
            href={restaurant.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit restaurant page
          </a>
        </Col>
        {restaurant.hours && (
          <Col md={6}>
            <h3>Hours</h3>
            {getOperatingHours(restaurant.hours).map((hour) => (
              <p className="mb-1" key={hour}>
                {hour}
              </p>
            ))}
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <h3>Reviews ({restaurant.review_count})</h3>
        </Col>
        {reviews && <Reviews reviews={reviews.reviews}></Reviews>}
      </Row>
    </Card>
  );
};

export default Details;
