"use client";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";

// GET POSTS:
export const useUserFriends = (
  visitedUserId: number | null,
  loggedInUserId: number | null,
  fetchType: string
) => {
  //   const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<number>();

  const fetcher = async (url: string) =>
    axios
      .get(url, {
        headers: {
          "FETCH-TYPE": fetchType,
          "LOGGED-ID": loggedInUserId,
        },
      })
      .then(async (res) => {
        setIsError(false);
        setStatus(res.status);
        console.log("RES: ", res);
        return res?.data;
      })
      .catch((error) => {
        setIsError(true);
        console.log("ERROR: ", error?.response?.data?.message);
        return error?.response?.data?.message;
      });

  const { data, isLoading, mutate, error } = useSWR(
    `/api/friends/${visitedUserId}`,
    fetcher
  );

  return {
    data,
    error,
    isError,
    setIsError,
    isLoading,
    mutate,
    status,
  };
};
