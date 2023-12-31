"use client";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

// GET POSTS:
export const useUserFriends = (
  visitedUserId: number | null,
  loggedInUserId: number | undefined,
  fetchType: string
) => {
  //   const [error, setError] = useState<Error>();
  const session = useSession();
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<number>();
  console.log("FETCH FRIENDS ID: ", session?.data?.user.id);
  const fetcher = async (url: string) =>
    axios
      .get(url, {
        headers: {
          "FETCH-TYPE": fetchType,
          "LOGGED-ID": session?.data?.user.id,
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

export const useFetchFriends = (visitedUserId: number) => {
  console.log("ID: ", visitedUserId);
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  const { data, isLoading, mutate, error } = useSWR(
    visitedUserId ? `/api/friendsList/${visitedUserId}` : null,
    fetcher
  );
  console.log("DATA: ", data);
  return {
    data,
    isLoading,
    mutate,
  };
};
