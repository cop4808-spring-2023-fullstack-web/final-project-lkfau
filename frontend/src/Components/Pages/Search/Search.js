import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import { searchRestaurants } from '../../../API/API';
import useLocationInfo from '../../Auth/Hooks/useLocationInfo';
import SearchResults from '../../Content/SearchResults/SearchResults';

const Search = () => {
  const [data, setData] = useState();
  const location = useLocation();
  const term = new URLSearchParams(location.search).get('term');
  const {getLocation} = useLocationInfo();

  useEffect(() => {
    const getData = async(searchTerm) => {
      getLocation(async(location) => {
        const res = await searchRestaurants(searchTerm ? searchTerm : '', location);
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.data)
          setData(res.data);
        }
      });
    }
    getData(term);
  }, [getLocation, term])
  return (
    <Container className="px-0">
      {data ? <SearchResults term={term} data={data.businesses} /> : <p>No data found.</p>}
    </Container>
  );
};

export default Search;
