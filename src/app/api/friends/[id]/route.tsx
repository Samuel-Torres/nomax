import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const visitedUser: number = parseInt(id);
  //   console.log(typeof visitedUser, visitedUser);
  //   loggedInUser?.user?.id
  const FETCH_TYPE = req.headers.get("FETCH-TYPE");
  const LOGGED_IN_USER_ID = req.headers.get("LOGGED-ID");
  const loggedInUserId: number | null =
    typeof LOGGED_IN_USER_ID === "string" ? parseInt(LOGGED_IN_USER_ID) : null;
  // console.log(LOGGED_IN_USER_ID);
  // console.log("ID: ", loggedInUserId, visitedUser);

  switch (FETCH_TYPE) {
    case "IS_PENDING":
      if (!loggedInUserId) {
        return NextResponse.json(
          {
            message:
              "An Issue occurred on our end. Our development team is working urgently to resolve this issue. Error: loggedId should not be null.",
          },
          { status: 400 }
        );
      }
      const isFriendRequestPending = await prisma.friends.findFirst({
        where: {
          userA: loggedInUserId,
          userB: visitedUser,
          status: "pending",
        },
      });
      console.log("FRIEND REQUEST: ", isFriendRequestPending);
      console.log("RAN");
      if (isFriendRequestPending) {
        return NextResponse.json(
          {
            status: isFriendRequestPending.status,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          status: "inactive",
        },
        { status: 200 }
      );
  }
}

export async function PUT(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const body = await req.json();
  console.log("LOGGED IN: ", id, body);

  try {
    const postedAction = await prisma.friends.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: body.action,
      },
    });
    console.log(
      "CHECK: ",
      postedAction.id,
      typeof postedAction.id,
      parseInt(id),
      typeof parseInt(id)
    );
    console.log("POSTED: ", postedAction);
    if (postedAction.id === parseInt(id)) {
      const updatedNotification = await prisma.notifications.update({
        where: {
          id: body.notificationId,
        },
        data: {
          status: body.action,
        },
      });

      console.log("NOTIFICATION UPDATE: ", updatedNotification);
      if (updatedNotification.id !== body.notificationId) {
        console.log("PASSED");
        return NextResponse.json(
          {
            message: "An issue happen while update notifications.",
          },
          { status: 400 }
        );
      }
      console.log("RAN");
      return NextResponse.json(
        {
          postedAction,
        },
        { status: 200 }
      );
    }
    console.log("RAN NOT FOUND");
    return NextResponse.json(
      {
        message: "We couldn't find the friend request you were looking for.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.log("RAN OTHER ERROR", error);
    return NextResponse.json(
      {
        error,
        message:
          "😢 An issue occurred. We're working hard to fix it please try again later.",
      },
      { status: 500 }
    );
  }
}
