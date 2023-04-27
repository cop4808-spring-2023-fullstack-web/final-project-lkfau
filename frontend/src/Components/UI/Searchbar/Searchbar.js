import styles from './Searchbar.module.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
const Searchbar = (props) => {
  
  return (
      <div className="w-100 h-100">
       <InputGroup className={`${styles.searchbar} h-100`}>
        <Form.Control
          className="text-light"
          placeholder="Find a restaurant..."
          aria-label="Search"
        />
         <InputGroup.Text className="text-light">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text >
      </InputGroup>
      </div>
  )
}

export default Searchbar