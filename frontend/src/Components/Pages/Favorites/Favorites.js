import Searchbar from '../../UI/Searchbar/Searchbar'
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './Favorites.module.css'
import Card from 'react-bootstrap/Card'
import { listFavorites, viewBusiness } from '../../../API/API';
import useUserAuth from '../../Auth/Hooks/useUserAuth';

const Favorites = () => {
  const {user} = useUserAuth()
  const [favorites, setFavorites] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listFavorites(user.accessToken);
        const favoritesData = response.data;
        const promises = favoritesData.map(async (favorite) => {
          const businessData = await viewBusiness(favorite.business_id);
          return businessData.data;
        });
        const results = await Promise.all(promises);
        setFavorites(results);
      } catch (error) {
        console.log(`Error fetching favorites: ${error}`);
      }
    }
    fetchData();
  }, []);


  return (
    <Container>
      <Row>
        <Searchbar></Searchbar>
        {favorites.map((favorite) => (
          <Col key={favorite.business_Id}>
            <Card>
              <Card.Body className='text-black'>
                <Card.Title>{favorite.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
