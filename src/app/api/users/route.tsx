import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getSession({ req });
  const email: string = req.email;
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {}
};
