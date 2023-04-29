import Searchbar from "../../UI/Searchbar/Searchbar";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { listFavorites } from "../../../API/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

const Favorites = () => {
  const { user } = useUserAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listFavorites(user.accessToken);
        setFavorites(response.data)
      } catch (error) {
        console.log(`Error fetching favorites: ${error}`);
      }
    }

    fetchData();
  }, [user.accessToken]);

  return (
    <Container>
      <Row>
        <Searchbar></Searchbar>
        <button onClick={()=>{console.log(favorites)}}></button>
        {favorites.map((favorite) => (
          <Col key={favorite.business_Id}>
            <Card>
              <Card.Body className="text-black">
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
