import Searchbar from '../../UI/Searchbar/Searchbar'
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './Favorites.module.css'
import Card from 'react-bootstrap/Card'
import { listFavorites } from '../../../API/API';

const Favorites = () => {
  const [data, setData] = useState();

  const {getFavorites} = listFavorites();
  

  useEffect(() => {
    const getData = async(business_id, accessToken) => {
      getFavorites(async(business_id, accessToken) => {
        const res = await listFavorites(business_id, accessToken);
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.data);
          setData(res.data);
        }
      });
    }
    getData('');
  }, [getFavorites])

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

      {data ? (
        data.businesses.map((restaurant, index) => (
        <div key={index} className="m-5 p=5">
          <Card className={styles.restaurant}>
            <h3>{restaurant.name}</h3>
          </Card>
        </div>
        ))
      ) : <p>No data found.</p>}
    </Container>
  );
};

export default Favorites;
