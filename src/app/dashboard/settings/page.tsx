import React from "react";
import styles from "./settingsPage.module.scss";

import LogoutBtn from "@/components/logout/logoutBtn";

const Settings = () => {
  return (
    <div className={styles.container}>
      <LogoutBtn colorScheme="dark" />
    </div>
  );
};

export default Settings;
