import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { corsMiddleware } from "../../middleware";

const prisma = new PrismaClient();

//  Edit Post:
export async function PUT(req: NextRequest, res: NextResponse) {
  const payload = await req.json();
  console.log("REQUEST: ", payload);

  try {
    const editedPostDbResponse = await prisma.posts.update({
      where: {
        id: payload?.id,
      },
      data: {
        postBody: payload.postBody,
      },
    });

    console.log("CONS DB RES: ", editedPostDbResponse);
    if (typeof editedPostDbResponse === "object") {
      return NextResponse.json({ data: editedPostDbResponse }, { status: 200 });
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

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("PAYLOAD: ", payload);
  try {
    const createdPost = await prisma.posts.create({
      data: {
        postBody: payload.postBody,
        authorId: payload.authorId,
        authorUserName: payload.authorUserName,
        authorPersona: payload.authorPersona,
        authorJobTitle: payload.authorJobTitle,
        authorCompany: payload.authorCompany,
        imageSrc: payload.imageSrc,
      },
    });

    console.log("NEW POST RES: ", typeof createdPost, createdPost);
    if (typeof createdPost === "object") {
      return NextResponse.json({ dataResponse: createdPost }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("ERROR IN SERVER: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
