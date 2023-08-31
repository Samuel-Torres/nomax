import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log("MIDDLEWARE RAN")
  if (req.nextUrl.pathname.startsWith('/api/posts')) {
    const response = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });

    response.headers.set('Access-Control-Allow-Origin', 'https://nomax.vercel.app');
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }

}

export const config = {
  matcher: ['/api/posts'],
}