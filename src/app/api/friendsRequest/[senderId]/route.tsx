import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function POST(req: NextRequest) {
  const { senderId, receiverId } = await req.json();
  console.log("IN SERVER: ", senderId, receiverId);

  try {
    console.log("ATTEMPTED");
    const checkForPendingRequests = await prisma.friends.findMany({
      where: {
        userA: senderId,
        status: "pending",
      },
    });
    const requestIsPending = checkForPendingRequests.length > 0 ? true : false;
    console.log("CHECK: ", requestIsPending);

    // check if pending request already exists:
    if (requestIsPending) {
      return NextResponse.json(
        {
          error:
            "There is already a pending request for this operation. Please, give the user some time to respond. Thanks!",
        },
        { status: 409 }
      );
    }

    // try sending reuest:
    const sentFriendRequest = await prisma.friends.create({
      data: {
        userA: senderId,
        userB: receiverId,
        status: "pending",
      },
      include: {
        userARef: true,
        userBRef: true,
      },
    });
    // if request fails:
    if (sentFriendRequest.userA !== senderId) {
      return NextResponse.json(
        {
          error: `An error occurred on our end while trying to send ${sentFriendRequest.userBRef.userName} a notification of your request. We're working hard to fix this issue. Please, try again later.`,
        },
        { status: 400 }
      );
    }

    console.log(
      "REQUEST RESONSE: ",
      sentFriendRequest.userARef.userName,
      sentFriendRequest.userBRef.userName
    );
    // if request pass send notification:
    const sentNotification = await prisma.notifications.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        type: "friend_request",
        status: "pending",
        message: `${sentFriendRequest.userARef.userName} has sent you a friend request! Would you like to accept?`,
      },
    });
    console.log("SENT NOTI: ", sentNotification);
    // if notification fails:
    if (sentNotification.senderId !== senderId) {
      // delete the friend request:
      const deleteFriendRequest = await prisma.friends.delete({
        where: {
          id: sentFriendRequest.id,
        },
        include: {
          userARef: true,
          userBRef: true,
        },
      });
      console.log("DELETED: ", deleteFriendRequest);
      // if deletion of friend request passes:
      if (deleteFriendRequest.id === sentFriendRequest.id) {
        return NextResponse.json(
          {
            error: `An error occurred on our end while trying to send ${sentFriendRequest.userBRef.userName} a notification of your request. We're working hard to fix this issue. Try sending another request and we will work on fixing this issue if it persists! Thanks.`,
          },
          { status: 400 }
        );
      }
      // if deletion of friend request fails
      return NextResponse.json(
        {
          error: `An error occurred on our end while trying to send ${sentFriendRequest.userBRef.userName} a notification of your request. Unfortunately, while trying to delete your request the deletion of the request also failed. Please, try sending another request in 7 days once your past request expires.`,
        },
        { status: 400 }
      );
    }
    console.log("SUCCESSFUL REQUEST SENT");
    // successful friend request sent with notification:
    return NextResponse.json(
      {
        message: `🤩 YAY! We sent your request to ${sentFriendRequest.userBRef.userName}! Please, give them some time to accept your request!`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR RAN: ", error);
    return NextResponse.json(
      {
        error: `An Issue occurred on our end. We're working hard to fix this! Please, be patient with us! Thank you!`,
      },
      { status: 500 }
    );
  }
}
