import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { corsMiddleware } from "../../middleware";

const prisma = new PrismaClient();

// Get all posts:
export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { page } = params;
  const itemsPerPage = 10;

  try {
    const take = page * itemsPerPage;

    const allPosts = await prisma.posts.findMany({
      skip: 0, // Always start from the beginning
      take, // Fetch up to the current page
      orderBy: {
        createdAT: "desc",
      },
    });

    const totalCount = await prisma.posts.count(); // Get the total number of posts

    const hasMore = take < totalCount; // Check if there are more pages

    console.log(
      "ALL POSTS: ",
      allPosts,
      " totalCount: ",
      totalCount,
      "HAS MORE?: ",
      hasMore
    );
    if (allPosts) {
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
      { error: "An issue happened on our end please come back later" },
      { status: 500 }
    );
  }
}
