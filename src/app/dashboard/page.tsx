"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AuthRequiredError, fetchError } from "../lib/exceptions";
import Loading from "./loading";
import useSWR, { SWRConfig } from "swr";
import { useAllPosts, useLoggedInUser } from "../globalState/getRequests";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
import Error from "./error";

import { PostWithAuthor } from "@/utils/typeDefinitions/types";

function Dashboard() {
  const [allPosts, setAllPosts] = useState<PostWithAuthor[] | []>([]);
  const [newPost, setNewPost] = useState<PostWithAuthor | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { data: session, status } = useSession();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const data = useLoggedInUser();

  const fetchPosts = useAllPosts(
    page,
    setAllPosts,
    setIsLoading,
    setHasMore,
    setHasFetched,
    setError,
    setIsError
  );

  console.log("ARRAY: ", allPosts);

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
  }, [status]);

  console.log("ERROR: ", fetchPosts);

  // Set error states:
  //  • Move state hooks to fetch request & move them to be returned on object

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        // provider: () => new Map(),
      }}
    >
      {isLoading && hasFetched === false ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {allPosts?.length > 0 && !isError && !data?.user?.newUser && (
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
          {data?.user?.newUser && <OnBoardingForm />}
          {isError && error && <Error error={error} reset={reset} />}
        </div>
      )}
    </SWRConfig>
  );
}

export default Dashboard;
