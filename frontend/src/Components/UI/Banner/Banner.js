// Importing libraries and components from files
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";
import TasteeButton from '../TasteeButton/TasteeButton';

// Banner component is defined 
const Banner = () => {
  const navigate = useNavigate(); // Initializing useNavigate hook for navigating to a different route
  return (
    <div className={`${styles.banner} mb-5`}>
      <Container>
        <Row className="gy-5">
          <Col className="text-center text-lg-start" xs={12} lg={6}>
            <h1 className={styles.header}>Food for you</h1>
            <TasteeButton onClick={()=>{navigate("/login")}} className={`${styles.start} px-4 mt-2`}>Get Started</TasteeButton>
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
