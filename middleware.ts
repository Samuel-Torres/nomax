import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function corsMiddleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "https://nomax.vercel.app",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Add other allowed headers
      },
    });
  }

  return null;
}