import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import styles from "./LogInSignUp.module.css";
const LoginSignup = () => {
  const [section, setSection] = useState("login");
  const { user, logIn, signUp } = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event, confirm) => {
    if (confirm) {
      setConfirmPassword(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (section === "login") {
        logIn(email, password);
      } else if (section === "signup") {
        if (password === confirmPassword) {
          signUp(email, password);
        } else {
          console.log("no")
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigate(`/${section}`);
  }, [section, navigate]);

  return (
    <Container>
      <Row>
        <Col>
          <Card className={styles["login-card"]}>
          <h1 className="text-dark mb-4">Tastee</h1>
            <Nav
              className="w-100 d-flex mb-3"
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
              className="h-100 d-flex flex-column text-primary gap-3"
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {section === "signup" && (
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e, 0)}
                />
              </Form.Group>

              {section === "signup" && (
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Password again</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => handlePasswordChange(e, 1)}
                  />
                </Form.Group>
              )}
              <div className="mt-auto d-flex justify-content-end">
                <Button
                  className="align-bottom"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSignup;
