import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { corsMiddleware } from "../../middleware";

const prisma = new PrismaClient();

// Get all posts:
export async function GET(req: NextRequest) {
  console.log("RAN");
  try {
    const allPosts = await prisma.posts.findMany();
    console.log("ALL POSTS: ", allPosts);
    if (allPosts) {
      return NextResponse.json([...allPosts], { status: 200 });
    } else {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.log("ERROR RAN: ", error);
    // return NextResponse.json({ status: 500, message: `${error}` });
    return NextResponse.json(
      { error: "An issue happened on our end please come back later" },
      { status: 500 }
    );
  }
}

//  Edit Post:
export async function PUT(req: NextRequest, res: NextResponse) {
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
