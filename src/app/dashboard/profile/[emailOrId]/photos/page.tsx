"use client";
import React from "react";
import styles from "./photos.module.scss";

import { useSession } from "next-auth/react";
import useSWR from "swr";

// components:
import PhotoCardList from "@/components/photoCard/photoCardList";
import BallSpinner from "@/components/loadingStateComponents/ballSpinner";
import ToastWrapper from "@/components/toast/toastContainer";

const Photos = () => {
  const { data: session } = useSession();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetcher,
    {
      dedupingInterval: 5000,
    }
  );

  if (
    (isLoading && data === undefined) ||
    (null && data?.fetchedUser === null)
  ) {
    return <BallSpinner />;
  }

  if (!isLoading && data.fetchedUser !== null)
    return (
      <div className={styles.container}>
        <ToastWrapper alignment="top-left" />
        <PhotoCardList user={data.fetchedUser} />
      </div>
    );
};

export default Photos;
