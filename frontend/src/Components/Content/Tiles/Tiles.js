import { BarLoader } from "react-spinners";
import { Col } from "react-bootstrap";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Tiles.module.css";
import { useNavigate } from "react-router-dom";

const Tiles = (props) => {
  const navigate = useNavigate();
  const getBackgroundImage = (url) =>
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('${url}')`;

  if (props.type === "restaurants") {
    if (props.data) {
      const randomIndex = Math.floor(Math.random() * 5);
      return props.data.businesses
        .filter((i, index) => index >= randomIndex && index < randomIndex + 4)
        .map((restaurant, index) => (
          <Col
            onClick={() => {
              navigate(`/restaurant/${restaurant.id}`);
            }}
            key={index}
            lg={3}
            sm={6}
            xs={12}
            style={{
              aspectRatio: 4 / 3,
              backgroundImage: getBackgroundImage(restaurant.image_url),
            }}
            className={`${styles.tile} p-5`}
          >
            <p className={`${styles.caption} lead`}>{restaurant.name}</p>
          </Col>
        ));
    } else {
      let result = [];
      for (let i = 0; i < 4; i++) {
        result.push(
          <Col
            lg={3}
            sm={6}
            xs={12}
            style={{
              aspectRatio: 4 / 3,
            }}
            key={i}
            className={`${styles.tile} p-5`}
          >
            <BarLoader color="white" />
          </Col>
        );
      }
      return result;
    }
  }
  if (props.type === "categories") {
    const categories = [
      { icon: faBurger, title: "American" },
      { icon: faBowlRice, title: "Asian" },
      { icon: faPizzaSlice, title: "Italian" },
      { icon: faFish, title: "Seafood" },
    ];
    return categories.map((category) => (
      <Col
        lg={3}
        sm={6}
        xs={12}
        key={category.title}
        style={{
          aspectRatio: 4 / 3,
        }}
        className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
      >
        <FontAwesomeIcon
          className={`${styles.icon} pb-2`}
          icon={category.icon}
        />
        <p className={`${styles.caption} lead mb-0`}>{category.title}</p>
      </Col>
    ));
  }
};

export default Tiles;
