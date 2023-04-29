import { useNavigate, useRef } from "react-router-dom";

import Categories from "./Categories";
import Transactions from "./Transactions";

import { Container, Row, Col, Badge } from "react-bootstrap";
import styles from "./SearchResult.module.css";
import Rating from "../../UI/Rating/Rating";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import TasteeButton from "../../UI/TasteeButton/TasteeButton";

const SearchResult = (props) => {
  const { user } = useUserAuth();
  const restaurant = props.data;
  const navigate = useNavigate();
  const convertDistance = (distance) => (distance * 0.000621371).toFixed(1);
  const redirectHandler = () => navigate(`/restaurant/${restaurant.id}`)
  return (
    <Container className={`${styles.container} p-3`}>
      <Row className="gy-3">
        <Col xxl={3} lg={4} md={12}>
          <img
            onClick={redirectHandler}
            className={styles.image}
            src={restaurant.image_url}
            alt={restaurant.name}
          ></img>
        </Col>
        <Col className="ps-4">
          <h2 onClick={redirectHandler}>
            {restaurant.name}{" "}
            <Badge bg={restaurant.is_closed ? "danger" : "success"}>
              {restaurant.is_closed ? "Closed" : "Open"}
            </Badge>
          </h2>
          <Rating rating={restaurant.rating} />

          <Categories data={restaurant.categories} />
          {"\n"}
          <Transactions data={restaurant.transactions} />
          {user && <p>{convertDistance(restaurant.distance)} miles</p>}
          <TasteeButton
            onClick={redirectHandler}
          >
            View restaurant
          </TasteeButton>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResult;
