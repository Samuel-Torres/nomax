"use client";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import OnBoardingForm from "../../components/onBoardingForm/onBoardingForm";
import DashboardWrapper from "@/components/dashboardWrapper/dashboardWrapper";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status;
  const [isNewUser, setIsNewUser] = useState(false);

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  useEffect(() => {
    if (isAuthenticated !== "authenticated" && isAuthenticated !== "loading") {
      router.push("/auth");
    }

    if (data?.newUser) {
      setIsNewUser(true);
    }
  }, [isAuthenticated, router, data, isNewUser]);

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Sidebar session={session} />
      <DashboardWrapper>{children}</DashboardWrapper>
      {isNewUser && <OnBoardingForm />}
    </div>
  );
}
