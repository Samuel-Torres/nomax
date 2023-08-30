import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all posts:
export async function GET(req: NextRequest) {
  //   console.log("RAN IN SERVER");
  try {
    const allPosts = await prisma.posts.findMany();
    // console.log("IN SERVER: ", JSON.stringify(allPosts));
    return NextResponse.json([...allPosts], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: new Error(`${error}`) });
  }
}
