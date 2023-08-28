"use client";
import React from "react";
import styles from "./logoutBtn.module.scss";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <button className={styles.btn} onClick={() => signOut()}>
      log out
    </button>
  );
};

export default LogoutBtn;
