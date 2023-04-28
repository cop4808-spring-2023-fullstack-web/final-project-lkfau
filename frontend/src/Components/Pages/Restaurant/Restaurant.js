import Details from "../../Details/Details";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewBusiness } from "../../../API/API";
const Restaurant = () => {
  const [business, setBusiness] = useState(null);
  const { business_id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await viewBusiness(business_id);
      if (response.status === 200) {
        setBusiness(response.data);
      } else {
        console.log(`Error fetching business: ${response.error}`);
      }
    }
    fetchData();
  }, [business_id]);

  if (!business) {
    return <div>Loading...</div>;
  }
  else{
    console.log(business)
  return <>
<Details restaurant={business}/>
  </>
};
}

export default Restaurant;
