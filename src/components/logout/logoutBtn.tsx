"use client";
import React from "react";
import styles from "./logoutBtn.module.scss";
import { signOut } from "next-auth/react";

type logOutButtonProps = {
  colorScheme?: string;
};

const LogoutBtn = ({ colorScheme }: logOutButtonProps) => {
  if (colorScheme === "dark") {
    return (
      <button className={styles.dark} onClick={() => signOut()}>
        log out
      </button>
    );
  }

  const handleLogOut = () => {
    localStorage.removeItem("athUsr");
    signOut();
  };

  return (
    <button className={styles.btn} onClick={handleLogOut}>
      log out
    </button>
  );
};

export default LogoutBtn;
