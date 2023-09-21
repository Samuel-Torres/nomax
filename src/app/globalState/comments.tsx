import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";

export const useComments = (id: number) => {
  const { data: session } = useSession();
  // const fetcher = async(url: string) => {
  //     axios
  //     .get(`/api/comments/${id}`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setCommentsArr(res.data.data);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       if (
  //         error.response.status === 404 ||
  //         error.response.status === 500 ||
  //         error.status === 400 ||
  //         error.status === 500
  //       ) {
  //         setError(new fetchError());
  //         setIsError(true);
  //         setIsLoading(false);
  //       }
  //     });
  // }
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
