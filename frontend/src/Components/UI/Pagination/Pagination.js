import { Pagination } from "react-bootstrap";

const PaginationUI = (props) => {
  return (
    <Pagination>
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
  );
};

export default PaginationUI;
