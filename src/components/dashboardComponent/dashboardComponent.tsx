"use client";
import { useRef, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { Posts } from "@prisma/client";
import styles from "./dashboardComponent.module.scss";
import useSWR from "swr";

type postProps = {
  allPosts: Array<Posts>;
  page: number;
  setPage: Function;
  hasMore: boolean;
};

// components:
import CreatePost from "./createPost/createPost";
import PostCard from "./postCards/postCard";

export default function DashboardComponent({
  allPosts,
  page,
  setPage,
  hasMore,
}: postProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());
  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  const fetchMorePosts = useCallback(async () => {
    if (!hasMore || isLoading) return; // Prevent fetching if there are no more posts or already loading.
    setIsLoading(true);
    const nextPage: number = page + 1;
    setPage(nextPage);
    setIsLoading(false);
  }, [page, setPage, hasMore, isLoading]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastBookElementRef = useCallback(
    (node: any) => {
      if (!node || !(node instanceof Element)) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      });

      observer.current.observe(node);

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    },
    [fetchMorePosts]
  );

  const toggleForm = () => {
    setIsCreatingPost(!isCreatingPost);
  };

  return (
    <div className={styles.container}>
      <CreatePost isCreatingPost={isCreatingPost} toggleForm={toggleForm} />
      <div className={styles.postContainer}>
        {allPosts.map((post, index) => (
          <PostCard
            key={post.id}
            id={post.id}
            ref={index === allPosts.length - 1 ? lastBookElementRef : null}
            postBody={post.postBody}
            createdAt={post.createdAT}
            authorId={post.authorId}
            authorUserName={post.authorUserName}
            authorPersona={post.authorPersona}
            authorJobTitle={post.authorJobTitle}
            authorCompany={post.authorCompany}
            loggedInUserId={data?.id}
            imageSrc={post.imageSrc}
            videoSrc={post.videoSrc}
          />
        ))}
        {hasMore === false && (
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
  );
}
