import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { corsMiddleware } from "../../middleware";

const prisma = new PrismaClient();

// // Apply the CORS middleware to the route
// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };

// Get all posts:
export async function GET(req: NextRequest) {
  try {
    const allPosts = await prisma.posts.findMany();
    return NextResponse.json([...allPosts], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
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
