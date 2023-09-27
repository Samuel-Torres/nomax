"use client";

import { Users } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "./styles.module.scss";

// state:
import { useLoggedInUser } from "@/app/globalState/user";
import { useUserFriends } from "@/app/globalState/friends";

//  components:
import BallSpinner from "../loadingStateComponents/ballSpinner";

type friendRequestBtnProps = {
  visitedUser: Users;
};

const FriendRequestBtn = ({ visitedUser }: friendRequestBtnProps) => {
  const loggedInUser = useLoggedInUser();
  const { data, error, isError, setIsError, isLoading, mutate, setRefreshKey } =
    useUserFriends(visitedUser?.id, null, "IS_PENDING");

  const handleRefresh = () => {
    console.log("RAN");
    setRefreshKey((prevKey) => prevKey + 1);
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
        // mutate:
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
        //   mutate:
        console.log("ERROR: ", error.response.status, error);
      });
  };

  if (
    visitedUser === null ||
    loggedInUser.isLoadingUser ||
    loggedInUser === null
  ) {
    return <BallSpinner />;
  }

  if (error) {
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
      {visitedUser.id !== loggedInUser?.user?.id && !error && (
        <button
          onClick={() =>
            handleFriendRequest(visitedUser.id, loggedInUser?.user?.id)
          }
          type="button"
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default FriendRequestBtn;
