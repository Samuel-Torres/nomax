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
    include: {
      author: true,
    },
  });
  console.log("COMMENTS : ", comments);

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
