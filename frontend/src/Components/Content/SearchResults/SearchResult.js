import { useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './SearchResult.module.css'

const SearchResult = (props) => {
  const navigate = useNavigate();
  return (
    <Container className={styles.container} onClick={()=>navigate(`/restaurant/${props.data.id}`)}>
      <Row>
      <Col lg={2} md={12}>
        <img className={styles.image} src={props.data.image_url} alt={props.data.name}></img>
      </Col>
      <Col className="ps-4">
      <h2>{props.data.name}</h2>
      </Col>
      </Row>   
    </Container>
  )
}

export default SearchResult;