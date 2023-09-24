import styles from "./page.module.scss";

// components:
import Navbar from "@/components/navbar/navbar";
import HomePageHero from "@/components/homePageHero/homePageHero";

// Data:
import { homePageHeroData } from "@/staticData";
export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <HomePageHero {...homePageHeroData} />
      </div>
    </main>
  );
}
