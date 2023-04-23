import Layout from "./Components/Layout/Layout/Layout";
import Landing from "./Components/Pages/Landing/Landing";
import Home from "./Components/Pages/Home/Home";
import Search from "./Components/Pages/Search/Search";
import Favorites from "./Components/Pages/Favorites/Favorites";
import NotFound from "./Components/Pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import { UserAuthContextProvider } from "./Components/Auth/Context/Context";
import useUserAuth from "./Components/Auth/Hooks/useUserAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/Pages/LogInSignUp/LogInSignUp";
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

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Loader/>}>
            <Route index element={<HomeController />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route
              exact
              path="/search"
              element={
                <ProtectedRoute>
                  <Route path="/search">
                    <Search />
                  </Route>
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
