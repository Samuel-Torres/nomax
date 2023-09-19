import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostWithAuthor } from "@/utils/typeDefinitions/types";
import { fetchError } from "../lib/exceptions";
import axios from "axios";

function hasCommonItems(
  array1: PostWithAuthor[] | [],
  array2: PostWithAuthor[]
) {
  return array1.some((item1) => array2.some((item2) => item1.id === item2.id));
}

// GET POSTS:
export const useAllPosts = (page: number) => {
  const [allPosts, setAllPosts] = useState<PostWithAuthor[] | []>([]);
  const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { data: session, status } = useSession();

  const fetcher = async (url: string) => {
    setIsLoading(true);

    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });

      if (res.status === 200) {
        if (!hasCommonItems(allPosts, res.data.allPosts)) {
          setAllPosts((prevPosts: any) => {
            console.log("PREV: ", prevPosts);
            return prevPosts ? [...prevPosts, ...res.data.allPosts] : [];
          });
          // if (allPosts) {
          //   return [...allPosts, ...res.data.allPosts];
          // } else {
          //   return [...res.data.allPosts];
          // }
        }
        setHasMore(res.data.hasMore);
        setHasFetched(true);
        // return prevPosts
        //   ? ([...prevPosts, ...res.data.allPosts] as PostWithAuthor[])
        //   : [...res.data.allPosts];
      }
    } catch (err: any) {
      if (err.response.status === 500 || err.response.status === 404) {
        setError(new fetchError());
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useSWR(
    status === "authenticated" ? `/api/posts/${page}` : null,
    fetcher
  );

  return {
    posts: data,
    error,
    setError,
    isError,
    setIsError,
    hasMore,
    allPosts,
    isLoading,
    setIsLoading,
    hasFetched,
    setHasFetched,
  };
};
