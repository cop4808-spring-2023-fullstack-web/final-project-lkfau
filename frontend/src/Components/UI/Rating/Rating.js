import React from "react";
import Ratings from "react-ratings-declarative";

const Rating = (props) => {
  return (
    <div className={props.className} style={{marginBottom: '0.5rem'}}>
    <Ratings
      rating={props.rating}
      widgetRatedColors="var(--accent)"
      widgetSpacings="1px"
      widgetDimension="30px"
      widgetEmptyColors="var(--bg)"
    >
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
    </Ratings>
    </div>
  );
};
export default Rating;
