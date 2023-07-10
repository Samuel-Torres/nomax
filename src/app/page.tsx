import styles from "./page.module.scss";

// components:
import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <h1>MAIN PAGE</h1>
      </div>
    </main>
  );
}
