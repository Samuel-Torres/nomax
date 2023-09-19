import Link from "next/link";
import styles from "./profileNav.module.scss";

type profileNavProps = {
  loggedInUserId: number;
};

const ProfileNav = ({ loggedInUserId }: profileNavProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}></div>
      <div className={styles.bottomSection}>
        <div className={styles.leftSection}></div>
        <div className={styles.rightSection}>
          <Link href={`/dashboard/profile/${loggedInUserId}`}>Posts</Link>
          <Link href={`/dashboard/profile/${loggedInUserId}/photos`}>
            Photos
          </Link>
          <Link href={`/dashboard/profile/${loggedInUserId}/friends`}>
            Friends
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
