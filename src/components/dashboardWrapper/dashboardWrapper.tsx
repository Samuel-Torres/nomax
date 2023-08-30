import React from "react";
import styles from "./styles.module.scss";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
