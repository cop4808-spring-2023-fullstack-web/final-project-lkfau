import React from 'react';
import Rating from '../../../UI/Rating/Rating';

const Reviews = ({ reviews }) => {
  return (
    <>
    {reviews.map((review, index) => (
      <div key={index}>
 
        <p className="lead" style={{marginBottom: 0}}>
        {review.user.name}
        </p>
        <Rating rating={review.rating}/>

        
        <p>{review.text}</p>
        </div>
      ))}
      </>
  );
};
export default Reviews