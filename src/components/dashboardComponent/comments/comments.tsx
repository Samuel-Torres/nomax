"use client";
import styles from "./comments.module.scss";
import Image from "next/image";
import convertDateToRelative from "@/utils/convertDateToRelativeTime";

type commentProps = {
  id: number;
  authorId: number;
  postId: number;
  createdAt: string;
  authorName: string | null;
  authorPersona: string | null;
  authorJobTitle: string | null;
  authorCompanyName: string | null;
  // profilePicture: string;
  comment: string;
  loggedInUserId: number;
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
  // profilePicture,
  comment,
  loggedInUserId,
}: commentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userSection}>
          <Image
            className={styles.profilePicture}
            // src={profilePicture}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
            width={40}
            height={40}
            alt="profile"
          />
          <div>
            <p className={styles.userInfo}>{authorName}</p>
            <p className={styles.userInfo}>{authorPersona}</p>
            <p className={styles.userInfo}>
              {authorJobTitle} at {authorCompanyName}
            </p>
          </div>
        </div>
        <div className={styles.commentIconConatiner}>
          {loggedInUserId === authorId && (
            <div className={styles.icons}>
              <Image
                className={styles.profilePicture}
                src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693418958/Nomex/dashboard/editing_btgzy6.png"
                width={20}
                height={20}
                alt="google"
              />
              <Image
                className={styles.commentIcon}
                src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693419097/Nomex/dashboard/trash_pglfuc.png"
                width={20}
                height={20}
                alt="google"
              />
            </div>
          )}
          <p className={styles.timePosted}>
            {convertDateToRelative(new Date(createdAt))}
          </p>
        </div>
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
