import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const FETCH_BY_TYPE: string | null = req.headers.get("FETCH-BY-TYPE");
  const PROFILE_ID: string | null = req.headers.get("PROFILE-ID");
  if (!FETCH_BY_TYPE || !PROFILE_ID) {
    return NextResponse.json(
      {
        error:
          "Both fetchByType & profileId must be passed in as headers to complete this request",
      },
      { status: 400 }
    );
  }

  const { indexIdOrEmail } = params;

  const itemsPerPage = 10;
  const take = itemsPerPage;
  try {
    if (FETCH_BY_TYPE !== "index") {
      const skip = (indexIdOrEmail - 1) * itemsPerPage;
      const allPosts = await prisma.posts.findMany({
        where: {
          authorId: parseInt(PROFILE_ID),
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
          authorId: parseInt(PROFILE_ID),
        },
      });
      const hasMore = skip + take < totalCount;
      if (allPosts) {
        return NextResponse.json(
          { hasMore: hasMore, allPosts },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }
    }
    if (FETCH_BY_TYPE !== "index") {
      const skip = (indexIdOrEmail - 1) * itemsPerPage;
      const allPosts = await prisma.posts.findMany({
        where: {
          authorId: parseInt(PROFILE_ID),
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
          authorId: parseInt(PROFILE_ID),
        },
      });
      const hasMore = skip + take < totalCount;
      if (allPosts) {
        return NextResponse.json(
          { hasMore: hasMore, allPosts },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }
    }

    const skip = (indexIdOrEmail - 1) * itemsPerPage;
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
  const { indexIdOrEmail } = params;
  const id = parseInt(indexIdOrEmail);

  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete associated comments
    for (const comment of post.comments) {
      await prisma.comments.delete({
        where: {
          id: comment.id,
        },
      });
    }

    // Delete the post
    const deletedPost = await prisma.posts.delete({
      where: {
        id: id,
      },
      include: {
        comments: true,
      },
    });

    console.log("Attempted: ", deletedPost);
    if (typeof deletedPost === "object") {
      return NextResponse.json({ deletedPost: deletedPost }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: `An issue happened on our end while deleting this post. Please come back later. Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
