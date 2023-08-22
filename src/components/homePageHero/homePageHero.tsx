import Image from "next/image";
import React from "react";
import styles from "./homepage.module.scss";

type heroData = {
  heroImage: string;
  alt: string;
  header: string;
  icons: Array<{
    id: number;
    iconImage: string;
    alt: string;
    text: string;
  }>;
};

// sub component:
import IconCard from "./iconCard/iconCard";

const HomePageHero = ({ heroImage, alt, header, icons }: heroData) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.heroContainer}>
          <h1 data-test="header">{header}</h1>
          <div className={styles.imgContainer}>
            <Image src={heroImage} alt={alt} fill={true} data-test="heroImg" />
          </div>
        </div>
        <IconCard icons={icons} />
      </div>
    </div>
  );
};

export default HomePageHero;
