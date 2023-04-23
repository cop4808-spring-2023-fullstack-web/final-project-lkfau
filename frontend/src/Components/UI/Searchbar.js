import styles from './Searchbar.module.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
const Searchbar = (props) => {
  return (
    <div className={`${styles.searchbar} ${props.className}`}>
      <InputGroup >
        <InputGroup.Text className="bg-dark text-light">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text >
        <Form.Control
          className="bg-dark text-light"
          placeholder="Find a restaurant..."
          aria-label="Search"
        />
      </InputGroup>
    </div>
  )
}

export default Searchbar