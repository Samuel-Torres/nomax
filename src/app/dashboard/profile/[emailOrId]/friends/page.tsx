import styles from "./friends.module.scss";

import FriendsCard from "@/components/friendCard/friendsCard";

type paramTypes = {
  params: {
    emailOrId: string;
  };
};

const Friends = ({ params }: paramTypes) => {
  console.log(typeof params.emailOrId);
  return (
    <div className={styles.container}>
      <FriendsCard id={params?.emailOrId} />
    </div>
  );
};

export default Friends;
