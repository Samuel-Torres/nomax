import styles from "./profile.module.scss";

// components:
import ProfileComponent from "@/components/profileComponent/profileComponent";

type paramTypes = {
  params: {
    emailOrId: number;
  };
};

const Profile = async ({ params }: paramTypes) => {
  return (
    <div className={styles.container}>
      <ProfileComponent emailOrId={params?.emailOrId} />
    </div>
  );
};

export default Profile;
