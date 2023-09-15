import React from "react";
import styles from "./profile.module.scss";
import { Users } from "@prisma/client";

const fetchUser = async (seachParam: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${seachParam}`,
      { next: { revalidate: 1800 } }
    );

    const response = await res.json();
    return response;
  } catch (error) {
    return new Error(`We're sorry an error occurred. Error: ${error}`);
  }
};

type paramTypes = {
  params: {
    searchParam: number;
  };
};

// components:
import Banner from "@/components/profileComponents/banner/banner";

const Profile = async ({ params }: paramTypes) => {
  const userData = await fetchUser(params.searchParam);
  const user: Users = await userData.fetchedUser;

  console.log("DATA: ", user);
  return (
    <div className={styles.container}>
      <Banner bannerPhoto={null} profilePicture={user?.profilePicture} />
    </div>
  );
};

export default Profile;
