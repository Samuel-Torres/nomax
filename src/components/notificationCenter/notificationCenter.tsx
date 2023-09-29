import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Users } from "@prisma/client";

// state:
import { useNotifications } from "@/app/globalState/notifications";

// components:
import NotificationsCard from "./notificationsCard";

type notificationCenterProps = {
  visitedUser: Users;
};

const NotificationCenter = ({ visitedUser }: notificationCenterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { notifications, isLoading, error, mutateNotifications, count } =
    useNotifications();

  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <Image
          className={styles.icon}
          onClick={toggleNotificationCenter}
          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693421983/Nomex/dashboard/delete_lzxfe3.png"
          width={40}
          height={40}
          alt="notification center"
        />
      ) : (
        <>
          <div className={styles.countContainer}>
            <p>{count}</p>
          </div>
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1695842979/Nomex/dashboard/bell_1_ohmecw.png"
            onClick={toggleNotificationCenter}
            width={40}
            height={40}
            alt="notification center"
          />
        </>
      )}
      <div
        className={`${styles.notifications} ${isOpen ? styles.clicked : ""}`}
      >
        {notifications ? (
          notifications.map((noti: any) => {
            return (
              <NotificationsCard
                key={noti.id}
                id={noti.id}
                message={noti.message}
                receiverId={noti.receiverId}
                senderId={noti.senderId}
                isLoading={isLoading}
                notificationType={noti.type}
                sender={noti.sender}
                friendRequestId={noti.friendId}
                visitedUser={visitedUser}
                mutateNotifications={mutateNotifications}
              />
            );
          })
        ) : (
          <p>
            You don&apos;t have any notifications right now. Please, check back
            later!
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
