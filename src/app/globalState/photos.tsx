"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

// GET POSTS:
export const useUserPhotos = (id: number) => {
  const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        return res.data.fetchedPhotos;
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        setIsError(true);
        setError(new Error(error));
      });
  const { data, isValidating, isLoading, mutate } = useSWR(
    `/api/photos/${id}`,
    fetcher
  );

  return {
    photos: data,
    error,
    setError,
    isError,
    setIsError,
    isLoading,
    isValidating,
    mutate,
  };
};
