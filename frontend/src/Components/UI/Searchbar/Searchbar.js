import { useState } from 'react';

import styles from "./Searchbar.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Searchbar = (props) => {
  const [text, setText] = useState("");
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      props.onSearch(text);
    } 
  }
  return (
    <div className="w-100 h-100">
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
        <InputGroup.Text className="text-light" onClick={() => props.onSearch(text)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default Searchbar;
