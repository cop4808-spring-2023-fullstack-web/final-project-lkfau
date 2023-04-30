import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PropagateLoader } from "react-spinners";
import Container from "react-bootstrap/Container";
import { searchRestaurants } from "../../../API/API";
import { Alert, Fade } from "react-bootstrap";
import useLocationInfo from "../../Auth/Hooks/useLocationInfo";
import SearchResults from "../../Content/SearchResults/SearchResults";
import Searchbar from "../../UI/Searchbar/Searchbar";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

const Search = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState();
  const location = useLocation();
  const term = new URLSearchParams(location.search).get("term");
  const { getLocation } = useLocationInfo();
  const { user } = useUserAuth();
  useEffect(() => {
    const getData = async (searchTerm) => {
      getLocation(async (location) => {
        const res = await searchRestaurants(
          user.accessToken,
          searchTerm ? searchTerm : "",
          location
        );
        if (res.error) {
          console.log(res.error);
          setStatus('error');
        } else {
          console.log(res.data);
          setStatus("success");
          setData(res.data);
        }
      });
    };
    getData(term);
  }, [getLocation, term, user.accessToken]);
  console.log(status);
  return (
    <Container className="px-0">
      <h1 className={"pt-5 pb-2"}>
        {term ? `Search results for ${term}` : "Restaurants near me"}
      </h1>
      <Searchbar
        className="pb-5"
        style={{ maxWidth: "40rem" }}
        placeholder="Find a restaurant..."
      />
      {status === "success" &&
        (data.businesses.length ? (
          <Fade in={true} appear={true}>
            <div>
              <SearchResults term={term} data={data.businesses} />
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
      {status === "error" && <Alert variant="danger">An error has occurred. Try again.</Alert>}
    </Container>
  );
};

export default Search;
