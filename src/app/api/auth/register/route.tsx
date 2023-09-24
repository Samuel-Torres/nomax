import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client/client";
const bcrypt = require("bcrypt");

// CREATE NEW USER:
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hashedPassword: string = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ status: 200, user: newUser });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
