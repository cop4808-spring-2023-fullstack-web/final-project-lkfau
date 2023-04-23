import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
// render navbar body and footer
const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
