import { Container, Alert } from "react-bootstrap";
const NotFound = () => {
  return (
    <Container className="pt-5">
      <Alert variant="danger">
        <h2>404 - Page not found</h2>
      </Alert>
    </Container>
  );
};
export default NotFound;
