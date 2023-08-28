import styles from "./dashboardPage.module.scss";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <DashboardComponent />
    </div>
  );
}
