import { BeatLoader } from 'react-spinners'
import { Col } from 'react-bootstrap';
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Tiles.module.css'

const Tiles = (props) => {
  
  if (props.type === "restaurants") {
    if (props.data) {
      return (
        props.data.businesses
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
            <p className={`${styles.caption} lead`}>{restaurant.name}</p>
          </Col>
        ))
      )
    } else {
      let result = [];
      for (let i=0; i<4; i++) {
        
        result.push(
          <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex justify-content-center align-items-center text-center text-white`}
        >
          <BeatLoader color="white" />
        </Col>
        )
      }
      return result
    }
  }
  if (props.type === "categories") {
    const categories = [
      {icon: faBowlRice, title: "American"},
      {icon: faBurger, title: "Asian"},
      {icon: faPizzaSlice, title: "Italian"},
      {icon: faFish, title: "Seafood"}
    ]
    return (
      
      categories.map(category => 
        <Col
          lg={3}
          sm={6}
          xs={12}
          style={{
            aspectRatio: 4 / 3,
          }}
          className={`${styles.border} p-5 d-flex flex-column justify-content-center align-items-center text-center text-white`}
        >
          <FontAwesomeIcon className={`${styles.icon} pb-2`} icon={category.icon} />
          <p className={`${styles.caption} lead mb-0`}>{category.title}</p>
        </Col>
      )
    );
  }
}

export default Tiles;