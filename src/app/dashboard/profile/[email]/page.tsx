import styles from "./profile.module.scss";
import { Users } from "@prisma/client";

// components:
import ProfileComponent from "@/components/profileComponent/profileComponent";

type paramTypes = {
  params: {
    email: string;
  };
};

const Profile = async ({ params }: paramTypes) => {
  return (
    <div className={styles.container}>
      <ProfileComponent />
    </div>
  );
};

export default Profile;
