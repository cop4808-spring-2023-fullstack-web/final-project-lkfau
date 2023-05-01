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

  useEffect(() => {
    const fetchAutoComplete = async () => {
      try {
        const response = await getAutoComplete(user.accessToken, text);
        if (response.data) {
          setResults(response.data.terms);
        }
       
      } catch (error) {
        setResults([]);
        console.error(error);
      }
    };

    const timeout = setTimeout(() => {
      if (props.autocomplete) {
        fetchAutoComplete();
      }
    }, 500)

    searchBarRef.current.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        clearTimeout(timeout);
      }
    });
   return () => {
    clearTimeout(timeout);
   }
  }, [text, user.accessToken, props.autocomplete]);

  const searchHandler = (e) => {
    if (e.keyCode) {
      if (e.keyCode === 13) {
        console.log('test')
        setResults([]);
        props.onSearch(text);
      }
    } else {
      setResults([]);
      props.onSearch(text);
    }
  }
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
          <InputGroup.Text
            className="text-light"
            onClick={searchHandler}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
        </InputGroup>

        {(props.autocomplete && results.length) > 0 && (
          <div
            className="p-3"
            style={{
              position: "absolute",
              backgroundColor: "var(--primary)",
              width: "100%",
              border: "1px solid var(--stroke)",
              maxWidth: "50rem",
              zIndex: 9999,
            }}
          >
            {results &&
              results.map((result) => (
                <div
                  key={result.text}
                  onClick={searchHandler}
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
