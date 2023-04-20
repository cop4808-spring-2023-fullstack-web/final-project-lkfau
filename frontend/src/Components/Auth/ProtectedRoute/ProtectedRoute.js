import { Navigate, Outlet } from "react-router-dom"
import { useUserAuth } from "../Context/Context";
const ProtectedRoute = () => {
    const {user} = useUserAuth()
    if (!user) { return <Navigate to="/"></Navigate> } // You might as well use Navigate here
  
    return Outlet;
  };

  export default ProtectedRoute
  