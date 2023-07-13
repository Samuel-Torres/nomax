"use client";
import Link from "next/link";
import styles from "./navbarstyles.module.scss";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Nomex</h1>
      </div>
      <div className={styles.btnContainer}>
        <Link href="/auth/login">
          <button className={styles.btn}>Login</button>
        </Link>
        <button className={styles.btn} onClick={() => signOut()}>
          log out
        </button>
      </div>
    </div>
  );
}
