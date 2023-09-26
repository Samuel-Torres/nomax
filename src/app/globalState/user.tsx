import useSWR from "swr";
import { useSession } from "next-auth/react";

export const useLoggedInUser = () => {
  const { data: session } = useSession();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetcher,
    {
      dedupingInterval: 5000,
    }
  );

  return {
    user: data?.fetchedUser,
    isLoadingUser: isLoading,
    isError: error,
  };
};
