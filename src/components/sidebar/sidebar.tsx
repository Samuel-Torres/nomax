import React from "react";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";

// components:
import LogoutBtn from "../logout/logoutBtn";

function sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.icon}
          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
          width={30}
          height={30}
          alt="google"
          data-test="googleImage"
        />
      </div>
      <div className={styles.linkContainer}>
        <Link className={styles.link} href="/dashboard">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248266/Nomex/dashboard/post_klnb0m.png"
            width={30}
            height={30}
            alt="google"
            data-test="googleImage"
          />
          <p className={styles.linkText}>Community Board</p>
        </Link>
        <Link className={styles.link} href="/dashboard/profile">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247774/Nomex/dashboard/user_gtq9lo.png"
            width={30}
            height={30}
            alt="google"
            data-test="googleImage"
          />
          <p className={styles.linkText}>Profile</p>
        </Link>
        <Link className={styles.link} href="/dashboard/friends">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247899/Nomex/dashboard/friends_vjwx8u.png"
            width={30}
            height={30}
            alt="google"
            data-test="googleImage"
          />
          <p className={styles.linkText}>Friends</p>
        </Link>
        <Link className={styles.link} href="/dashboard/blogs">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248320/Nomex/dashboard/blog_vrb3il.png"
            width={30}
            height={30}
            alt="google"
            data-test="googleImage"
          />
          <p className={styles.linkText}>Blogs</p>
        </Link>
        <Link className={styles.link} href="/dashboard/settings">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248373/Nomex/dashboard/settings_iyfkfn.png"
            width={30}
            height={30}
            alt="google"
            data-test="googleImage"
          />
          <p className={styles.linkText}>Settings</p>
        </Link>
      </div>
      <div className={styles.logoutContainer}>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default sidebar;
