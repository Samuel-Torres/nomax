import styles from "./page.module.scss";

// components:
import Navbar from "../components/navbar/navbar";
import HomePageHero from "@/components/homePageHero/homePageHero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <h1>MAIN PAGE</h1>
        <HomePageHero />
      </div>
    </main>
  );
}
