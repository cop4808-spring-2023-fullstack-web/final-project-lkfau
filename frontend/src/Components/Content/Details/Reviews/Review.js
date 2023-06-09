// Importing necessary libraries and components
import { useState, useRef } from "react";

import { Container, Row, Col, Overlay, Tooltip } from "react-bootstrap";
import Rating from "../../../UI/Rating/Rating";

// Review component is defined 
const Review = ({ review }) => {
  const [show, setShow] = useState(false);  // State is initialized
  const linkRef = useRef(null);
  const showLinkHandler = () => {
    setShow((show) => !show);
  };
  
  // JSX returned by the component
  return (
    <Container className={"pt-3"}>
      <Row>
        <Col xl={3} lg={4} className="d-flex justify-content-between">
          <p className="lead" style={{ marginBottom: "0.25rem" }}>
            {review.user.name}
          </p>
          <Rating size="20px" rating={review.rating} />
        </Col>
        <Col xl={9} lg={8}>
          <div>
            <a
              className="mt-1"
              style={{cursor: 'pointer', textDecoration: 'none', color: 'white'}}
              href={review.url}
              target="_blank"
              rel="noreferrer"
              ref={linkRef}
              onMouseEnter={showLinkHandler}
              onMouseLeave={showLinkHandler}
            >
              {review.text}
            </a>
            <Overlay show={show} target={linkRef.current} placement={'top'}>
              <Tooltip>Click for full review</Tooltip>
            </Overlay>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
