"use client";

import { Users } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Image from "next/image";

// state:
import { useLoggedInUser } from "@/app/globalState/user";
import { useUserFriends } from "@/app/globalState/friends";

//  components:
import BallSpinner from "../loadingStateComponents/ballSpinner";
import { useNotifications } from "@/app/globalState/notifications";

type friendRequestBtnProps = {
  visitedUser: Users;
};

const FriendRequestBtn = ({ visitedUser }: friendRequestBtnProps) => {
  const { user, isLoadingUser, id: loggedInUserId } = useLoggedInUser();
  const { mutateNotifications } = useNotifications();
  const { data, isError, status, mutate, isLoading } = useUserFriends(
    visitedUser?.id,
    loggedInUserId,
    "IS_PENDING"
  );
  console.log("ID: ", loggedInUserId);
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFriendRequest = (receiverId: number, senderId: number) => {
    axios
      .post(`/api/friendsRequest/${senderId}`, {
        senderId,
        receiverId,
      })
      .then((res) => {
        console.log("STATUS: ", res.status, res);
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        mutate(`/api/friends/${visitedUser?.id}`);
      })
      .catch((error) => {
        toast.error(
          error.response.data.error
            ? `😢 ${error.response.data.error}`
            : "😢 An issue occurred on our end please check back later ",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };

  if (visitedUser === null || isLoadingUser || user === null || isLoading) {
    return <BallSpinner />;
  }

  if (isError && status !== 200) {
    return (
      <div className={styles.errorContainer}>
        <Image
          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693680614/Nomex/dashboard/error_clodv1.png"
          width={50}
          height={50}
          alt="add button erroe"
        />
        <Image
          onClick={handleRefresh}
          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1695773063/Nomex/dashboard/refresh-page-option_k1rato.png"
          width={35}
          height={35}
          alt="refresh icon"
        />
      </div>
    );
  }

  return (
    <div>
      {visitedUser.id !== loggedInUserId && (
        <button
          onClick={() => handleFriendRequest(visitedUser.id, loggedInUserId)}
          type="button"
          disabled={data.status === "pending" ? true : false}
        >
          {data.status === "pending" ? "Pending" : "Add Friend"}
        </button>
      )}
    </div>
  );
};

export default FriendRequestBtn;
