"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const useLoggedInUser = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetcher = async (url: string) => await fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetcher,
    {
      dedupingInterval: 5000,
    }
  );

  if (status !== "authenticated" && status !== "loading") {
    router.push("/auth");
  }

  let storedId: string | null = null;

  if (typeof window !== "undefined") {
    storedId = localStorage.getItem("athUsr");
  }

  if (
    !storedId &&
    data &&
    status !== "loading" &&
    status === "authenticated" &&
    typeof window !== "undefined"
  ) {
    localStorage.setItem("athUsr", data?.fetchedUser.id);
  }

  console.log("ID: ", storedId);

  return {
    user: data?.fetchedUser,
    isLoadingUser: isLoading,
    isError: error,
    id: parseInt(storedId || "0"), // Return 0 if storedId is null
  };
};
