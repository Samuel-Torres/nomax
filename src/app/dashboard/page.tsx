"use client";
import styles from "./dashboardPage.module.scss";
import React, { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { AuthRequiredError, fetchError } from "../lib/exceptions";

// components:
import DashboardComponent from "@/components/dashboardComponent/dashboardComponent";
import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";
import Error from "./error";

async function Dashboard() {
  const [allPosts, setAllPosts] = useState<Posts[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [error, setError] = useState<Error>();

  const fetcher = (...args: string[]): Promise<any> =>
    fetch(args.join(",")).then((res) => res.json());

  const { data } = useSWR(`/api/users/${session?.user?.email}`, fetcher);

  // const router = useRouter();
  // if (status !== "authenticated" && status !== "loading") {
  //   router.push("/auth");
  // }

  const reset = () => {
    setIsError(false);
    window.location.reload();
  };

  useEffect(() => {
    if (status !== "unauthenticated" && status !== "loading") {
      axios
        .get("/api/posts", {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        })
        .then((res) => {
          console.log("RES: ", res);
          if (res.status === 200) {
            setAllPosts(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 500 || err.response.status === 404) {
            setError(new fetchError());
            setIsError(true);
          }
        });
    }
    if (status !== "loading" && status === "unauthenticated") {
      setError(new AuthRequiredError());
      setIsError(true);
    }
  }, [status]);

  return (
    <div className={styles.container}>
      {allPosts.length > 0 && <DashboardComponent allPosts={allPosts} />}
      {data?.newUser && <OnBoardingForm />}
      {isError && error && <Error error={error} reset={reset} />}
    </div>
  );
}

export default Dashboard;
