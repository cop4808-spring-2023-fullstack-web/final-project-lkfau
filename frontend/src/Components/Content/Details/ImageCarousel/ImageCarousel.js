// Importing necessary modules
import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./ImageCarousel.module.css";
const ImageCarousel = (props) => {
  const getBackgroundImage = (url) =>
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('${url}')`;

  // Checks to see if there are photos available 
  // Displays carousel container and creates items with images and index key
  return (
    props.photos && props.photos.length ? (
      <div className={styles.container}>
        <Carousel>
          {props.photos.map((photo, index) => (
            <Carousel.Item className={styles.item} key={index}>
              <div
                style={{
                  backgroundImage: getBackgroundImage(photo),
                }}
                className={styles.image}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={styles.overlay}>{props.children}</div>
      </div>
    ) : <p>No images available.</p>
  );
};

export default ImageCarousel;
