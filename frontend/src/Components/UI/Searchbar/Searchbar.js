import { useEffect, useState, useRef } from "react";

import styles from "./Searchbar.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAutoComplete } from "../../../Helpers/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";

const Searchbar = (props) => {
  const { user } = useUserAuth();
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAutoComplete = async () => {
      if (text !== "") {
        try {
          const response = await getAutoComplete(user.accessToken, text);
          if (response.data) {
            setResults(response.data.terms);
          }
        } catch (error) {
          setResults([]);
          console.error(error);
        }
      }
    };
    if (!loading) {
      fetchAutoComplete();
    } else {
      setTimeout(() => setLoading(false), 300);
    }
    // eslint-disable-next-line
  }, [loading, user.accessToken]);

  const search = (e, term) => {
    setResults([]);
    if (term) {
      setText(term);
      props.onSearch(term);
    } else {
      props.onSearch(text);
    }
  };

  const searchHandler = (e) => {
    if (e.keyCode === 13) {
      search();
    } else {
      setText(e.target.value);
      setLoading(true);
    }
  };
  const searchBarRef = useRef(null);

  return (
    <>
      <div className="w-100 h-100" style={{ position: "relative" }}>
        <InputGroup
          className={`${styles.searchbar} ${props.className} h-100`}
          style={props.style}
        >
          <Form.Control
            className="text-light"
            value={text}
            ref={searchBarRef}
            onChange={(e) => setText(e.target.value)}
            placeholder={props.placeholder}
            aria-label="Search"
            onKeyDown={searchHandler}
          />
          <InputGroup.Text className="text-light" onClick={search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
        </InputGroup>

        {(props.autocomplete && results.length) > 0 && (
          <div className={`${styles.autocomplete} p-3 pb-2 pt-4`}>
            {results &&
              results.map((result) => (
                <div
                  key={result.text}
                  onClick={(e) => search(e, e.target.innerHTML)}
                >
                  {result.text}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
