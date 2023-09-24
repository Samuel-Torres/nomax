"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./profileNav.module.scss";
import { Users } from "@prisma/client";

type profileNavProps = {
  loggedInUser: Users;
};

const ProfileNav = ({ loggedInUser }: profileNavProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const setActive = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h1>{loggedInUser.userName}</h1>
        <p>{loggedInUser.persona}</p>
        <p>
          {loggedInUser.jobTitle} at {loggedInUser.companyName}
        </p>
      </div>
      <div className={styles.bottomSection}>
        <Link
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ""} `}
          href={`/dashboard/profile/${loggedInUser.id}`}
          onClick={() => setActive(1)}
        >
          Posts
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
          href={`/dashboard/profile/${loggedInUser.id}/photos`}
          onClick={() => setActive(2)}
        >
          Photos
        </Link>
        <Link
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
          href={`/dashboard/profile/${loggedInUser.id}/friends`}
          onClick={() => setActive(3)}
        >
          Friends
        </Link>
      </div>
    </div>
  );
};

export default ProfileNav;
