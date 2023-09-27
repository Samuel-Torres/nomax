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

  console.log("LOG: ", LOGGED_IN_USER_ID);

  switch (FETCH_TYPE) {
    case "IS_PENDING":
      console.log("RAN");
      try {
        console.log("RAN");
        if (!loggedInUserId) {
          console.log("RAN");
          return NextResponse.json(
            {
              message:
                "An Issue occurred on our end. Our development team is working urgently to resolve this issue. Error: loggedId should not be null.",
            },
            { status: 400 }
          );
        }
        console.log("RAN");
        return NextResponse.json(
          {
            message:
              "An Issue occurred on our end. Our development team is working urgently to resolve this issue. Error: loggedId should not be null.",
          },
          { status: 200 }
        );
        // const isRequestPending;
      } catch (error) {}
  }
}
