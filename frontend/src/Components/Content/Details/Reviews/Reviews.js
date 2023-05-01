// Importing Review component
import Review from "./Review";

/*
  Defines Reviews component which takes in a reviews prop. It maps over the array and renders
  for each item in the array. The key prop is set to the id of each review.
*/
const Reviews = ({ reviews }) => {
  return reviews.map(review => <Review key={review.id} review={review} />);
};
export default Reviews;
