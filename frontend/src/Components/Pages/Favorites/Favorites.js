import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import Container from "react-bootstrap/Container";
import { listFavorites } from "../../../Helpers/API";
import { Alert, Fade } from "react-bootstrap";
import SearchResults from "../../Content/SearchResults/SearchResults";
import Searchbar from "../../UI/Searchbar/Searchbar";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import { useLocation } from "react-router-dom";
const Favorites = () => {
  const { user } = useUserAuth();
  const [favorites, setFavorites] = useState([]);
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    setStatus('loading');
    async function fetchData() {
      try {
        const response = await listFavorites(user.accessToken, term);
        setFavorites(response.data)
        setStatus("success");
      } catch (err) {
        console.log(err);
        setStatus("error")
      }
    }

    fetchData();
  }, [term, user.accessToken]);



  return (
    <Container className="px-0">
    <h1 onClick={()=>console.log(favorites)} className={"pt-5 pb-2"}>
      My favorites
    </h1>
    <Searchbar
      className="pb-5"
      style={{ maxWidth: "40rem" }}
      placeholder="Find a favorite..."
      onSearch={(term) => setTerm(term)}
    />
    {status === "success" &&
      (favorites.length ? (
        <Fade in={true} appear={true}>
          <div>
            <SearchResults setFavorites={setFavorites} term={term}  data={favorites} />
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
    {status === "error" && <Alert variant="danger">An error has occurred gathering favorites.</Alert>}
  </Container>
  );
};

export default Favorites;
