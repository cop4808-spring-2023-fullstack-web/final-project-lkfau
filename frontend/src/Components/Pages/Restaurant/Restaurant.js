// Imported the modules needed 
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Imported components
import Details from "../../Content/Details/Details";
import { viewBusiness } from "../../../Helpers/API";
import { viewReview } from "../../../Helpers/API";
import { PropagateLoader } from "react-spinners";
import { Container, Fade, Alert } from "react-bootstrap";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

// Restaurant component is defined 
const Restaurant = () => {
  // Declaring state variables 
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const { business_id } = useParams();
  const { user } = useUserAuth();

  // Defining an effect hook to get restaurant details and reviews from the API
  useEffect(() => {
    const getData = async () => {
      const response = await viewBusiness(user.accessToken, business_id);
      if (response.status === 200) {
        setData((data) => ({ ...data, business: response.data }));
        setStatus("success");
      } else {
        setStatus('error');
        console.log(response.error);
      }
    };
    // Defining getReviews component to get reviews for the business from API
    const getReviews = async () => {
      const response = await viewReview(user.accessToken, business_id);
      if (response.status === 200) {
        setData((data) => ({ ...data, reviews: response.data }));
      } else {
        setStatus('error');
        console.log(response.error);
      }
    };
    getData();
    getReviews();
  }, [business_id, user.accessToken]);

  // Defining an effect hook to set status based on data state
  useEffect(() => {
    if (data?.business) {
        if (data.business?.error) {
          setStatus('error');
        } else {
          setStatus('success');
        }

    } else {
      setStatus('loading');
    }
  }, [data]) // Running effect only if there are changes in the data

  // Returning JSX to render on the page
  return (
    <Container className="px-0 mt-5">
      {status === "success" &&
          <Fade in={true} appear={true}>
            <div>
              <Details restaurant={data.business} reviews={data.reviews} />
            </div>
          </Fade>
      }
      {status === "loading" && <div className="d-flex mt-5 pt-5 justify-content-center">
          <PropagateLoader color="var(--accent)" />
        </div>}
      {status === "error" && (
        <Alert className="mt-5" variant="danger">An error has occurred loading the restaurant.</Alert>
      )}
    </Container>
  );
};

export default Restaurant;
