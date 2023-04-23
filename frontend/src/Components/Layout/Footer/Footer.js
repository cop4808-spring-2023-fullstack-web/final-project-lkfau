import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar className="bg-black mt-5" variant="dark">
      <Container>
        <Navbar.Brand>&copy; Group 1 LLC</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
