// Importing modules and components 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import styles from "./Navbar.module.css"

// NavBar component is defined
const NavBar = () => { 
  // States are initialized 
  const location = useLocation(); // Getting the current location
  const { user, logOut } = useUserAuth(); // Retrieving user info and the logOut function using the useUserAuth custom 
  const landingPage = location.pathname === "/" && !user; // Determining if the current page is the landing page
  const show = !["/login", "/signup"].includes(location.pathname); // Determining if the current page is one of the pages where the navbar should be shown
  const [banner, setBanner] = useState(landingPage); // Setting the banner state based on whether the current page is the landing page
  
  // Adding an event listener to the window to check for changes in the scrolling position 
  // and handle the banner display accordingly
  useEffect(() => {
    const scrollHandler = () => {
      if (banner) {
        if (!landingPage) {
          setBanner(false);
        } else if (window.scrollY > 500) {
          setBanner(false);
        }
      } else if (landingPage && (window.scrollY <= 500 && banner === false)) {
        setBanner(true);
      }
    };
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [banner, landingPage, location])

  // Rendering the NavBar component
  return (
    <Navbar className={`${banner ? styles.bannerNav : styles.normalNav} ${show ? "" : "d-none"}`} sticky="top" variant="dark" expand="md">
      <Container className={styles.navContainer}>
        <Navbar.Brand as={Link} to="/">
          Tastee
        </Navbar.Brand>
        {user && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavLink to="search" className="nav-link">
                  Search
                </NavLink>
                <NavLink to="favorites" className="nav-link">
                  Favorites
                </NavLink>
              </Nav>
              <Nav className="ms-auto text-white">
                <span
                  onClick={() => {
                    logOut();
                  }}
                  role="button"
                  className="nav-link text-white"
                >
                  Sign out
                </span>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        {!user && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink to="/login" className="nav-link">
                 Log in
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
