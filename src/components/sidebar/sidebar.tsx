"use client";
import React from "react";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

// components:
import LogoutBtn from "../logout/logoutBtn";

function Sidebar() {
  const { data: session, status } = useSession();
  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.icon}
          src={
            data?.profilePicture
              ? data?.profilePicture
              : "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
          }
          width={80}
          height={80}
          alt="profile"
          data-test="googleImage"
        />
      </div>
      <div className={styles.linkContainer}>
        <Link className={styles.link} href="/dashboard">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693256653/Nomex/dashboard/home_befu43.png"
            width={30}
            height={30}
            alt="google"
            data-test="home"
          />
          <p className={styles.linkText}>Home</p>
        </Link>
        <Link className={styles.link} href="/dashboard/profile">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247774/Nomex/dashboard/user_gtq9lo.png"
            width={30}
            height={30}
            alt="google"
            data-test="profile"
          />
          <p className={styles.linkText}>Profile</p>
        </Link>
        <Link className={styles.link} href="/dashboard/blogs">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248320/Nomex/dashboard/blog_vrb3il.png"
            width={30}
            height={30}
            alt="google"
            data-test="blog"
          />
          <p className={styles.linkText}>Blogs</p>
        </Link>
        {viewportWidth && viewportWidth < 1025 && (
          <Link className={styles.link} href="/dashboard/settings">
            <Image
              className={styles.icon}
              src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248373/Nomex/dashboard/settings_iyfkfn.png"
              width={30}
              height={30}
              alt="google"
              data-test="settings"
            />
            <p className={styles.linkText}>Settings</p>
          </Link>
        )}
      </div>
      <div className={styles.logoutContainer}>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Sidebar;
