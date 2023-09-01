"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";

export default async function Dashboard() {
  const [allPosts, setAllPosts] = useState<Posts[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status;

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  if (isAuthenticated !== "authenticated" && isAuthenticated !== "loading") {
    router.push("/auth");
  }

  useEffect(() => {
    axios
      .get("/api/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllPosts(res.data);
      })
      .catch((err) => console.log("ERR: ", err));
  }, []);

  // console.log("ALL POSTS: ", allPosts);
  return (
    <div className={styles.container}>
      <DashboardComponent allPosts={allPosts} />
      {data?.newUser && <OnBoardingForm />}
    </div>
  );
}
