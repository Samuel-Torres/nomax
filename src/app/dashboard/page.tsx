"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "../lib/exceptions";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// state:
import { useAllPosts } from "../globalState/posts";
import { useLoggedInUser } from "../globalState/user";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
import Error from "./error";

function Dashboard() {
  const notify = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const { status } = useSession();
  const userData = useLoggedInUser();
  const {
    posts,
    isError,
    setIsError,
    hasMore,
    isLoading,
    setError,
    error,
    size,
    setSize,
    isValidating,
    hasFetched,
  } = useAllPosts("index", "bypass");

  const reset = () => {
    setIsError(false);
    window.location.reload();
  };

  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      setError(new AuthRequiredError());
      setIsError(true);
    }
  }, [status, setError, setIsError]);

  return (
    <div>
      {isLoading === true && hasFetched === false ? (
        <Loading pageType="client" />
      ) : (
        <div className={styles.container}>
          <button onClick={notify}>Notify !</button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {posts &&
            posts?.length > 0 &&
            !isError &&
            !userData?.user?.newUser && (
              <DashboardComponent
                allPosts={posts}
                hasMore={hasMore}
                setIsError={setIsError}
                setError={setError}
                size={size}
                setSize={setSize}
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
