import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { page } = params;
  const itemsPerPage = 10;

  try {
    const skip = (page - 1) * itemsPerPage; // Calculate the number of posts to skip
    const take = itemsPerPage; // Number of posts to take

    const allPosts = await prisma.posts.findMany({
      skip,
      take,
      orderBy: {
        createdAT: "desc",
      },
    });

    const totalCount = await prisma.posts.count(); // Get the total number of posts

    const hasMore = skip + take < totalCount; // Check if there are more pages

    if (allPosts) {
      console.log("BEFORE RESP: ", allPosts);
      return NextResponse.json(
        { hasMore: hasMore, allPosts: [...allPosts] },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.log("ERROR RAN: ", error);
    return NextResponse.json(
      { error: "An issue happened on our end. Please come back later." },
      { status: 500 }
    );
  }
}
