"use client";
import Link from "next/link";
import styles from "./landingNavbarstyles.module.scss";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Nomex</h1>
      </div>
      <div>
        <Link href="/auth/login">
          <button>Login</button>
        </Link>
        <button onClick={() => signOut()}>log out</button>
      </div>
    </div>
  );
}
