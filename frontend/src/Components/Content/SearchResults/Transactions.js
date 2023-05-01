// Transactions component is defined
const Transactions = (props) => {
  if (props.data.length) {
    return `Available for
        ${props.data.map(
          (transaction, index) =>
            `${transaction}${index === props.data.length - 1 ? "" : ", "}`
        )}`;
  } else {
    return "";
  }
};

export default Transactions;
