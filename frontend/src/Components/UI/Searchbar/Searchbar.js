import styles from "./Searchbar.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Searchbar = (props) => {
  return (
    <div className="w-100 h-100">
      <InputGroup
        className={`${styles.searchbar} ${props.className} h-100`}
        style={props.style}
      >
        <Form.Control
          className="text-light"
          security=""
          placeholder={props.placeholder}
          aria-label="Search"
          onKeyDown={props.onKeyDown}
        />
        <InputGroup.Text className="text-light">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default Searchbar;
