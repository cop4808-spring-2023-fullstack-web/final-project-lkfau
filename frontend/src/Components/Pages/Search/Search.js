import Container from 'react-bootstrap/Container'
import { useEffect } from 'react';
import useLocationInfo from '../../Auth/Hooks/useLocationInfo';
const Search = () => {
  const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const {location, getLocation} = useLocationInfo();
  console.log(location);
  useEffect(() => {
    if (location == null) {
      getLocation();
    } 
  })
  return (
    <Container>
      <h1>Search</h1>
      {array.map(el => <div className="m-5 p=5">test</div>)}
    </Container>
  );
};

export default Search;
