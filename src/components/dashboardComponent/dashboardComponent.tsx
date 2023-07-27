"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// sub components:
import OnBoardingForm from "../../components/onBoardingForm/onBoardingForm";

export default function DashboardClient() {
  const session = useSession();
  const router = useRouter();
  const isAuthenticated: string = session.status;

  const [isNewUser, setIsNewUser] = useState(false);

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/users/${session.data?.user?.email}`,
    fetcher
  );

  const handleClick = () => {
    console.log("BUTTON WAS CLICKED");
  };

  useEffect(() => {
    if (isAuthenticated !== "authenticated") {
      router.push("/auth/login");
    }
    // push to onboarding:
    if (data?.newUser) {
      setIsNewUser(true);
    }
  }, [isAuthenticated, router, data, isNewUser]);

  // console.log("FETCHED CLIENT DATA: ", data);
  // console.log("AUTH STATUS: ", isAuthenticated, session, isNewUser);

  // change to suspense loading component with page layout:
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
