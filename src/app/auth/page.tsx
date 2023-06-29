import Login from "./loginForm/login";
import styles from "./page.module.scss";

export default function Auth() {
    return (
      <div className={styles.container}>
        <div className={styles.divImage}>
          <Login />
        </div>
      </div>
    )
}