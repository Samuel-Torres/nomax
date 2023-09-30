"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./profileNav.module.scss";
import { Users } from "@prisma/client";

import FriendRequestBtn from "@/components/friendRequestBtn/friendRequestBtn";
import NotificationCenter from "@/components/notificationCenter/notificationCenter";

type profileNavProps = {
  visitedUser: Users;
};

const ProfileNav = ({ visitedUser }: profileNavProps) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(parseInt(storedTab, 10));
    }
  }, []);

  const setActive = (tabId: number) => {
    setActiveTab(tabId);
    localStorage.setItem("activeTab", tabId.toString());
  };

  return (
    <div className={styles.container}>
      <NotificationCenter visitedUser={visitedUser} />
      <div className={styles.topSection}>
        <h1>{visitedUser.userName}</h1>
        <p className={styles.persona}>{visitedUser.persona}</p>
        <p className={styles.jobTitle}>
          {visitedUser.jobTitle} at {visitedUser.companyName}
        </p>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.leftBottom}>
          <Link
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ""} `}
            href={`/dashboard/profile/${visitedUser.id}`}
            onClick={() => setActive(1)}
          >
            Posts
          </Link>
          <Link
            className={`${styles.tab} ${activeTab === 2 ? styles.active : ""}`}
            href={`/dashboard/profile/${visitedUser.id}/photos`}
            onClick={() => setActive(2)}
          >
            Photos
          </Link>
          <Link
            className={`${styles.tab} ${activeTab === 3 ? styles.active : ""}`}
            href={`/dashboard/profile/${visitedUser.id}/friends`}
            onClick={() => setActive(3)}
          >
            Friends
          </Link>
        </div>
        <div className={styles.rightBottom}>
          <FriendRequestBtn visitedUser={visitedUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
