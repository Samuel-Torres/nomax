"use client";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";
import DashboardWrapper from "@/components/dashboardWrapper/dashboardWrapper";
import { SWRConfig } from "swr";

// middleware:
import { trackLiveQueries } from "../globalState/middleware";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
          dedupingInterval: 100,
          use: [trackLiveQueries],
          // provider: () => new Map(),
        }}
      >
        <Sidebar />
        <DashboardWrapper>{children}</DashboardWrapper>
      </SWRConfig>
    </div>
  );
}
