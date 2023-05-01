// Importing modules
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from './Footer.module.css'

// Footer component is defined to add a footer section 
const Footer = () => {
  return (
    <Navbar className={styles.footer} variant="dark">
      <Container>
        <Navbar.Brand>&copy; Group 1 LLC</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
