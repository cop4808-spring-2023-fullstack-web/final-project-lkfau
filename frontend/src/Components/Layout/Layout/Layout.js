import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
// render navbar body and footer
const Layout = () => {
  return (
    <div className={styles.wrapper}>

      <div className={styles.content}>
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;
