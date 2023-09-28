"use client";
import { personaTypes } from "@prisma/client";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

// components:
import BallSpinner from "../loadingStateComponents/ballSpinner";
import axios from "axios";
import { useLoggedInUser } from "@/app/globalState/user";

type notificationCardProps = {
  isLoading: boolean;
  id: number;
  message: string;
  receiverId: number;
  senderId: number;
  friendRequestId: number;
  notificationType: string;
  sender: {
    id: number;
    email: string;
    password: string | null;
    created_At: Date;
    bio: string | null;
    persona: personaTypes | null;
    jobTitle: string | null;
    companyName: string | null;
    userName: string | null;
    newUser: boolean;
    profilePicture: string | null;
  };
  mutateNotifications: KeyedMutator<string>;
};

const NotificationsCard = ({
  isLoading,
  id: notificationId,
  message,
  receiverId,
  senderId,
  notificationType,
  sender,
  friendRequestId,
  mutateNotifications,
}: notificationCardProps) => {
  const { id } = useLoggedInUser();
  console.log("ID: ", id);

  const acceptanceMessages = [
    "🎉 Yay! Let's be friends!",
    "🥳 Woohoo! Friend request accepted!",
    "🤗 Hey there new friend! Request accepted!",
    "👋 Hello, friend! Let's make some memories!",
    "🚀 Blast off into friendship mode!",
    "💫 Buckle up, it's going to be a fun friendship ride!",
    "🌟 Brightening up my day with a new friend!",
    "🌈 Let's paint the town with friendship colors!",
    "🎈 Popping in to say, let's be friends!",
    "🎊 Confetti time! We're officially friends!",
    "🥂 Cheers to a new friendship!",
    "🥳 It's a party now that we're friends!",
    "😄 Ready for a friendship full of smiles!",
    "😊 Can't wait for all the fun times ahead!",
    "🎠 Ready for a whirlwind of friendship adventures!",
    "🎶 Let's dance through the journey of friendship!",
    "💃 Twirling into this new friendship!",
    "🍭 Sweetening life with a new friend!",
    "🍀 Lucky me, I found a new friend!",
    "🌻 Blooming into a beautiful friendship!",
  ];

  const rejectionMessages = [
    "😅 Oops! Let's try again later!",
    "🤷‍♂️ Maybe next time, friend!",
    "🙅‍♀️ A little bump in the friendship road!",
    "🚫 Not this time, but thanks for asking!",
    "🤔 Hmm, not quite the right moment!",
    "❌ Friendship request not approved this time!",
    "⛔️ Request denied, but don't give up!",
    "🔇 Shh... Friendship on pause for now!",
    "🔍 Searching for the perfect friendship vibes!",
    "💬 Let's chat a bit more before becoming friends!",
    "💡 The friendship light bulb needs a bit more time!",
    "🤐 Mums the word on friendship for now!",
    "🔒 Locking in some more friend-time soon!",
    "🚧 Friendship under construction!",
    "⏳ Just a little more time for friendship prep!",
    "🧩 Waiting for the last piece of the friendship puzzle!",
    "🔔 Ding dong! Friendship doorbell rings later!",
    "🚪 Closing the friendship door for now!",
    "🔑 Friendship key still in the making!",
    "🚫 Friendship request temporarily out of service!",
  ];

  const handleFriendRequest = (
    action: string,
    receiverId: number,
    senderId: number
  ) => {
    axios
      .put(`/api/friends/${friendRequestId}`, {
        action,
        receiverId,
        senderId,
        notificationId,
      })
      .then((res) => {
        console.log("FRIEND REQUEST RES: ", res);
        if (res.data.postedAction.status === "accepted") {
          toast.success(
            acceptanceMessages[
              Math.floor(Math.random() * acceptanceMessages.length)
            ],
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
          mutateNotifications();
        }
        if (res.data.postedAction.status === "rejected") {
          toast.success(
            rejectionMessages[
              Math.floor(Math.random() * rejectionMessages.length)
            ],
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
          mutateNotifications();
        }
      })
      .catch((err) => {
        console.log("ERRORING:", err);
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

  if (notificationType === "friend_request") {
    return (
      <>
        {isLoading ? (
          <BallSpinner />
        ) : (
          <div className={styles.notiContainer}>
            <div className={styles.userSection}>
              <Image
                className={styles.profileImg}
                src={
                  sender.profilePicture
                    ? sender.profilePicture
                    : "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
                }
                width={80}
                height={80}
                alt="user profile"
              />
            </div>
            <div className={styles.aside}>
              <p className={styles.message}>{message}</p>
              <div className={styles.btnContainer}>
                <button
                  onClick={() =>
                    handleFriendRequest("accepted", receiverId, senderId)
                  }
                  className={styles.accept}
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleFriendRequest("rejected", receiverId, senderId)
                  }
                  className={styles.deny}
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <></>;
};

export default NotificationsCard;
