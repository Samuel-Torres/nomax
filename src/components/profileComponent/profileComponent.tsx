"use client";
import styles from "../dashboardComponent/dashboardComponent.module.scss";
import Toast from "../toast/toastContainer";
import { reset } from "@/utils/reset";

// components:
import DashboardComponent from "../dashboardComponent/dashboardComponent";
import Loading from "@/app/dashboard/loading";
import Error from "@/app/dashboard/error";

// state:
import { useAllPosts } from "@/app/globalState/posts";

type profileComponentProps = {
  emailOrId: number;
};

const ProfileComponent = ({ emailOrId }: profileComponentProps) => {
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
    hasFetched,
  } = useAllPosts("id", emailOrId);

  return (
    <div className={styles.container}>
      {isLoading === true && hasFetched === false ? (
        <Loading pageType="server" />
      ) : (
        <div className={styles.container}>
          <Toast alignment="top-left" />
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

          {isError && error && (
            <Error
              error={error}
              reset={() => reset(setIsError)}
              pageType="profile"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
