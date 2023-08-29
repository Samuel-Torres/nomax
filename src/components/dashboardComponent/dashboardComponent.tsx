"use client";
import { useSession } from "next-auth/react";
import styles from "./dashboardComponent.module.scss";

export default function DashboardComponent() {
  const { data: session, status } = useSession();
  // console.log("SESSION IN CLIENT: ", session);

  return (
    <div className={styles.container}>
      <h1>DashboardClient</h1>
    </div>
  );
}
