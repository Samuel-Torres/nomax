import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";
import { PostWithAuthor } from "@/utils/typeDefinitions/types";
import { AuthRequiredError, fetchError } from "../lib/exceptions";

export const useLoggedInUser = () => {
  const { data: session } = useSession();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetcher
  );

  return {
    user: data?.fetchedUser,
    isLoading,
    isError: error,
  };
};

export const useAllPosts = (
  page: number,
  setAllPosts: Function,
  setIsLoading: Function,
  setHasMore: Function,
  setHasFetched: Function,
  setError: Function,
  setIsError: Function
) => {
  const { data: session, status } = useSession();

  const fetcher = (url: string) => {
    // if (session) { // fix this
    setIsLoading(true);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAllPosts((prevPosts: any) => {
            return prevPosts
              ? ([...prevPosts, ...res.data.allPosts] as PostWithAuthor[])
              : [];
          });
          setHasMore(res.data.hasMore);
          setIsLoading(false);
          setHasFetched(true);
        }
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 500 || err.response.status === 404) {
          setError(new fetchError());
          setIsError(true);
          setIsLoading(false);
        }
        return { isError: err };
      });
    // }
  };

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/posts/${page}`,
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
  };
};
