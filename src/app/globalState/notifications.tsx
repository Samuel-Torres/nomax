"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useLoggedInUser } from "./user";

export const useNotifications = () => {
  // const [loggedInUserId, setLoggedInUserId] = useState<string>();
  const { id: loggedInUserId } = useLoggedInUser();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setLoggedInUserId(localStorage.getItem("athUsr") as string);
  //   }
  // }, [setLoggedInUserId]);

  console.log("ID: ", loggedInUserId);
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => res?.data.loggedInUserNotifications)
      .catch((err) => err);
  const { data, isLoading, mutate, error } = useSWR(
    `/api/notifications/${loggedInUserId}`,
    fetcher
  );
  console.log("NOTI DATA: ", data);
  return {
    notifications: data,
    isLoading,
    mutateNotifications: mutate,
    error,
  };
};
