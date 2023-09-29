import styles from "./friends.module.scss";
import ToastWrapper from "@/components/toast/toastContainer";

//  components:
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
      <ToastWrapper alignment="top-left" />
      <FriendsCard id={params?.emailOrId} />
    </div>
  );
};

export default Friends;
