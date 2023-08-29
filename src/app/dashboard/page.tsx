import styles from "./dashboardPage.module.scss";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";

async function getAllPosts() {
  const response = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Dashboard() {
  const allPosts = await getAllPosts();
  // console.log("ALL POSTS: ", JSON.stringify(allPosts));
  return (
    <div className={styles.container}>
      <DashboardComponent />
    </div>
  );
}
