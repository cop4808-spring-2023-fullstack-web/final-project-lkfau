import styles from './Searchbar.module.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
const Searchbar = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className="w-100">
       <h1 className="mb-4">Welcome back.</h1>
       <InputGroup className={styles.searchbar}>
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
     
    </div>
  )
}

export default Searchbar