import Card from '../../UI/Card/Card';
import SearchResult from './SearchResult';
import styles from './SearchResult.module.css'

const SearchResults = (props) => {
  return (
  
    <Card className="p-3">
      {props.data.map(restaurant => <SearchResult key={restaurant.id} data={restaurant} />)}    
    </Card>)

}

export default SearchResults;