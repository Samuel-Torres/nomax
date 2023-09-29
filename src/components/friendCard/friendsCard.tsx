"use client";
import styles from "./styles.module.scss";
import { useUserFriends, useFetchFriends } from "@/app/globalState/friends";
import { useLoggedInUser } from "@/app/globalState/user";
import Image from "next/image";
import Link from "next/link";

// components:
import Loading from "@/app/dashboard/loading";

type friendsCardProps = {
  id: string;
};

const FriendsCard = ({ id }: friendsCardProps) => {
  const { id: loggedInUserId } = useLoggedInUser();
  const { data: friends, isLoading, mutate } = useFetchFriends(parseInt(id));
  console.log("FRIENDS: ", friends);
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
            <Link
              key={friend?.userARef?.id}
              href={`/dashboard/profile/${friend?.userARef?.id}`}
            >
              <div
                className={
                  loggedInUserId.toString() === id
                    ? `${styles.loggedInFriendsCardContainer}`
                    : `${styles.visitingFriendsCardContainer}`
                }
              >
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
                {loggedInUserId.toString() === id ? (
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
                ) : null}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default FriendsCard;
