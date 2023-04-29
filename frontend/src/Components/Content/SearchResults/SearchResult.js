import { useNavigate } from 'react-router-dom';

import Card from '../../UI/Card/Card';
import styles from './SearchResult.module.css'

const SearchResult = (props) => {
  const navigate = useNavigate();
  return (
    <Card onClick={()=>navigate(`/restaurant/${props.data.id}`)}>
      <h2>{props.data.name}</h2>
    </Card>
  )
}

export default SearchResult;