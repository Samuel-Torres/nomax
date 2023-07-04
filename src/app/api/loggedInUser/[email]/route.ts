import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum personaTypes {
  PASSPORTBRO,
  DIGITALNOMAD,
  EXPAT,
  TOURIST,
  BACKPACKER,
}

type user = {
  id: number;
  email: string;
  password: string;
  created_At: Date;
  bio: string;
  persona: personaTypes | null;
  jobTitle: string;
  companyName: string;
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
    return NextResponse.json({ message: new Error("User not Found"), error });
  }
}
