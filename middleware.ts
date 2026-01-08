import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/w\/([^/]+)(?:\/.*)?$/);

  if (!match) {
    return NextResponse.next();
  }

  const wsSlug = match[1];
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = '/auth/signin';
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  const authUrl = new URL('/api/workspaces/authorize', request.nextUrl.origin);
  authUrl.searchParams.set('slug', wsSlug);

  // TODO: Expand this check with additional workspace-level policies in Task 3+.
  const authResponse = await fetch(authUrl, {
    headers: {
      cookie: request.headers.get('cookie') ?? ''
    }
  });

  if (authResponse.status === 403 || authResponse.status === 404) {
    const forbiddenUrl = request.nextUrl.clone();
    forbiddenUrl.pathname = '/403';
    return NextResponse.rewrite(forbiddenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/w/:path*']
};
