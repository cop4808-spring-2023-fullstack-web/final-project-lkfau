import { Pagination } from "react-bootstrap";
import styles from "./Pagination.module.css";

const PaginationUI = (props) => {
  return (
    <div className="w-100 d-flex justify-content-center justify-content-lg-start">
      <Pagination className={styles.main}>
        <Pagination.First
          disabled={props.page === 1}
          onClick={() => props.setPage(1)}
        />
        <Pagination.Prev
          disabled={props.page === 1}
          onClick={() => props.setPage((p) => p - 1)}
        />
        <Pagination.Item>{props.page}</Pagination.Item>
        <Pagination.Next
          disabled={props.page === props.numPages}
          onClick={() => props.setPage((p) => p + 1)}
        />
        <Pagination.Last
          disabled={props.page === props.numPages}
          onClick={() => props.setPage(props.numPages)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationUI;
