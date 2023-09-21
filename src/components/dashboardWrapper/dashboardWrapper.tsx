"use client";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/auth");
    }
  }, [router, status]);

  return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
