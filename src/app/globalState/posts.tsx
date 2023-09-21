import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostWithAuthor } from "@/utils/typeDefinitions/types";

import axios from "axios";

export const getKey = (pageIndex: number, previousPageData: any) => {
  pageIndex = pageIndex + 1;
  console.log("PREV PAGE DATA & INDEX: ", pageIndex, previousPageData);

  return `/api/posts/${pageIndex}`;
};

// GET POSTS:
export const useAllPosts = () => {
  console.log("RAN ALL PPOSTS");
  const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        setHasMore(res.data.hasMore);
        return res.data.allPosts;
      })
      .catch((error) => {
        setIsError(true);
        setError(new Error(error));
      });

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);

  console.log("Has More: ", hasMore);

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
  };
};
