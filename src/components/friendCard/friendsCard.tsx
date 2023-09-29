"use client";
import styles from "./styles.module.scss";
import { useUserFriends, useFetchFriends } from "@/app/globalState/friends";
import { useLoggedInUser } from "@/app/globalState/user";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

// components:
import Loading from "@/app/dashboard/loading";

type friendsCardProps = {
  id: string;
};

const FriendsCard = ({ id }: friendsCardProps) => {
  const { id: loggedInUserId } = useLoggedInUser();
  const { data: friends, isLoading, mutate } = useFetchFriends(parseInt(id));
  console.log("FRIENDS: ", friends);

  const removalMessages = [
    "😢 Adiós, my former friend!",
    "👋 Farewell, ex-friend!",
    "😔 So long, former comrade!",
    "🚪 Closing the door on our friendship.",
    "💔 Breaking up with you, my friend.",
    "🥀 Waving goodbye to our friendship.",
    "👥 Unfriended and unbothered.",
    "👣 Stepping out of our friendship.",
    "🥺 Sad to see you go, not really.",
    "😥 It's not me, it's you, ex-friend.",
    "👥 We're just not 'friend' material.",
    "😞 Moving on from our friendship.",
    "🥾 Walking away from our connection.",
    "🤧 The end of our 'friend'-ship.",
    "💼 It's time to unfriend and forget.",
    "😣 Wishing you the best, ex-friend.",
    "🚶‍♂️ Walking solo from now on.",
    "💥 Our friendship just went 'boom'.",
    "😞 Farewell, fair-weather friend.",
    "👋 Breaking free from our bond.",
  ];

  const handleDelete = (friendId: number, loggedInUserId: number) => {
    console.log(friendId, loggedInUserId);
    axios
      .delete(`/api/friendsList/${friendId}`, {
        headers: {
          "LOGGED-USER": loggedInUserId,
        },
      })
      .then((res) => {
        console.log("RES: ", res);
        toast.success(
          removalMessages[Math.floor(Math.random() * removalMessages.length)],
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        mutate();
      })
      .catch((err) => {
        console.log("ERR: ", err);
        toast.error(
          err.response.data.error
            ? `😢 ${err.response.data.message}`
            : "😢 An issue occurred on our end please check back later ",
          {
            position: "top-left",
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

  if (isLoading || !friends) {
    return (
      <div className={styles.spinnerContainer}>
        <Loading pageType={"server"} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {friends?.length > 0 &&
        friends?.map((friend: any) => {
          return (
            <>
              <div
                className={
                  loggedInUserId.toString() === id
                    ? `${styles.loggedInFriendsCardContainer}`
                    : `${styles.visitingFriendsCardContainer}`
                }
              >
                <div className={styles.leftSide}>
                  <Link
                    key={friend?.userARef?.id}
                    href={`/dashboard/profile/${friend?.userARef?.id}`}
                  >
                    <Image
                      className={styles.friendImg}
                      src={
                        friend?.userARef?.profilePicture
                          ? friend?.userARef?.profilePicture
                          : "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
                      }
                      width={80}
                      height={80}
                      alt="profile"
                    />
                    <p className={styles.userName}>
                      {friend?.userARef?.userName}
                    </p>
                    {friend?.userARef?.jobTitle ? (
                      <p className={styles.jobTitle}>
                        {`${friend?.userARef?.jobTitle} at ${friend?.userARef?.companyName}`}
                      </p>
                    ) : null}
                  </Link>
                </div>
                {loggedInUserId.toString() === id ? (
                  <div className={styles.rightSide}>
                    <button
                      onClick={() =>
                        handleDelete(friend?.userARef?.id, loggedInUserId)
                      }
                      className={styles.removeFriendBtn}
                    >
                      Remove Friend
                    </button>
                    {/* <button className={styles.blockBtn}>
                      <div className={styles.btnContent}>
                        <Image
                          className={styles.btnImg}
                          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1695940674/Nomex/dashboard/block_tet8ws.png"
                          width={15}
                          height={15}
                          alt="profile"
                        />
                        <p className={styles.blockText}>Block</p>
                      </div>
                    </button> */}
                  </div>
                ) : null}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default FriendsCard;
