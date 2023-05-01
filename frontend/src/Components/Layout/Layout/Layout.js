// Importing modules 
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

// Layout component is defined to render navbar body and footer
const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
