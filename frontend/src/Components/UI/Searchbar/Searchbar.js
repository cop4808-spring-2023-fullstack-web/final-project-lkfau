import { useEffect, useState } from "react";

import styles from "./Searchbar.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAutoComplete } from "../../../Helpers/API";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import { useLocation } from "react-router-dom";
const Searchbar = (props) => {
  const { user } = useUserAuth();
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const location = useLocation();
  const show = !["/favorites"].includes(location.pathname);
  useEffect(() => {
    const fetchAutoComplete = async () => {
      try {
        const response = await getAutoComplete(user.accessToken, text);
        setResults(response.data.terms);
      } catch (error) {
        setResults([]);
        console.error(error);
      }
    };
    if (show) {
      fetchAutoComplete();
    }
  }, [text, user.accessToken, show]);
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      props.onSearch(text);
    }
  };
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
            onChange={(e) => setText(e.target.value)}
            placeholder={props.placeholder}
            aria-label="Search"
            onKeyDown={keyDownHandler}
          />
          <InputGroup.Text
            className="text-light"
            onClick={() => props.onSearch(text)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
        </InputGroup>

        {(show && results.length) > 0 && (
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
                  onClick={() => {
                    props.onSearch(result.text);
                  }}
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
