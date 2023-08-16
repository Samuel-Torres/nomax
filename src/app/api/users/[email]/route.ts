import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, personaTypes } from "@prisma/client";
import { convertPersona } from "@/utils/convertPersona";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

type user = {
  id: number;
  email: string;
  password: string;
  created_At: Date;
  bio: string;
  persona?: personaTypes | null;
  jobTitle: string;
  companyName: string;
  userName: string;
  newUser: boolean;
};

export async function GET(req: NextRequest, { params }: Record<string, any>) {
  const { email } = params;
  try {
    const fetchedUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (fetchedUser) return NextResponse.json(fetchedUser);
    return NextResponse.json({ message: new Error("User not Found") });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: Record<string, any>
) {
  const { email } = params;
  const updatedUserData: user = await request.json();
  const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
  try {
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
        bio: updatedUserData.bio,
        persona: convertPersona(updatedUserData.persona),
        jobTitle: updatedUserData.jobTitle,
        companyName: updatedUserData.companyName,
        userName: updatedUserData.userName,
        newUser: false,
      },
    });
    return NextResponse.json({ status: 200, ...updatedUser });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
