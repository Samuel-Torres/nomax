// components:
import Banner from "@/components/profileComponents/banner/banner";
import ProfileNav from "@/components/profileComponents/profileNav/profileNav";
import { Users } from "@prisma/client";
import styles from "./layout.module.scss";

const fetchUser = async (seachParam: number) => {
  console.log("PARAM: ", seachParam);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${seachParam}`,
      { next: { revalidate: 1800 } }
    );

    const response = await res.json();
    console.log("FETCHED: ", response);
    return response.fetchedUser;
  } catch (error) {
    return new Error(`We're sorry an error occurred. Error: ${error}`);
  }
};

export default async function ProfilePageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    emailOrId: number;
  };
}) {
  const user: Users = await fetchUser(params?.emailOrId);
  console.log("PASSED PARAM: ", params);
  return (
    <div className={styles.container}>
      <Banner bannerPhoto={null} profilePicture={user?.profilePicture} />
      <ProfileNav loggedInUser={user} />
      {children}
    </div>
  );
}
