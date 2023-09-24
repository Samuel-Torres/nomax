import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function POST(req: NextRequest) {
  const { loggedInUserId, postBody, postId } = await req.json();

  const comment = await prisma.comments.create({
    data: {
      authorId: loggedInUserId,
      postId: postId,
      comment: postBody,
    },
  });

  try {
    if (typeof comment === "object") {
      return NextResponse.json({ data: comment }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
