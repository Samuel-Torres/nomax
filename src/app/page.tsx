import styles from "./page.module.scss";

// components:
import Navbar from "../components/navbar/navbar";
import HomePageHero from "@/components/homePageHero/homePageHero";

export default function Home() {
  console.log("ENV VAR:", process.env.DATABASE_URL_NON_POOLING);
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
