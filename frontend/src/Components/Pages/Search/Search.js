// Importing modules needs from react and other libraries
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Importing components 
import { PropagateLoader } from "react-spinners";
import Container from "react-bootstrap/Container";
import { searchRestaurants } from "../../../Helpers/API";
import { Alert, Fade } from "react-bootstrap";
import useLocationInfo from "../../Auth/Hooks/useLocationInfo";
import SearchResults from "../../Content/SearchResults/SearchResults";
import Searchbar from "../../UI/Searchbar/Searchbar";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import Pagination from "../../UI/Pagination/Pagination";

// Search component is defined in order to use the search functionality
const Search = () => {
  // Setting up states
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState();
  const location = useLocation();
  const [term, setTerm] = useState(
    new URLSearchParams(location.search).get("term") // getting the search term from url location and setting it up as state
  );
  const { getLocation } = useLocationInfo();
  const { user } = useUserAuth();
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  // Fetching data from the API and setting up the data and status states
  useEffect(() => {
    setStatus("loading");
    const getData = async (searchTerm) => {
      getLocation(async (location) => {
        const res = await searchRestaurants(
          user.accessToken,
          searchTerm ? searchTerm : "",
          location,
          page - 1
        );
        if (res.error) {
          console.log(res.error);
          setStatus("error");
        } else {
          setStatus("success");
          setData(res.data);
          setNumPages(Math.ceil(res.data.total / 10));
        }
      });
    };
    getData(term);
  }, [getLocation, term, user.accessToken, page]); // running the effect whenever any of these states change
  
  // Returning JSX elements to render a search bar that allows users to input a search term
  return (
    <Container className="px-0">
      <h1 className={"pt-5 pb-2"}>
        {term ? `Search results for ${term}` : "Restaurants near me"}
      </h1>
      <Searchbar
        autocomplete={true}
        placeholder="Find a restaurant..."
        onSearch={(term) => setTerm(term)}
      />
      <div className="mb-5"></div>
      {numPages !== null && (
        <Pagination page={page} numPages={numPages} setPage={setPage} />
      )}
      {status === "success" &&
        (data.businesses.length ? (
          <Fade in={true} appear={true}>
            <div>
              <SearchResults autocomplete={true} term={term} data={data.businesses} />
            </div>
          </Fade>
        ) : (
          <p>No data found.</p>
        ))}
      {status === "loading" && (
        <div className="d-flex mt-5 pt-5  justify-content-center">
          <PropagateLoader color="var(--accent)" />
        </div>
      )}
      {status === "error" && (
        <Alert variant="danger">An error has occurred. Try again.</Alert>
      )}
    </Container>
  );
};

export default Search;
