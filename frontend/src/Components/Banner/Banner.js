import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.banner}>
      <Container>
        <Row>
          <Col>
            <h1 className={styles.header}>Food for you</h1>
            <Button onClick={()=>{navigate("/login")}} className={[styles.button, "ps-5 pe-5 pt-3 pb-3 mt-3"]} variant="outline-success">Get Started</Button>
          </Col>
          <Col className="text-end subtext">
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
