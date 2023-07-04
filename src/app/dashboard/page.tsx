"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const isAuthenticated: string = session.status;

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/loggedInUser/${session.data?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  console.log("FETCHED CLIENT DATA: ", data);

  if (isLoading) {
    return (
      <div>
        <div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
    </div>
  );
}
