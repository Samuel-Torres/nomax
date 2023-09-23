import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Users, personaTypes } from "@prisma/client";
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
  console.log("RAN")
  function containsOnlyDigits(inputStr: string): boolean {
    const isNumber: boolean =  /^\d+$/.test(inputStr);
    console.log("IS NUMBER: ", isNumber)
    return isNumber
   
}
  const { emailOrId } = await params;  
  console.log("EMAIL OR ID: ", emailOrId)
  let fetchedUser;

  try {
      if(!containsOnlyDigits(emailOrId)) {
        fetchedUser = await prisma.users.findUnique({
          where: {
            email: emailOrId,
          },
        });
        if (typeof fetchedUser === "object") {
          return NextResponse.json({fetchedUser}, {status: 200});
        } else {
          return NextResponse.json({ message: new Error("User not Found") }, {status: 404});
        }
      }

      fetchedUser = await prisma.users.findUnique({
        where: {
          id: parseInt(emailOrId),
        },
      });

      console.log("FETCHED USER: ", fetchedUser)
        
    if (typeof fetchedUser === "object") {
      return NextResponse.json({fetchedUser}, {status: 200});
    } else {
      return NextResponse.json({ message: new Error("User not Found") }, {status: 404});
    }
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) }, {status: 500});
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
    return NextResponse.json({ status: 200, ...updatedUser });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
