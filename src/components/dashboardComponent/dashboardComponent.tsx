"use client";
import { useState } from "react";
import styles from "./dashboardComponent.module.scss";
import { useLoggedInUser } from "@/app/globalState/user";

type postProps = {
  allPosts: any[] | undefined;
  hasMore: boolean;
  setError: Function;
  setIsError: Function;
  size: number;
  setSize: Function;
};

// components:
import CreatePost from "./createPost/createPost";
import PostCard from "./postCards/postCard";
import NotificationCenter from "../notificationCenter/notificationCenter";

export default function DashboardComponent({
  allPosts,
  hasMore,
  setError,
  setIsError,
  size,
  setSize,
}: postProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const userData = useLoggedInUser();

  const toggleForm = () => {
    setIsCreatingPost(!isCreatingPost);
  };

  return (
    <>
      <div className={styles.container}>
        <CreatePost
          loggedInUser={userData?.user}
          isCreatingPost={isCreatingPost}
          toggleForm={toggleForm}
          setIsError={setIsError}
          setError={setError}
        />
        <div className={styles.postContainer}>
          {allPosts?.map((post: any) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                postBody={post.postBody}
                createdAt={post.createdAT}
                authorId={post.authorId}
                authorUserName={post.author.userName}
                authorPersona={post.author.persona}
                authorJobTitle={post.author.jobTitle}
                authorCompany={post.author.companyName}
                authorEmail={post?.author?.email}
                loggedInUserId={userData?.user?.id}
                profilePicture={post.author.profilePicture}
                imageSrc={post?.imageSrc ? post?.imageSrc : ""}
                videoSrc={post?.videoSrc ? post?.videoSrc : ""}
                setError={setError}
                setIsError={setIsError}
              />
            );
          })}
          {hasMore ? (
            <button
              className={styles.loadMoreBtn}
              onClick={() => setSize(size + 1)}
            >
              Load More
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p>That is all the posts we have for now. Check back later.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
