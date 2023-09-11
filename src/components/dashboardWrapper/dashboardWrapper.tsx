"use client";
import React from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status !== "authenticated" && status !== "loading") {
    router.push("/auth");
  }
  return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
