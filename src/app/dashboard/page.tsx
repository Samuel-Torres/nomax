"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function Dashboard() {
  const session = useSession();
  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/loggedInUser/${session.data?.user?.email}`,
    fetcher
  );

  console.log("FETCHED CLIENT DATA: ", data);

  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
    </div>
  );
}
