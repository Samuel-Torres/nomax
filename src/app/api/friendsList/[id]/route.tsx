import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  console.log("RAN");
  const { id } = params;
  const visitedUserId: number = parseInt(id);
  console.log("NEW: ", typeof visitedUserId, visitedUserId);

  try {
    console.log("RAN");
    const fetchedFriends = await prisma.friends.findMany({
      where: {
        userB: visitedUserId,
        status: "accepted",
      },
      include: {
        userARef: true,
      },
    });
    console.log("RAN");
    console.log("LOGGED IN USERS FRIENDS: ", fetchedFriends);
    console.log("RAN");

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
