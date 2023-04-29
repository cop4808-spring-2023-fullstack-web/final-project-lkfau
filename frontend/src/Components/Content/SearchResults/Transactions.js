const Transactions = (props) => {
  if (props.data.length) {
    return (
      <p style={{ marginBottom: 0 }}>
        Available for{" "}
        {props.data.map(
          (transaction, index) =>
            `${transaction}${index === props.data.length - 1 ? "" : ", "}`
        )}
      </p>
    );
  } else {
    return "";
  }
};

export default Transactions;
