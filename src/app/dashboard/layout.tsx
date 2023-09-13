"use client";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";
import DashboardWrapper from "@/components/dashboardWrapper/dashboardWrapper";
import { useState, useEffect } from "react";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.container}>
      <Sidebar innerWidth={viewportWidth} />
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
