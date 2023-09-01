"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";

export default async function Dashboard() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllPosts(res.data);
        console.log("res: ", res);
      })
      .catch((err) => console.log("ERR: ", err));
  }, []);

  // console.log("ALL POSTS: ", allPosts);
  return (
    <div className={styles.container}>
      <DashboardComponent allPosts={allPosts} />
    </div>
  );
}
