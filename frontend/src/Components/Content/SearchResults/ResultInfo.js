// ResultInfo component is defined
const ResultInfo = (props) => {
  return props.children.map((child, index) => 
    <p key={index} style={{ marginBottom: index !== props.children.length - 1 ? "0.5rem" : "2rem" }}>
      {child}
    </p>
  );
};

export default ResultInfo;
