import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function PUT(request: NextRequest) {
  const updatedUserData = await request.json();
  const { email } = updatedUserData;
  try {
    let photo;
    updatedUserData?.profilePicture?.length > 0
      ? (photo = await prisma.photos.create({
          data: {
            imageSrc: updatedUserData?.profilePicture,
            user: {
              connect: {
                email: updatedUserData?.email,
              },
            },
          },
        }))
      : null;
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: updatedUserData,
    });

    if (updatedUser.email === email) {
      return NextResponse.json({ ...updatedUser }, { status: 200 });
    }

    return NextResponse.json({ message: "User not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "an issue occurred.", error },
      { status: 500 }
    );
  }
}
