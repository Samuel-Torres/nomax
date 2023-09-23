"use client";

import styles from "../dashboardComponent/dashboardComponent.module.scss";

// components:
import DashboardComponent from "../dashboardComponent/dashboardComponent";
import Loading from "@/app/dashboard/loading";
import Error from "@/app/error";

// state:
import { useAllPosts } from "@/app/globalState/posts";

const ProfileComponent = () => {
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
  } = useAllPosts("server");

  const reset = () => {
    setIsError(false);
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      {isLoading === true && hasFetched === false ? (
        <Loading pageType="server" />
      ) : (
        <div className={styles.container}>
          {posts && posts?.length > 0 && (
            <DashboardComponent
              allPosts={posts}
              hasMore={hasMore}
              setIsError={setIsError}
              setError={setError}
              size={size}
              setSize={setSize}
            />
          )}

          {isError && error && <Error error={error} reset={reset} />}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
