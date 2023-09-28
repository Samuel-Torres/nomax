import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const loggedInUserId = parseInt(id);
  console.log("Logged In User ID: ", loggedInUserId);

  try {
    const loggedInUserNotifications = await prisma.notifications.findMany({
      where: {
        receiverId: loggedInUserId,
        status: "pending",
      },
      include: {
        sender: true,
        friend: true,
      },
    });
    console.log("NOTIFICATION: ", loggedInUserNotifications);
    if (loggedInUserNotifications.length > 0) {
      console.log("THIS RAN");
      return NextResponse.json(
        {
          loggedInUserNotifications,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        loggedInUserNotifications: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR RAN");
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
