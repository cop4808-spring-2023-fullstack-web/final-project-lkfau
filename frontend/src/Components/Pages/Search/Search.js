import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PropagateLoader } from "react-spinners";
import Container from "react-bootstrap/Container";
import { searchRestaurants } from "../../../Helpers/API";
import { Alert, Fade } from "react-bootstrap";
import useLocationInfo from "../../Auth/Hooks/useLocationInfo";
import SearchResults from "../../Content/SearchResults/SearchResults";
import Searchbar from "../../UI/Searchbar/Searchbar";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import Pagination from "../../UI/Pagination/Pagination";
const Search = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState();
  const location = useLocation();
  const [term, setTerm] = useState(
    new URLSearchParams(location.search).get("term")
  );
  const { getLocation } = useLocationInfo();
  const { user } = useUserAuth();
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

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
  }, [getLocation, term, user.accessToken, page]);
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
