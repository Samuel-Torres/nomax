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

type friendRequestBtnProps = {
  visitedUser: Users;
};

const FriendRequestBtn = ({ visitedUser }: friendRequestBtnProps) => {
  const { user, isLoadingUser, id: loggedInUserId } = useLoggedInUser();
  const { data, isError, status, mutate, isLoading } = useUserFriends(
    visitedUser?.id,
    loggedInUserId,
    "IS_PENDING"
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFriendRequest = (
    receiverId: number,
    senderId: number | undefined
  ) => {
    axios
      .post(`/api/friendsRequest/${senderId}`, {
        senderId,
        receiverId,
      })
      .then((res) => {
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

  if (
    visitedUser === null ||
    isLoadingUser ||
    user === null ||
    isLoading ||
    !data
  ) {
    return <BallSpinner />;
  }

  return (
    <>
      {visitedUser.id !== loggedInUserId && (
        <button
          className={data.status === "pending" ? styles.btnPending : styles.btn}
          onClick={() => handleFriendRequest(visitedUser.id, loggedInUserId)}
          type="button"
          disabled={data.status === "pending" ? true : false}
        >
          {data.status === "pending" ? "Pending" : "Add Friend"}
        </button>
      )}
    </>
  );
};

export default FriendRequestBtn;
