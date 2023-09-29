import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const visitedUserId: number = parseInt(id);

  try {
    const fetchedFriends = await prisma.friends.findMany({
      where: {
        userB: visitedUserId,
        status: "accepted",
      },
      include: {
        userARef: true,
      },
    });
    return NextResponse.json(
      {
        data: fetchedFriends.length > 0 ? fetchedFriends : [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Record<string, any>
) {
  const LOGGED_IN_USER_ID = req.headers.get("LOGGED-USER");
  const userB: number = parseInt(LOGGED_IN_USER_ID as string);
  const { id } = params;
  const userA: number = parseInt(id);
  console.log("ID's: ", typeof userA, typeof userB);

  try {
    // const notificationToDelete = await prisma.notifications.findFirst({
    //   where: {
    //     receiverId: userB,
    //     senderId: userA,
    //   },
    // });

    const findFriendRequest = await prisma.friends.findFirst({
      where: {
        userA: userA,
        userB: userB,
        status: "accepted",
      },
    });
    console.log("FRIEND REQ: ", findFriendRequest);
    // console.log("FRIEND NOTI: ", notificationToDelete);

    // const deleteNotification = await prisma.notifications.delete({
    //   where: {
    //     id: notificationToDelete?.id,
    //   },
    // });
    // console.log("DELETED: ", deleteNotification);

    const deletedFriend = await prisma.friends.delete({
      where: {
        id: findFriendRequest?.id,
      },
    });

    console.log("DELETED FRIEND: ", deletedFriend);

    if (deletedFriend.userA === userA) {
      return NextResponse.json(
        {
          deletedFriend,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Friend not found",
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
