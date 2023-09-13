"use client";
import styles from "./navbarstyles.module.scss";
import LogoutBtn from "../logout/logoutBtn";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Nomax</h1>
      </div>
      <div className={styles.btnContainer}></div>
      <LogoutBtn />
    </div>
  );
}
