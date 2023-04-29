import BootstrapCard from 'react-bootstrap/Card'
import styles from './Card.module.css'
const Card = (props) => {
  return <BootstrapCard className={`${styles.card} ${props.className}`} style={{borderRadius: props.borderRadius || '30px'}}>{props.children}</BootstrapCard>
}

export default Card;