import React from 'react';
import Ratings from 'react-ratings-declarative';

const Rating = ({ rating }) => {
  return (
    <Ratings rating={rating} widgetRatedColors="var(--accent)" widgetDimension="30px" widgetEmptyColors = "#121821">
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
      <Ratings.Widget widgetDimension="30px" widgetRatedColor="var(--accent)" />
    </Ratings>
  );
};
export default Rating