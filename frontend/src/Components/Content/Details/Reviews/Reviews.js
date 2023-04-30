import Review from "./Review";
const Reviews = ({ reviews }) => {
  return reviews.map(review => <Review key={review.id} review={review} />);
};
export default Reviews;
