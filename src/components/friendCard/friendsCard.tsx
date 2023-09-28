"use client";
import styles from "./styles.module.scss";
import { useUserFriends } from "@/app/globalState/friends";
import { useLoggedInUser } from "@/app/globalState/user";
import Image from "next/image";
import Link from "next/link";

// components:
import BallSpinner from "../loadingStateComponents/ballSpinner";

const FriendsCard = () => {
  const { id } = useLoggedInUser();

  const {
    data: friends,
    error,
    isError,
    setIsError,
    isLoading,
    mutate,
    status,
  } = useUserFriends(null, id, "FETCH_FRIENDS");

  console.log("FRIENDS DATA: ", friends?.data);

  if (isLoading || !friends) {
    return (
      <div className={styles.spinnerContainer}>
        <BallSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {console.log("LENGTH: ", friends?.data.length)}
      {friends?.data.length > 0 &&
        friends?.data.map((friend: any) => {
          return (
            <Link
              key={friend?.userARef?.id}
              href={`/dashboard/profile/${friend?.userARef?.id}`}
            >
              <div className={styles.friendCardContainer}>
                <div className={styles.leftSide}>
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
                </div>
                <div className={styles.rightSide}>
                  <button className={styles.removeFriendBtn}>
                    Remove Friend
                  </button>
                  <button className={styles.blockBtn}>
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
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default FriendsCard;
