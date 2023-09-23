import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  if (
    req.headers.get("Page-Index") === null ||
    req.headers.get("Param-Type") === null
  ) {
    return NextResponse.json(
      { error: "Page-Index & Param-Type must be sent in headers" },
      { status: 400 }
    );
  }

  const paramType = req.headers.get("Param-Type");
  const index = req.headers.get("Page-Index");

  // console.log(index, paramType);
  const { pageIndexOrEmail } = params;
  console.log("PAGE NAME OR ID: ", pageIndexOrEmail);

  const itemsPerPage = 10;
  const take = itemsPerPage;
  try {
    if (paramType === "email" && index) {
      const pageIndex: number = parseInt(index);
      const skip = (pageIndex - 1) * itemsPerPage; // Calculate the number of posts to skip
      const allPosts = await prisma.posts.findMany({
        where: {
          author: {
            email: "fourth@gmail.com",
          },
        },
        skip,
        take,
        orderBy: {
          createdAT: "desc",
        },
        include: {
          author: true,
        },
      });
      const totalCount = await prisma.posts.count({
        where: {
          author: {
            email: pageIndexOrEmail,
          },
        },
      });
      const hasMore = skip + take < totalCount;
      if (allPosts) {
        console.log("RAN: ", allPosts);
        return NextResponse.json(
          { hasMore: hasMore, allPosts },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }
    }
    const skip = (pageIndexOrEmail - 1) * itemsPerPage;
    const allPosts = await prisma.posts.findMany({
      skip,
      take,
      orderBy: {
        createdAT: "desc",
      },
      include: {
        author: true,
      },
    });
    const totalCount = await prisma.posts.count(); // Get the total number of posts
    const hasMore = skip + take < totalCount; // Check if there are more pages
    if (allPosts) {
      return NextResponse.json({ hasMore: hasMore, allPosts }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: `An issue happened on our end. Please come back later.`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Record<string, any>
) {
  const { pageNameOrId } = params;

  try {
    const deletedPost = await prisma.posts.delete({
      where: {
        id: parseInt(pageNameOrId),
      },
    });
    if (typeof deletedPost === "object") {
      return NextResponse.json({ deletedPost: deletedPost }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "An issue happened on our end while deleting this post. Please come back later.",
      },
      { status: 500 }
    );
  }
}
