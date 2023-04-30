import { useState, useRef } from "react";

import { Container, Row, Col, Overlay, Tooltip } from "react-bootstrap";
import Rating from "../../../UI/Rating/Rating";

const Review = ({ review }) => {
  const [show, setShow] = useState(false);
  const linkRef = useRef(null);
  const showLinkHandler = () => {
    setShow((show) => !show);
  };
  return (
    <Container className={"pt-4"}>
      <Row>
        <Col xl={3} md={6} className="d-flex justify-content-between">
          <p className="lead" style={{ marginBottom: "0.25rem" }}>
            {review.user.name}
          </p>
          <Rating size="20px" rating={review.rating} />
        </Col>
        <Col xl={9} md={6}>
          <div>
            <a
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
            <Overlay show={show} target={linkRef.current} placement={'top-start'}>
              <Tooltip >Click for full review</Tooltip>
            </Overlay>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
