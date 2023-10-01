import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { id } = params;
  try {
    const fetchedPhotos = await prisma.photos.findMany({
      where: {
        userId: parseInt(id),
      },
    });
    console.log("FETCHED: ", fetchedPhotos);
    if (fetchedPhotos) {
      return NextResponse.json({ fetchedPhotos }, { status: 200 });
    }
    return NextResponse.json(
      { message: "Users photos not found" },
      { status: 404 }
    );
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      { message: `An error occurred on our end. Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Record<string, any>
) {
  const { id } = params;
  const photoId: number = parseInt(id);

  try {
    const deletedPhoto = await prisma.photos.delete({
      where: {
        id: photoId,
      },
    });
    if (deletedPhoto.id === photoId) {
      return NextResponse.json({ deletedPhoto }, { status: 200 });
    }
    return NextResponse.json(
      { message: "Users photos not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred on our end. Error: ${error}` },
      { status: 500 }
    );
  }
}
