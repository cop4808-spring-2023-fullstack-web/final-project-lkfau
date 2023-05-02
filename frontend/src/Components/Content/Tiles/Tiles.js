// Importing the necessary modules and components needed
import { BarLoader } from "react-spinners";
import { Col } from "react-bootstrap";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Tiles.module.css";
import { useNavigate } from "react-router-dom";

// Tiles component is defined to 
const Tiles = (props) => {
  const navigate = useNavigate(); // Creates a navigate function from react-router-dom to navigate between pages
  
  // Function to return background image with linear gradient effect
  const getBackgroundImage = (url) =>
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('${url}')`;

  // If the type of tile is restaurants, then render the restaurant tiles
  if (props.type === "restaurants") {
    if (props.data) {
      const randomIndex = Math.floor(Math.random() * 5); // Generates random number from 0 to 4
      return props.data.businesses
        // Filters out 4 restaurants from the data array starting from randomIndex
        .filter((i, index) => index >= randomIndex && index < randomIndex + 4)
        .map((restaurant, index) => (
          // Constructing a column with onClick function in order to navigate to a new page
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
      // If there is no restaurant data, then render 4 empty tiles with a loading bar
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
  // If type of tile is categories, render the category tiles
  if (props.type === "categories") {
    const categories = [
      { icon: faBurger, title: "American" },
      { icon: faBowlRice, title: "Asian" },
      { icon: faPizzaSlice, title: "Italian" },
      { icon: faFish, title: "Seafood" },
    ];
    // Maps through the categories array and constructs a column with onClick function to navigate to a new page
    return categories.map((category) => (
      <Col
        lg={3}
        sm={6}
        xs={12}
        key={category.title}
        style={{
          aspectRatio: 4 / 3,
        }}
        className={`${styles.tile} p-5 flex-column`}
        onClick={() => navigate(`/search?term=${category.title}`)}
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
