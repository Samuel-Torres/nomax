"use client";
// import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useLoggedInUser } from "./user";

export const useNotifications = () => {
  const { id: loggedInUserId } = useLoggedInUser();

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => res?.data.loggedInUserNotifications)
      .catch((err) => err);
  const { data, isLoading, mutate, error } = useSWR(
    `/api/notifications/${loggedInUserId}`,
    fetcher
  );

  return {
    notifications: data,
    count: data?.length,
    isLoading,
    mutateNotifications: mutate,
    error,
  };
};
