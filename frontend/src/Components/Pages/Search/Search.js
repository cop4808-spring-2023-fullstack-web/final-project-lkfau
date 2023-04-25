import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react';
import { searchRestaurants } from '../../../API/API';
import useLocationInfo from '../../Auth/Hooks/useLocationInfo';
import Card from 'react-bootstrap/Card'
import styles from './Search.module.css'
const Search = () => {
  const [data, setData] = useState();

  const {getLocation} = useLocationInfo();
  

  useEffect(() => {
    const getData = async(searchTerm) => {
      getLocation(async(location) => {
        const res = await searchRestaurants(searchTerm, location);
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.data);
          setData(res.data);
        }
      });
    }
    getData('japanese');
  }, [getLocation])
  return (
    <Container>
      <h1>Search</h1>
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

export default Search;
