import Card from "../../UI/Card/Card";
import SearchResult from "./SearchResult";

const SearchResults = (props) => {
  return (
    <>
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
