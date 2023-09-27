"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// GET POSTS:
export const useUserFriends = (
  visitedUserId: number,
  loggedInUserId: number | null,
  fetchType: string
) => {
  //   const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          "FETCH-TYPE": fetchType,
          "LOGGED-ID": loggedInUserId,
        },
      })
      .then((res) => {
        setIsError(false);
        console.log("RES: ", res);
      })
      .catch((error) => {
        setIsError(true);
        console.log("ERROR: ", error?.response?.data?.message);
        return error?.response?.data?.message;
      });
  //   console.log("ID: ", id);
  const { data, isLoading, mutate, error } = useSWR(
    `/api/friends/${visitedUserId}`,
    fetcher
  );
  console.log("DATA: ", data, isLoading);
  return {
    data,
    error,
    isError,
    setIsError,
    isLoading,
    mutate,
    setRefreshKey,
  };
};
