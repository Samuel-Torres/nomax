"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Posts } from "@prisma/client";
import styles from "./dashboardComponent.module.scss";
import useSWR from "swr";

type postProps = {
  allPosts: Array<Posts>;
};

// components:
import PostCard from "./postCards/postCard";

export default function DashboardComponent({ allPosts }: postProps) {
  const { data: session, status } = useSession();
  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  // console.log("POSTS: ", allPosts, data, session);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        {allPosts.map((post) => (
          <PostCard
            key={post.id}
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
      </div>
    </div>
  );
}
