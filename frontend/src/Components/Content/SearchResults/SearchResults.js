import { useState } from "react";

import Card from "../../UI/Card/Card";
import SearchResult from "./SearchResult";
// import { Pagination } from "react-bootstrap";

const SearchResults = (props) => {
  const [page, setPage] = useState(0);
  return (
    <>
      {/* <Pagination>
        <Pagination.First />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Last />
      </Pagination> */}

      <Card className="p-3">
        {props.data.map((restaurant) => (
          <SearchResult
            key={restaurant.id}
            data={restaurant}
            setFavorites={props.setFavorites}
          />
        ))}
      </Card>
    </>
  );
};

export default SearchResults;
