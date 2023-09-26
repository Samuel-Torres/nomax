import Image from "next/image";
import React from "react";
import styles from "./photoCard.module.scss";

type PhotoCardProps = {
  id: number;
  imageSrc: string;
  description: string | null;
  createdAt: Date;
  userId: number;
};

const PhotoCard = ({
  id,
  imageSrc,
  description,
  createdAt,
  userId,
}: PhotoCardProps) => {
  console.log("ITEMS: ", id, imageSrc, description, createdAt, userId);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={imageSrc} fill alt="user upload" />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default PhotoCard;
