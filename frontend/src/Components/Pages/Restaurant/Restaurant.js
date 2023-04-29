import Details from "../../Content/Details/Details";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewBusiness } from "../../../API/API";
import { viewReview } from "../../../API/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

const Restaurant = () => {
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState(null)
  const { business_id } = useParams();
  const { user } = useUserAuth();
  useEffect(() => {
    async function fetchData() {
      const response = await viewBusiness(user.accessToken, business_id);
      if (response.status === 200) {
        setBusiness(response.data);
      } else {
        console.log(`Error fetching business: ${response.error}`);
      }
    }
    async function fetchReview() {
      const response = await viewReview(business_id);
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        console.log(`Error fetching business: ${response.error}`);
      }
    }

    fetchData();
    fetchReview();
  }, [business_id, user.accessToken]);

  if (!business) {
    return <div>Loading...</div>;
  }
  else{
    console.log(business)
    console.log(reviews)
  return <>
<Details restaurant={business} reviews={reviews}/>
  </>
};
}

export default Restaurant;
