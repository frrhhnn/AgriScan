import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || 
                       path === '/register' || 
                       path === '/forgot-password' || 
                       path === '/reset-password' ||
                       path === '/';
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value || '';
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in and tries to access public pages, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected pages, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ],
}; 