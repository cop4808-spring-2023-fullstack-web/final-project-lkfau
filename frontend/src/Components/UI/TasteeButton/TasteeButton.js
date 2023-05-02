// Imported component
import styles from "./TasteeButton.module.css";

// TasteeButton component is defined
const TasteeButton = (props) => {
  return (
    <button
      variant="primary"
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default TasteeButton;
