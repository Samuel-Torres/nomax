import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const postId = parseInt(id);

  const comments = await prisma.comments.findMany({
    where: {
      postId: postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  try {
    if (typeof comments === "object") {
      return NextResponse.json({ data: [...comments] }, { status: 200 });
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

export async function PUT(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  const commentId = parseInt(id);
  const body = await req.json();
  const comment = await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      comment: body.postBody,
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
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Record<string, any>
) {
  console.log("RAN");
  const { id } = params;

  const comment = await prisma.comments.delete({
    where: {
      id: parseInt(id),
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
