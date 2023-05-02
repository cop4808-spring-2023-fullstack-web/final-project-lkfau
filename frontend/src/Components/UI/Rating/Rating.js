// Importing modules and components needed
import React from "react";
import Ratings from "react-ratings-declarative";
import Card from "../Card/Card";

// Rating component is needed
const Rating = (props) => {
  
  const size = props.size || "30px"
  const ratings = (
    <Ratings
      rating={props.rating}
      widgetRatedColors="var(--accent)"
      widgetSpacings="1px"
      widgetDimension={size}
      widgetEmptyColors="var(--bg)"
    >
      <Ratings.Widget widgetDimension={size} widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension={size} widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension={size} widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension={size} widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension={size} widgetRatedColor="var(--accent)" />
    </Ratings>
  );
  return props.contain ? (
    <Card
      className={props.className}
      style={{
        width: "fit-content",
        padding: "0.3rem 0.5rem 0.5rem 0.5rem",
        borderRadius: "10px",
      }}
    >
      {ratings}
    </Card>
  ) : (
    <div className={props.className} style={{ marginBottom: "0.5rem" }}>
      {ratings}
    </div>
  );
};
export default Rating;
