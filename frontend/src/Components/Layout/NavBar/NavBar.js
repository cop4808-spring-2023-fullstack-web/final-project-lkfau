import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import useUserAuth from "../../Auth/Hooks/useUserAuth";
import styles from "./Navbar.module.css"
const NavBar = () => {
  const location = useLocation();
  const { user, logOut } = useUserAuth();
  const landingPage = location.pathname === "/" && !user;
  const show = !["/login", "/signup"].includes(location.pathname);
  const [banner, setBanner] = useState(landingPage);

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
