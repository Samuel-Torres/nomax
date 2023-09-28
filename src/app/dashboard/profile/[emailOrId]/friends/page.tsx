import styles from "./friends.module.scss";

import FriendsCard from "@/components/friendCard/friendsCard";

const Friends = () => {
  return (
    <div className={styles.container}>
      <FriendsCard />
    </div>
  );
};

export default Friends;
