import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";

export async function PUT(request: NextRequest) {
  // console.log("REQ BODY: ", await request.body());
  // const requestBody = await request.formData;
  // const id = formData.get("id");

  const updatedUserData = await request.json();
  const { email } = updatedUserData;
  console.log("USER DATA: ", updatedUserData);
  try {
    console.log("RAN");
    let photo;
    updatedUserData?.profilePicture?.length > 0
      ? (photo = await prisma.photos.create({
          data: {
            imageSrc: updatedUserData?.profilePicture,
            user: {
              connect: {
                id: updatedUserData?.id,
              },
            },
          },
        }))
      : null;
    console.log("NEW PHOTO: ", photo);
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: updatedUserData,
    });

    return NextResponse.json({ status: 200, ...updatedUser });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
