import Sidebar from "../../components/sidebar/sidebar";
import styles from "./layout.module.scss";

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* Include your head content here */}</head>
      <div className={styles.container}>
        <Sidebar />
        {children}
      </div>
    </html>
  );
}
