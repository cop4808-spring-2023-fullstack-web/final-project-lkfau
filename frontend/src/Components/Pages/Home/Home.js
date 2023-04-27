import Menu from '../../Content/Menu/Menu';
import Searchbar from '../../UI/Searchbar/Searchbar'
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="pt-5">
      <Row className="gy-3">
        <Col sm={12} md={6} lg={4}>
          <h1 className="mb-0">Welcome back.</h1>
        </Col>
        <Col sm={12} md={6} lg={8}>
          <Searchbar />
        </Col>
      </Row>
      <Menu />
    </Container>
  );
};

export default Home;
