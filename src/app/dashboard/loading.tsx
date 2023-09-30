import styles from "./loading.module.scss";
import LoadingText from "@/components/loadingStateComponents/loadingText";

type loadingProps = {
  pageType: string | null;
};

export default function Loading({ pageType }: loadingProps) {
  return (
    <div>
      <div className={styles.container}>
        <div
          className={
            pageType === "server"
              ? styles.serverContainer
              : styles.clientContainer
          }
        >
          <LoadingText />
        </div>
      </div>
    </div>
  );
}
