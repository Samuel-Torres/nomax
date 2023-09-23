import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";

export const useComments = (id: number) => {
  const { data: session } = useSession();
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data.data;
    });
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/comments/${id}`,
    fetcher
  );
  return {
    data: data,
    isLoading,
    isValidating,
    commentMutate: mutate,
  };
};
