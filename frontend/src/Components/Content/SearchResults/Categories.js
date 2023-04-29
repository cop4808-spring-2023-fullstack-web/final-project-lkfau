const Categories = (props) => {
  if (props.data) {
    return <p style={{marginBottom: 0}}>
      {props.data.map((category, index) => {
        return `${category.title}${index === props.data.length - 1 ? "" : " • "}`
      })
    }</p>
  
  } else {
    return "";
  }
 
}

export default Categories;