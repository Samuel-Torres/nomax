import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Sidebar />
      {children}
    </div>
  );
}
