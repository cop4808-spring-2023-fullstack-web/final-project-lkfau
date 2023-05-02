// Importing module and component needed
import Card from "../../UI/Card/Card";
import SearchResult from "./SearchResult";

// SearchResults component is defined to map through each restaurant in the data array and provide search results 
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
