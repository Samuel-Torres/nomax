import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const updatedUserData = await request.json();
  const { email } = updatedUserData;
  console.log("INCOMING: ", updatedUserData, email);
  try {
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: updatedUserData,
    });

    console.log("ATTEMPT: ", updatedUser);
    return NextResponse.json({ status: 200, ...updatedUser });
  } catch (error) {
    console.log("CATCH RAN: ", error);
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
