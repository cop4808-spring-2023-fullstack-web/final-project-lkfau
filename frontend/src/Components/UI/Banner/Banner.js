import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.banner} mb-5`}>
      <Container>
        <Row className="gy-4">
          <Col className="text-center text-lg-start" xs={12} lg={6}>
            <h1 className={styles.header}>Food for you</h1>
            <button onClick={()=>{navigate("/login")}} className={`${styles.start} ps-5 pe-5 pt-3 pb-3 mt-3`}>Get Started</button>
          </Col>
          <Col className="text-center text-lg-end" xs={12} lg={6}>
            <h2>
              <span className={styles.accent}>Find</span> quality restaurants.
            </h2>
            <h2 className="mt-3 mb-3">
              <span className={styles.accent}>See</span> descriptive reviews.
            </h2>
            <h2>
              <span className={styles.accent}>Save</span> your favorites.
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
