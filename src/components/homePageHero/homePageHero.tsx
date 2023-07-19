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

const HomePageHero = ({ heroImage, alt, header, icons }: heroData) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={heroImage} alt={alt} fill={true} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <h1>{header}</h1>
        </div>
        <div className={styles.iconContainer}>
          {icons.map((item) => (
            // add dynamic div
            // break into its own component
            <div key={item.id} className={styles.iconComponent}>
              <Image
                className={styles.iconImage}
                src={item.iconImage}
                alt="icon"
                width={100}
                height={100}
              />
              <h2>{item.text}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageHero;
