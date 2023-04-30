import { useEffect, useState } from "react";
import { Col, Row, Badge } from "react-bootstrap";
import Rating from "../../UI/Rating/Rating";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import Reviews from "./Reviews/Reviews";
import FavoriteCheckbox from "./FavoriteCheckbox/FavoriteCheckbox";
import Card from "../../UI/Card/Card";
import Categories from "../SearchResults/Categories";
import Transactions from "../SearchResults/Transactions";
const Details = ({ restaurant, reviews }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  const wideEnough = width > 992 && (restaurant.photos && restaurant.photos.length);
  const restaurantInfo = (
    <>
      <h1 className="display-6">{restaurant.name}</h1>
      <div className="d-flex">
        <Rating size="24px" rating={restaurant.rating} contain={wideEnough} />
        <div className="d-flex flex-column justify-content-center ps-3">
          <Badge bg={restaurant.is_closed ? "danger" : "success"}>
            {restaurant.hours.open.is_open_now ? "Closed" : "Open"}
          </Badge>
        </div>
      </div>
      <Categories data={restaurant.categories} />
      <Transactions data={restaurant.transactions} />
      <FavoriteCheckbox restaurant={restaurant} />
    </>
  );

  return (
    <Card className="p-5">
      <Row className="pb-4">
        <Col>
          {!wideEnough && <>
            
            {restaurantInfo}
            <h3 className="pt-4 pb-1">Gallery</h3>
          </>}
          <ImageCarousel photos={restaurant.photos}>
            {wideEnough && restaurantInfo}
          </ImageCarousel>
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <h3>Information</h3>
        </Col>
        <Col xl={6}>
          <h3>Hours</h3>
        </Col>
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
