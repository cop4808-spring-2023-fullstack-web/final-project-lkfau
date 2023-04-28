import Searchbar from '../../UI/Searchbar/Searchbar'
import { Container, Row, Col } from 'react-bootstrap';

const Favorites = () => {
  return (
    <Container className="pt-5">
      <Row className="gy-3">
        <Col sm={12} md={6} lg={4}>
          <h1 className="mb-0">Favorites.</h1>
        </Col>
        <Col sm={12} md={6} lg={8}>
          <Searchbar placeholder="Search Favorites..." />
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
