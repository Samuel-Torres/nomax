import styles from "./loading.module.scss";
import LoadingText from "@/components/loadingStateComponents/loadingText";

export default function Loading() {
  return (
    <div>
      <div className={styles.container} style={{ margin: "15px auto" }}>
        <div className={styles.loadingContainer}>
          <LoadingText />
        </div>
      </div>
    </div>
  );
}
