"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./profileNav.module.scss";

type profileNavProps = {
  loggedInUserEmail: string;
};

const ProfileNav = ({ loggedInUserEmail }: profileNavProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const setActive = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}></div>
      <div className={styles.bottomSection}>
        <Link
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ""}`}
          href={`/dashboard/profile/${loggedInUserEmail}`}
          onClick={() => setActive(1)}
        >
          Posts
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
          href={`/dashboard/profile/${loggedInUserEmail}/photos`}
          onClick={() => setActive(2)}
        >
          Photos
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
          href={`/dashboard/profile/${loggedInUserEmail}/friends`}
          onClick={() => setActive(3)}
        >
          Friends
        </Link>
      </div>
    </div>
  );
};

export default ProfileNav;
