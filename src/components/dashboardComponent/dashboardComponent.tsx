"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import OnBoardingForm from "../../components/onBoardingForm/onBoardingForm";

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status;
  const [isNewUser, setIsNewUser] = useState(false);

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    if (isAuthenticated !== "authenticated" && isAuthenticated !== "loading") {
      router.push("/auth/login");
    }

    if (data?.newUser) {
      setIsNewUser(true);
    }
  }, [isAuthenticated, router, data, isNewUser]);

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
      <h1>DashboardClient PAGE</h1>
      {isNewUser && <OnBoardingForm />}
    </div>
  );
}
