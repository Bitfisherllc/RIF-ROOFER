import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Default config - will be overridden by API route if needed
const DEFAULT_CONFIG = { passwordProtected: false, password: 'letmein' };

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip password protection for:
  // - API routes
  // - Admin routes (they have their own auth)
  // - Static files
  // - Password verification route
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/password-verify') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Fetch config from API route (Edge Runtime compatible)
  let config = DEFAULT_CONFIG;
  try {
    const configUrl = new URL('/api/admin/config', request.url);
    const configResponse = await fetch(configUrl.toString(), {
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    });
    if (configResponse.ok) {
      config = await configResponse.json();
    }
  } catch (error) {
    // If config fetch fails, use default (password protection disabled)
    console.error('Error fetching config in middleware:', error);
  }

  // If password protection is disabled, allow access
  if (!config.passwordProtected) {
    return NextResponse.next();
  }

  // Check if password cookie is set
  const passwordCookie = request.cookies.get('site-password-verified');
  
  if (passwordCookie?.value === 'true') {
    return NextResponse.next();
  }

  // Redirect to password verification page
  const url = request.nextUrl.clone();
  url.pathname = '/password-verify';
  url.searchParams.set('redirect', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

