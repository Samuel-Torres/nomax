import React, {
  MouseEventHandler,
  useState,
  forwardRef,
  useEffect,
} from "react";
import styles from "./postCard.module.scss";
import Image from "next/image";
import convertDateToRelative from "@/utils/convertDateToRelativeTime";
import { fetchError } from "@/app/lib/exceptions";
import axios from "axios";

// sub-components:
import EditPostField from "./editPostField/editPostField";
import Comments from "../comments/comments";

type postCardProps = {
  id: number;
  postBody: string | null;
  createdAt: Date;
  authorId: number;
  authorUserName: string | null;
  authorPersona: string | null;
  authorJobTitle: string | null;
  authorCompany: string | null;
  loggedInUserId: number;
  imageSrc: string;
  videoSrc: string;
  setError: Function;
  setIsError: Function;
};

const comment = [
  {
    id: 0,
    authorId: 1,
    postId: 1,
    createdAt: "2023-09-11T22:39:32.179Z",
    authorName: "Diana",
    authorPersona: "BackPacker",
    authorJobTitle: "UI/UX",
    authorCompanyName: "Amazon",
    profilePicture:
      "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png",
    comment: "Wow, this is awesome! Where is this at?! I want to go!",
  },
  {
    id: 1,
    authorId: 1,
    postId: 1,
    createdAt: "2023-09-11T22:39:32.179Z",
    authorName: "Diana",
    authorPersona: "BackPacker",
    authorJobTitle: "UI/UX",
    authorCompanyName: "Amazon",
    profilePicture:
      "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png",
    comment: "Wow, this is awesome! Where is this at?! I want to go!",
  },
];

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
    setError,
    setIsError,
  }: postCardProps,
  ref
) {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isImagePresent, setIsImagePresent] = useState(false);
  const [isVideoPresent, setIsVideoPresent] = useState(false);
  const [collapsedPostBody, setCollapsedPostBody] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [length, setLength] = useState<number>();

  const toggleEditingState: MouseEventHandler = () => {
    setIsEditingPost(!isEditingPost);
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (imageSrc.length !== null) {
      if (imageSrc.length > 0) setIsImagePresent(true);
    }
    if (videoSrc !== null) {
      if (videoSrc.length) setIsVideoPresent(true);
    }
    if (postBody) {
      if (postBody?.length >= 38) {
        setCollapsedPostBody(`${postBody?.substring(0, 38)}`);
        setIsCollapsed(true);
        setLength(postBody?.length);
      } else {
        setCollapsedPostBody(postBody);
        setIsCollapsed(true);
        setLength(postBody?.length);
      }
    }
  }, [imageSrc, videoSrc, postBody]);

  const insertSeeMoreBtn = () => {
    if (!postBody || (length && length < 38)) return;

    return (
      <p
        className={`${styles.readMore} ${styles.toggleBtn}`}
        onClick={toggleCollapsed}
      >
        {isCollapsed ? "Read More" : "Read Less"}
      </p>
    );
  };

  const deletePost = async (postId: number) => {
    const id = postId;
    axios
      .delete(`/api/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        } else {
          setError(new fetchError());
          setIsError(true);
        }
      })
      .catch((error) => {
        if (
          error.response.status === 404 ||
          error.response.status === 500 ||
          error.status === 400 ||
          error.status === 500
        ) {
          setError(new fetchError());
          setIsError(true);
        }
      });
  };

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
              onClick={() => deletePost(id)}
              src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693419097/Nomex/dashboard/trash_pglfuc.png"
              width={20}
              height={20}
              alt="delete"
            />
          </div>
        )}
        <div
          className={`${
            isImagePresent
              ? styles.transitionContainerWithImg
              : styles.transitionContainerWithOutImg
          } ${isEditingPost ? styles.isEditingPost : ""} ${
            isCollapsed ? "" : styles.expanded
          }`}
        >
          {!isEditingPost ? (
            <div className={styles.postBodyContainer}>
              <div
                className={`${styles.postContainer} ${
                  isCollapsed ? "" : styles.expanded
                }`}
              >
                <div className={styles.bodyContainer}>
                  {isCollapsed ? (
                    <p className={styles.body}>{collapsedPostBody}</p>
                  ) : (
                    <p className={styles.body}>{postBody}</p>
                  )}
                  {insertSeeMoreBtn()}
                  {isImagePresent && (
                    <div className={styles.imgContainer}>
                      <Image
                        className={styles.postImg}
                        src={imageSrc}
                        fill={true}
                        // width={450}
                        // height={450}
                        alt="post-img"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* <div>LIKE ICON HERE</div> */}
              <div className={styles.commentSlash} />
              {comment.map((item, index) => (
                <Comments
                  key={index}
                  id={item.id}
                  authorId={item.authorId}
                  postId={item.postId}
                  createdAt={item.createdAt}
                  authorName={item.authorName}
                  authorPersona={item.authorPersona}
                  authorJobTitle={item.authorCompanyName}
                  authorCompanyName={item.authorCompanyName}
                  profilePicture={item.profilePicture}
                  comment={item.comment}
                />
              ))}
            </div>
          ) : (
            <EditPostField
              postId={id}
              postBeforeEdit={postBody}
              setError={setError}
              setIsError={setIsError}
            />
          )}
        </div>
      </div>
    </div>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
