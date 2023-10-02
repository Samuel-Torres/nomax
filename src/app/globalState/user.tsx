"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const useLoggedInUser = () => {
  const { data: session, status } = useSession();
  console.log("SESSION: ", session);
  const router = useRouter();
  const fetcher = async (url: string) => await fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.id}`,
    fetcher,
    {
      dedupingInterval: 5000,
    }
  );

  if (status !== "authenticated" && status !== "loading") {
    router.push("/auth");
  }

  return {
    user: data?.fetchedUser,
    isLoadingUser: isLoading,
    isError: error,
    id: session?.user.id, // Return 0 if storedId is null
  };
};
