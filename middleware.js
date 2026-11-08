import { NextResponse } from 'next/server';

/**
 * Middleware for Next.js
 * 
 * This file exists to ensure Next.js generates required manifest files
 * (middleware-manifest.json, routes-manifest.json) in dev mode.
 * 
 * You can add route protection or other middleware logic here if needed.
 */
export function middleware(request) {
  const response = NextResponse.next();
  // Prevent proxies (nginx) from caching HTML that references deleted build chunks.
  // Stale cached HTML + new build = /_next/static/... 404s for some users after deploy.
  if (!request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  }
  return response;
}

// Optional: Configure which routes the middleware runs on
// If not specified, middleware runs on all routes
// export const config = {
//   matcher: ['/dashboard/:path*', '/api/:path*']
// }


