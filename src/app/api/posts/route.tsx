import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all posts:
export async function GET(req: NextRequest) {
  //   console.log("RAN IN SERVER");
  try {
    const allPosts = await prisma.posts.findMany();
    // console.log("IN SERVER: ", JSON.stringify(allPosts));
    return NextResponse.json([...allPosts], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}

//  Edit Post:
export async function PUT(req: NextRequest) {
  const payload = await req.json();
  console.log("REQUEST: ", payload);

  try {
    const editedPostDbResponse = prisma.posts
      .update({
        where: {
          id: payload?.id,
        },
        data: {
          postBody: payload.postBody,
        },
      })
      .then((dbRes) => console.log("DB RES: ", dbRes));

    console.log("CONS DB RES: ", editedPostDbResponse);
  } catch (error) {}
}
