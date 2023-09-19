"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "../lib/exceptions";
import Loading from "./loading";
import useSWR from "swr";

// state:
import { useAllPosts } from "../globalState/posts";
import { useLoggedInUser } from "../globalState/user";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
import Error from "./error";

import { PostWithAuthor } from "@/utils/typeDefinitions/types";

function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [newPost, setNewPost] = useState<PostWithAuthor | null>(null);
  const { data: session, status } = useSession();
  const userData = useLoggedInUser();
  const {
    posts,
    allPosts,
    isError,
    setIsError,
    hasMore,
    isLoading,
    hasFetched,
    setError,
    setIsLoading,
    error,
  } = useAllPosts(page);
  console.log("ALL POSTS ARRAY IN DASH", posts);

  const reset = () => {
    setIsError(false);
    window.location.reload();
  };

  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      setError(new AuthRequiredError());
      setIsError(true);
      setIsLoading(false);
    }
  }, [status, setError, setIsError, setIsLoading]);

  return (
    <div>
      {isLoading && hasFetched === false ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {allPosts?.length > 0 && !isError && !userData?.user?.newUser && (
            <DashboardComponent
              allPosts={allPosts ? allPosts : []}
              newPost={newPost}
              page={page}
              hasMore={hasMore}
              setPage={setPage}
              setNewPost={setNewPost}
              setIsError={setIsError}
              setError={setError}
            />
          )}
          {userData?.user?.newUser && <OnBoardingForm />}
          {isError && error && <Error error={error} reset={reset} />}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
