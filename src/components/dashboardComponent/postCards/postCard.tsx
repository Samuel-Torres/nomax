import React, {
  MouseEventHandler,
  useState,
  forwardRef,
  useEffect,
} from "react";
import styles from "./postCard.module.scss";
import Image from "next/image";
import convertDateToRelative from "@/utils/convertDateToRelativeTime";

// sub-components:
import EditPostField from "./editPostField/editPostField";

type postCardProps = {
  id: number;
  postBody: string | null;
  createdAt: Date;
  authorId: number;
  authorUserName: string;
  authorPersona: string;
  authorJobTitle: string;
  authorCompany: string;
  loggedInUserId: number;
  imageSrc: string | null;
  videoSrc: string | null;
};

const PostCard = forwardRef<HTMLDivElement, postCardProps>(function PostCard(
  {
    id,
    postBody,
    createdAt,
    authorId,
    authorUserName,
    authorPersona,
    authorJobTitle,
    authorCompany,
    loggedInUserId,
    imageSrc,
    videoSrc,
  }: postCardProps,
  ref
) {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isImagePresent, setIsImagePresent] = useState(false);
  const [isVideoPresent, setIsVideoPresent] = useState(false);

  const toggleEditingState: MouseEventHandler = () => {
    setIsEditingPost(!isEditingPost);
  };

  useEffect(() => {
    if (imageSrc !== null) {
      if (imageSrc.length > 0) setIsImagePresent(true);
    }
    if (videoSrc !== null) {
      if (videoSrc.length) setIsVideoPresent(true);
    }
  }, [imageSrc, videoSrc]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.postingUserInfo}>
        <div className={styles.leftSection}>
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
            width={50}
            height={50}
            alt="google"
          />
          <div className={styles.secondaryLeftSection}>
            <p className={styles.userName}>{authorUserName}</p>
            <p className={styles.persona}>{authorPersona}</p>
            <p className={styles.job}>
              {authorJobTitle} at {authorCompany}
            </p>
          </div>
        </div>
        <div className={styles.rightSection}>
          <p className={styles.timePast}>{convertDateToRelative(createdAt)}</p>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {authorId === loggedInUserId && (
          <div className={styles.postTools}>
            {isEditingPost ? (
              <Image
                className={styles.editIcon}
                src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693421983/Nomex/dashboard/delete_lzxfe3.png"
                width={20}
                height={20}
                alt="stop-edit"
                onClick={toggleEditingState}
              />
            ) : (
              <Image
                className={styles.editIcon}
                src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693418958/Nomex/dashboard/editing_btgzy6.png"
                width={20}
                height={20}
                alt="edit"
                onClick={toggleEditingState}
              />
            )}
            <Image
              className={styles.deleteIcon}
              src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693419097/Nomex/dashboard/trash_pglfuc.png"
              width={20}
              height={20}
              alt="delete"
            />
          </div>
        )}
        <div
          className={`${styles.transitionContainer} ${
            isEditingPost ? styles.expanded : ""
          }`}
        >
          {!isEditingPost ? (
            <p>{postBody}</p>
          ) : (
            <EditPostField
              postId={id}
              postBeforeEdit={postBody}
              toggleEditingState={toggleEditingState}
            />
          )}
        </div>
      </div>
    </div>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
