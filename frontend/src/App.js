import Layout from "./Components/Layout/Layout/Layout";
import Landing from "./Components/Pages/Landing/Landing";
import Home from "./Components/Pages/Home/Home";
import LogInSignUp from "./Components/Pages/LogInSignUp/LogInSignUp";
import Search from "./Components/Pages/Search/Search";
import Favorites from "./Components/Pages/Favorites/Favorites";
import NotFound from "./Components/Pages/NotFound/NotFound";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                {/* A common layout for all the pages */}
                <Route path="/" element={<Layout />}>
                    {/* Home page */}
                    <Route index element={<Home />} />
                    <Route path="/landing" element={<Landing />} />
                    {/* Page to add a new student */}
                    <Route path="search" element={<Search />} />
                    {/* Page to delete an existing student */}
                    <Route path="favorites" element={<Favorites />} />
                    {/* Page to display an existing student */}
                    <Route path="login" element={<LogInSignUp />} />
                    {/* Page to list all students / search for students */}
                    <Route path="signup" element={<LogInSignUp />} />
                    {/* Page to update an existing student */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
