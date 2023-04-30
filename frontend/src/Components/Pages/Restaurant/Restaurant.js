import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Details from "../../Content/Details/Details";
import { viewBusiness } from "../../../API/API";
import { viewReview } from "../../../API/API";
import { PropagateLoader } from "react-spinners";
import { Container, Fade, Alert } from "react-bootstrap";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
const Restaurant = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const { business_id } = useParams();
  const { user } = useUserAuth();
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
    
  }, [data])
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
