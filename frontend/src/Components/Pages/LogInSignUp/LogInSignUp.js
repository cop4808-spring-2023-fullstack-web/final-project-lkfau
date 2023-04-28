import { useState } from "react";
import { Form, Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import styles from "./LogInSignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import TasteeButton from "../../UI/TasteeButton/TasteeButton";
const LoginSignup = () => {
  const [section, setSection] = useState("login");
  const { logIn, signUp, logInWithGoogle, forgotPassword } = useUserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (section === "login") {
        logIn(email, password);
      } else if (section === "signup") {
        signUp(email, password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5 mb-5" style={{ width: "100%" }}>
      <Row>
        <Col>
          <Card className={styles["login-card"]}>
            <h1 onClick={() => navigate("/")} className={`mb-4 text-center ${styles.accent}`}>Tastee</h1>
            <Nav
              className={`${styles.nav} w-100 d-flex mb-3`}
              fill
              variant="pills"
              defaultActiveKey="login"
              onSelect={(e) => setSection(e)}
            >
              <Nav.Item>
                <Nav.Link eventKey="login">Log in</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Sign up</Nav.Link>
              </Nav.Item>
            </Nav>

            <Form
              onSubmit={handleSubmit}
              className="h-100 text-white d-flex flex-column text-primary gap-3"
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  style={{color: "white"}}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{color: "white"}}
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center flex-column">
                <TasteeButton
                  type="submit"
                  className={`${styles.button} pt-2 pb-2 mt-3 d-flex justify-content-center`}
                >
                  {section === "login" ? "Log in" : "Sign up"}
                </TasteeButton>
              </div>
            </Form>
            <TasteeButton
              onClick={() => {
                logInWithGoogle();
              }}
              className={`${styles.button} pt-2 pb-2 mt-4 d-flex justify-content-center align-items-center`}
            >
               {section === "login" ? "Log in with " : "Sign up with "} <FontAwesomeIcon icon={faGoogle} className="ps-2" />{" "}
            </TasteeButton>
            {section === "login" && (
              <Button className={`${styles['forgot-password']} ${styles.accent} mt-4`} variant="link" onClick={() => {forgotPassword(email)}}>Forgot password?</Button>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSignup;
