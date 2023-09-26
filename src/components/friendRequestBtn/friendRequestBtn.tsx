"use client";
import { Users } from "@prisma/client";
import axios from "axios";
import { useLoggedInUser } from "@/app/globalState/user";
import { toast } from "react-toastify";

//  components:
import BallSpinner from "../loadingStateComponents/ballSpinner";

type friendRequestBtnProps = {
  visitedUser: Users;
};

const FriendRequestBtn = ({ visitedUser }: friendRequestBtnProps) => {
  const loggedInUser = useLoggedInUser();

  const handleFriendRequest = (receiverId: number, senderId: number) => {
    axios
      .post(`/api/friends/${senderId}`, {
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

  if (visitedUser === null || loggedInUser === null) {
    return <BallSpinner />;
  }

  return (
    <div>
      <button
        onClick={() =>
          handleFriendRequest(visitedUser.id, loggedInUser.user.id)
        }
        type="button"
      >
        Add Friend
      </button>
    </div>
  );
};

export default FriendRequestBtn;
