import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

//  Edit Post:
export async function PUT(req: NextRequest, res: NextResponse) {
  const payload = await req.json();

  try {
    const editedPostDbResponse = await prisma.posts.update({
      where: {
        id: payload?.id,
      },
      data: {
        postBody: payload.postBody,
      },
    });

    if (typeof editedPostDbResponse === "object") {
      return NextResponse.json({ data: editedPostDbResponse }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  try {
    const createdPost = await prisma.posts.create({
      data: {
        postBody: payload.postBody,
        imageSrc: payload.imageSrc,
        author: {
          connect: { id: payload.authorId },
        },
      },
      include: {
        author: true,
      },
    });
    if (typeof createdPost === "object") {
      return NextResponse.json({ dataResponse: createdPost }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
