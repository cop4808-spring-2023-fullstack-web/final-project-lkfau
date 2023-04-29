import React from 'react';
import Rating from '../Rating/Rating';

const Reviews = ({ reviews }) => {
  console.log(reviews)
  return (
    <>
    {reviews.map((review, index) => (
      <div key={index}>
        <h1>
        {review.user.name}
        </h1>
        <Rating rating={review.rating}/>
        <p>{review.text}</p>
        </div>
      ))}
      </>
  );
};
export default Reviews