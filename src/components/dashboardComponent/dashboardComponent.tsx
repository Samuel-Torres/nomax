import { useRef, useCallback, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./dashboardComponent.module.scss";
import useSWR from "swr";

import { Prisma } from "@prisma/client";

const postBodyAndAuthor = Prisma.validator<Prisma.PostsArgs>()({
  select: {
    id: true,
    authorId: true,
    createdAT: true,
    imageSrc: true,
    videoSrc: true,
    postBody: true,
    comments: true,
    author: true,
  },
});
type PostWithAuthor = Prisma.PostsGetPayload<typeof postBodyAndAuthor>;

type postProps = {
  allPosts: PostWithAuthor[] | [];
  newPost: PostWithAuthor | null;
  page: number;
  setPage: Function;
  hasMore: boolean;
  setNewPost: Function;
  setError: Function;
  setIsError: Function;
};

// components:
import CreatePost from "./createPost/createPost";
import PostCard from "./postCards/postCard";

export default function DashboardComponent({
  allPosts,
  page,
  setPage,
  hasMore,
  newPost,
  setNewPost,
  setError,
  setIsError,
}: postProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  useEffect(() => {}, []);

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());
  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  const fetchMorePosts = useCallback(() => {
    if (!hasMore || isLoading) {
      setIsLoading(false);
      return;
    } // Prevent fetching if there are no more posts or already loading.

    setIsLoading(true);
    const nextPage: number = page + 1;
    setPage(nextPage);
  }, [page, setPage, hasMore, isLoading]);

  const observer = useRef<IntersectionObserver | null>(null);

  const debounceFetchMorePosts = useCallback(() => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    setTimeout(() => {
      fetchMorePosts();
    }, 500);
  }, [debounceTimer, fetchMorePosts]);

  const lastBookElementRef = useCallback(
    (node: any) => {
      if (!node || !(node instanceof Element)) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Check if the node is in the viewport
          const isInViewport =
            entries[0].intersectionRatio > 0 &&
            entries[0].boundingClientRect.bottom <= window.innerHeight + 1000;

          if (isInViewport) {
            debounceFetchMorePosts(); // Debounced function call
          }
        }
      });

      observer.current.observe(node);

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    },
    [debounceFetchMorePosts]
  );

  const toggleForm = () => {
    setIsCreatingPost(!isCreatingPost);
  };

  return (
    <div className={styles.container}>
      <CreatePost
        loggedInUser={data}
        isCreatingPost={isCreatingPost}
        toggleForm={toggleForm}
        setNewPost={setNewPost}
        setIsError={setIsError}
        setError={setError}
      />
      <div className={styles.postContainer}>
        {newPost && (
          <PostCard
            key={newPost.id}
            id={newPost.id}
            postBody={newPost?.postBody}
            createdAt={newPost?.createdAT}
            authorId={newPost?.authorId}
            authorUserName={newPost?.author.userName}
            authorPersona={newPost?.author.persona}
            authorJobTitle={newPost?.author.jobTitle}
            authorCompany={newPost?.author.companyName}
            loggedInUserId={data?.id}
            imageSrc={newPost?.imageSrc ? newPost?.imageSrc : ""}
            videoSrc={newPost?.videoSrc ? newPost?.videoSrc : ""}
            setError={setError}
            setIsError={setIsError}
          />
        )}
        {allPosts?.map((post, index) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              ref={index === allPosts.length - 1 ? lastBookElementRef : null}
              postBody={post.postBody}
              createdAt={post.createdAT}
              authorId={post.authorId}
              authorUserName={post.author.userName}
              authorPersona={post.author.persona}
              authorJobTitle={post.author.jobTitle}
              authorCompany={post.author.companyName}
              loggedInUserId={data?.id}
              profilePicture={post.author.profilePicture}
              imageSrc={post?.imageSrc ? post?.imageSrc : ""}
              videoSrc={post?.videoSrc ? post?.videoSrc : ""}
              setError={setError}
              setIsError={setIsError}
            />
          );
        })}
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
