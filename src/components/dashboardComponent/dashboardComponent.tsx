"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Posts } from "@prisma/client";
import styles from "./dashboardComponent.module.scss";
import useSWR from "swr";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { AuthRequiredError, fetchError } from "../../app/lib/exceptions";
import BallSpinner from "../loadingStateComponents/ballSpinner";

type postProps = {
  allPosts: Array<Posts>;
  page: number;
  setPage: Function;
  status: string;
  setIsError: Function;
  setError: Function;
  setAllPosts: Function;
  hasMore: boolean;
  setHasMore: Function;
};

// components:
import PostCard from "./postCards/postCard";

export default function DashboardComponent({
  allPosts,
  page,
  setPage,
  status,
  setIsError,
  setError,
  setAllPosts,
  hasMore,
}: postProps) {
  const { data: session } = useSession();
  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  console.log("DATA LENGTH: ", allPosts.length);

  const fetchMorePosts = async () => {
    const nextPage: number = (page += 1);
    await setPage(nextPage);
    if (status !== "unauthenticated" && status !== "loading") {
      axios
        .get(`/api/posts/${page}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        })
        .then((res) => {
          console.log("RES: ", res);
          if (res.status === 200) {
            setAllPosts(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 500 || err.response.status === 404) {
            setError(new fetchError());
            setIsError(true);
          }
        });
    }
    if (status !== "loading" && status === "unauthenticated") {
      setError(new AuthRequiredError());
      setIsError(true);
    }
  };

  console.log(page);
  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <InfiniteScroll
          style={{ border: "2px solid red", margin: "0 auto", width: "60vw" }}
          className={styles.scrollContainer}
          dataLength={allPosts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<BallSpinner />}
        >
          {allPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              postBody={post.postBody}
              createdAt={post.createdAT}
              authorId={post.authorId}
              authorUserName={post.authorUserName}
              authorPersona={post.authorPersona}
              authorJobTitle={post.authorJobTitle}
              authorCompany={post.authorCompany}
              loggedInUserId={data?.id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
