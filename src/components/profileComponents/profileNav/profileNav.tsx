"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./profileNav.module.scss";
import { Users } from "@prisma/client";

import FriendRequestBtn from "@/components/friendRequestBtn/friendRequestBtn";

type profileNavProps = {
  visitedUser: Users;
};

const ProfileNav = ({ visitedUser }: profileNavProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const setActive = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h1>{visitedUser.userName}</h1>
        <p>{visitedUser.persona}</p>
        <p>
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
