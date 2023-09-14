import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, personaTypes } from "@prisma/client";
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
      }
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
  let hashedPassword: string;
  let payload: {} = {};
  
  if(updatedUserData.password){
    hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
    payload = {...updatedUserData, password: hashedPassword, newUser: false}
  } else {
    payload = {...updatedUserData, newUser: false}
  }

  try {
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: payload
    });

    console.log("ATTEMPT: ", updatedUser)
    return NextResponse.json({ status: 200, ...updatedUser });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
