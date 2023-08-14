import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("BODY IN SERVER: ", body);
}
