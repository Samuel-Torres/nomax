"use client";
import styles from "./navbarstyles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.psuedoContainer} />
        <div className={styles.logoContainer}>
          <Image
            className={styles.logoImg}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1696446061/Nomex/dashboard/travel_chxryf.png"
            width={50}
            height={50}
            alt="logo"
          />
          <h1>Nomax</h1>
        </div>
        <div className={styles.btnContainer}>
          <Link href="/blog">Blog</Link>
          <Link href="/auth">Join</Link>
        </div>
      </div>
    </>
  );
}
