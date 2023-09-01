import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import setCommonCorsHeaders from './setCommonCorsHeaders';


export async function middleware(req: NextRequest) {
    console.log("MIDDLEWARE RAN")
  if (req.nextUrl.pathname.startsWith('/api/posts')) {
    const response = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });
    const origin = await req.headers.get("host");
    // response.headers.set('Access-Control-Allow-Origin', 'https://nomax.vercel.app, https://nomax-git-testing-onboardingform-rilladubz.vercel.app');
    // response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    setCommonCorsHeaders(origin)
    
    return response;
  }

}

export const config = {
  matcher: ['/api/posts'],
}