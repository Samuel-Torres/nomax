"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import styles from "./dashboardComponent.module.scss";

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
  console.log("DATA: ", data);
  useEffect(() => {
    if (isAuthenticated !== "authenticated" && isAuthenticated !== "loading") {
      router.push("/auth");
    }

    if (data?.newUser) {
      setIsNewUser(true);
    }
  }, [isAuthenticated, router, data, isNewUser]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <div>
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <h1>DashboardClient</h1>
      {/* Onboarding form will show is newUser */}
      {isNewUser && <OnBoardingForm />}
      {/* end */}
    </div>
  );
}
