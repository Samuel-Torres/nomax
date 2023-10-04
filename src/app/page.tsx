import styles from "./page.module.scss";
import Link from "next/link";

// components:
import Navbar from "@/components/navbar/navbar";
import HomePageHero from "@/components/homePageHero/homePageHero";
import Footer from "@/components/footer/footer";

// Data:
import { homePageHeroData } from "@/staticData";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <HomePageHero {...homePageHeroData} />
        <div className={styles.salesPoints}>
          <h2>Discover Your Global Community!</h2>
          <h3>Don&apos;t Get Left Behind, Connect with the World</h3>
          <p>
            Experience a new era of connection and exploration with our
            cutting-edge travel app. Join a vibrant community of like-minded
            adventurers, create lifelong memories, and forge friendships that
            span continents. Whether you&apos;re sharing the thrill of
            discovering hidden gems, organizing unforgettable events, or simply
            connecting with fellow travelers, our platform is your passport to a
            world of possibilities. Say goodbye to missed opportunities and
            hello to a future of global adventures. Embrace the world with open
            arms!
          </p>
          <p>
            it&apos;s time to embark on your next great journey. Join us today!
          </p>
          <Link href="/auth">
            <button className={styles.ctaBtn} type="button">
              Join
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
