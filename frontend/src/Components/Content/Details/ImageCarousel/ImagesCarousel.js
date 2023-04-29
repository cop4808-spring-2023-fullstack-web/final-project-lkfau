import React from "react";
import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ photos }) => {
  return (
    photos && 
    <Carousel>
      {photos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img
            style={{ height: "500px", objectFit: "contain" }}
            src={photo}
            className="w-100"
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
