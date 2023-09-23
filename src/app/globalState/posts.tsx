"use client";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";

import axios from "axios";

// , previousPageData: any
export const getKey = (pageIndex: number) => {
  pageIndex = pageIndex + 1;
  return `/api/posts/${pageIndex}`;
};

// GET POSTS:
export const useAllPosts = (pageType: string) => {
  const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          "Param-Type": "normal",
          "Page-Index": "pass",
        },
      })
      .then((res) => {
        setHasMore(res.data.hasMore);
        setHasFetched(true);
        return res.data.allPosts;
      })
      .catch((error) => {
        setIsError(true);
        setError(new Error(error));
      });

  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    getKey,
    fetcher
  );

  return {
    posts: data?.flat(),
    error,
    setError,
    isError,
    setIsError,
    isLoading,
    hasMore,
    size,
    setSize,
    isValidating,
    hasFetched,
  };
};
