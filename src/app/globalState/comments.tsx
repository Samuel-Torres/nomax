import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";

export const useComments = (id: number) => {
  const { data: session } = useSession();
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      console.log("RESPONSE: ", res.data);
      return res.data.data;
    });
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/comments/${id}`,
    fetcher
  );
  console.log("IS VALIDATING: ", isValidating, "IS LOADING: ", isLoading);
  return {
    data: data,
    isLoading,
    isValidating,
    commentMutate: mutate,
  };
};
