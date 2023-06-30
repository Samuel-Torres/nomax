"use client";
import Link from "next/link";
import styles from "./navbarstyles.module.scss";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <h1>Nomex</h1>
      <Link href="/auth/login">
        <button>Login</button>
        <button onClick={() => signOut()}>log out</button>
      </Link>
    </div>
  );
}
