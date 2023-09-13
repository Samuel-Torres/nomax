import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";
import DashboardWrapper from "@/components/dashboardWrapper/dashboardWrapper";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
