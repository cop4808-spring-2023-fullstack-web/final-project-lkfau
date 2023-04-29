import Layout from "./Components/Layout/Layout/Layout";
import Landing from "./Components/Pages/Landing/Landing";
import Home from "./Components/Pages/Home/Home";
import Search from "./Components/Pages/Search/Search";
import Favorites from "./Components/Pages/Favorites/Favorites";
import NotFound from "./Components/Pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import { UserAuthContextProvider } from "./Components/Auth/Context/AuthContext";
import { LocationContextProvider } from "./Components/Auth/Context/LocationContext";
import useUserAuth from "./Components/Auth/Hooks/useUserAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/Pages/LogInSignUp/LogInSignUp";
import { Navigate } from "react-router-dom";
import Restaurant from "./Components/Pages/Restaurant/Restaurant";
const HomeController = () => {
  const { user } = useUserAuth();

  if (!user) {
    return <Landing />;
  }

  return <Home />;
};

const Loader = () => {
    const {loading} = useUserAuth()
    if(loading)
    {
        return <>Loading...</>
    }
    return <Layout/>
}

const LoginController = ({section}) => {
  const { user } = useUserAuth();
  console.log(section)
  if (!user) {
    return <LoginSignup section={section} />;
  }
  return <Navigate to="/" />;;
};

function App() {
  
  return (
    <UserAuthContextProvider>
      <LocationContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Loader/>}>
            <Route index element={<HomeController />} />
            <Route path="/login" element={<LoginController section={"login"} />} />
            <Route path="/signup" element={<LoginController section={"signup"} />} />
            <Route
              exact
              path="/search"
              element={
                <ProtectedRoute>                 
                    <Search />             
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
             <Route exact path="/restaurant/:business_id" element={
                <ProtectedRoute>
                 <Restaurant/>
                </ProtectedRoute>
              } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
             
      </LocationContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
