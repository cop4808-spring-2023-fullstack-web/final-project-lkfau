import Layout from "./Components/Layout/Layout/Layout";
import Landing from "./Components/Pages/Landing/Landing";
import Home from "./Components/Pages/Home/Home";
import Search from "./Components/Pages/Search/Search";
import Favorites from "./Components/Pages/Favorites/Favorites";
import NotFound from "./Components/Pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import {
  UserAuthContextProvider,
  useUserAuth,
} from "./Components/Auth/Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/Pages/LogInSignUp/LogInSignUp";
import { Navigate } from "react-router-dom";
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

const LoginController = () => {
  const { user } = useUserAuth();

  if (!user) {
    return <LoginSignup />;
  }
  return <Navigate to="/" />;;
};

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Loader/>}>
            <Route index element={<HomeController />} />
            <Route path="/signup" element={<LoginController />} />
            <Route path="/login" element={<LoginController />} />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
