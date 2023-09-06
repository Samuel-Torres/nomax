import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { corsMiddleware } from "../../middleware";

const prisma = new PrismaClient();

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
