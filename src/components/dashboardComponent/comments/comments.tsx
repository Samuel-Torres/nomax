"use client";
import styles from "./comments.module.scss";
import axios from "axios";
import Image from "next/image";
import convertDateToRelative from "@/utils/convertDateToRelativeTime";

type commentProps = {
  id: number;
  authorId: number;
  postId: number;
  createdAt: string;
  authorName: string;
  authorPersona: string;
  authorJobTitle: string;
  authorCompanyName: string;
  profilePicture: string;
  comment: string;
};

const Comments = ({
  id,
  authorId,
  postId,
  createdAt,
  authorName,
  authorPersona,
  authorJobTitle,
  authorCompanyName,
  profilePicture,
  comment,
}: commentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userSection}>
          <Image
            className={styles.profilePicture}
            src={profilePicture}
            width={40}
            height={40}
            alt="google"
          />
          <div>
            <p className={styles.userInfo}>{authorName}</p>
            <p className={styles.userInfo}>{authorPersona}</p>
            <p className={styles.userInfo}>
              {authorJobTitle} at {authorCompanyName}
            </p>
          </div>
        </div>
        <p className={styles.timePosted}>
          {convertDateToRelative(new Date(createdAt))}
        </p>
      </div>
      <div className={styles.ontainer}>
        <p>{comment}</p>
      </div>
      <div className={styles.engagementPanel}>
        <p className={styles.engagement}>like</p>
        <p className={styles.engagement}>reply</p>
      </div>
    </div>
  );
};

export default Comments;
