"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { AuthRequiredError, fetchError } from "../lib/exceptions";
import Loading from "./loading";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
import Error from "./error";

function Dashboard() {
  const [allPosts, setAllPosts] = useState<Posts[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { data: session, status } = useSession();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newPost, setNewPost] = useState<Posts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  const reset = () => {
    setIsError(false);
    window.location.reload();
  };

  useEffect(() => {
    if (status !== "unauthenticated" && status !== "loading") {
      setIsLoading(true);
      axios
        .get(`/api/posts/${page}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAllPosts((prevPosts) => [...prevPosts, ...res.data.allPosts]);
            setHasMore(res.data.hasMore);
            setIsLoading(false);
            setHasFetched(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 500 || err.response.status === 404) {
            setError(new fetchError());
            setIsError(true);
            setIsLoading(false);
          }
        });
    }
    if (status !== "loading" && status === "unauthenticated") {
      setError(new AuthRequiredError());
      setIsError(true);
      setIsLoading(false);
    }
  }, [status, page]);

  return (
    <>
      {isLoading && hasFetched === false ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {allPosts.length > 0 && !isError && (
            <DashboardComponent
              allPosts={allPosts}
              page={page}
              hasMore={hasMore}
              newPost={newPost}
              setPage={setPage}
              setNewPost={setNewPost}
              setIsError={setIsError}
              setError={setError}
            />
          )}
          {data?.newUser && <OnBoardingForm />}
          {isError && error && <Error error={error} reset={reset} />}
        </div>
      )}
    </>
  );
}

export default Dashboard;
