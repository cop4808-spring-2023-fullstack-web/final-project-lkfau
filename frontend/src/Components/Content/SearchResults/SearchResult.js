import { useNavigate } from "react-router-dom";

import Categories from "./Categories";
import Transactions from "./Transactions";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./SearchResult.module.css";
import Rating from "../../UI/Rating/Rating";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import TasteeButton from "../../UI/TasteeButton/TasteeButton";
import ResultInfo from "./ResultInfo";
import { removeFromFavorites } from "../../../Helpers/API";

const SearchResult = (props) => {
  const { user } = useUserAuth();
  const location = useLocation();
  const show = location.pathname === "/favorites";
  const restaurant = props.data;
  const navigate = useNavigate();
  const convertDistance = (distance) => (distance * 0.000621371).toFixed(1);
  const redirectHandler = () => navigate(`/restaurant/${restaurant.id}`);
  const removeFavorite = async () => {
    try {
      await removeFromFavorites(user.accessToken, restaurant.id);
      props.setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== restaurant.id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container className={`${styles.container} p-3`}>
      <Row className="d-flex align-items-center gy-3">
        <Col xxl={3} lg={4} md={12}>
          <img
            onClick={redirectHandler}
            className={styles.image}
            src={restaurant.image_url || 'holder.js/100px180'}
            alt={restaurant.name}
          ></img>
        </Col>
        <Col className="ps-4">
          <h2 onClick={redirectHandler}>
            {restaurant.name}{" "}
          </h2>
          <Rating rating={restaurant.rating} />
          <ResultInfo>
            <Categories data={restaurant.categories} />
            <Transactions data={restaurant.transactions} />
            {user && restaurant.distance && (
              convertDistance(restaurant.distance) + " miles"
            )}
          </ResultInfo>
          <div className={styles['button-container']}>

          
          <TasteeButton className={styles.button} onClick={redirectHandler}>
            View restaurant
          </TasteeButton>
          {show && (
            <TasteeButton className={styles.button} onClick={removeFavorite}>
              Remove Favorite
            </TasteeButton>
          )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResult;
