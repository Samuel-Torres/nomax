import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // console.log("RAN");
  const { loggedInUserId, postBody, postId } = await req.json();

  const comment = await prisma.comments.create({
    data: {
      authorId: loggedInUserId,
      postId: postId,
      comment: postBody,
    },
  });
  console.log("DELETED: ", comment);
  try {
    if (typeof comment === "object") {
      console.log("RETURNED: ", { data: comment });
      return NextResponse.json({ data: comment }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
