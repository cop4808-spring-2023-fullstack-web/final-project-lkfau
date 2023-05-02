// Categories component is defined
const Categories = (props) => {
  if (props.data) {
    return props.data.map((category, index) => {
      return `${category.title}${index === props.data.length - 1 ? "" : " • "}`;
    });
  } else {
    return "";
  }
};

export default Categories;
