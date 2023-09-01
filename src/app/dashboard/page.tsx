"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Posts } from "@prisma/client";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";

// async function getAllPosts() {
//   const response = await fetch("http://localhost:3000/api/posts", {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// }

export default function Dashboard() {
  // const data = await getAllPosts();
  // const allPosts = await data;
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllPosts(res.data);
        // console.log("res: ", res);
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
