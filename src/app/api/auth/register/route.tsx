import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY IN SERVER: ", body);
    const hashedPassword: string = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });
    console.log("NEW USER CREATION ATTEMPT: ", newUser);
    return NextResponse.json({ status: 200, user: newUser });
  } catch (error: unknown) {
    console.log("500 error: ", error);
    return NextResponse.json(
      { error: `Internal Server Error, ${error}` },
      { status: 500 }
    );
  }
}
