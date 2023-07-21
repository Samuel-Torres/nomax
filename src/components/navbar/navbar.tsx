"use client";
import styles from "./navbarstyles.module.scss";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Nomax</h1>
      </div>
      <div className={styles.btnContainer}>
        {/* <button className={styles.btn} onClick={() => signOut()}>
          log out
        </button> */}
      </div>
    </div>
  );
}
