"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";
import axios, { all } from "axios";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
// import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
//<Posts[]>
export default function Dashboard() {
  const [allPosts, setAllPosts] = useState([
    {
      authorCompany: "Tech",
      authorId: 1,
      authorJobTitle: "Software Engineer",
      authorPersona: "PASSPORTBRO",
      authorUserName: "Sam Last",
      createdAT: "2023-09-01T18:57:35.327Z",
      id: 1,
      imageSrc: null,
      postBody: "This is post #1 by first@gmail.com",
      videoSrc: null,
    },
  ]);
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // const isAuthenticated = status;

  // const fetcher = (...args: string[]): Promise<any> =>
  //   fetch(args.join(",")).then((res) => res.json());

  // const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  // if (isAuthenticated !== "authenticated" && isAuthenticated !== "loading") {
  //   router.push("/auth");
  // }
  console.log(allPosts);
  // useEffect(() => {
  //   axios
  //     .get("/api/posts", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data !== null && res.data !== undefined) {
  //         setAllPosts(res.data);
  //       } else {
  //         setAllPosts([]);
  //       }
  //     })
  //     .catch((err) => console.log("ERR: ", err));
  // }, []);

  // console.log("ALL POSTS: ", allPosts);
  return (
    <div className={styles.container}>
      <DashboardComponent allPosts={allPosts} />
      {/* {data?.newUser && <OnBoardingForm />} */}
    </div>
  );
}
