import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/lectura', '/perfil', '/dashboard'];

// Rutas públicas
const publicRoutes = ['/auth/signin', '/auth/error', '/auth/register'];

// Tipos para el middleware
type AuthRequest = {
  auth: any;
  nextUrl: URL;
};

export default auth((req: AuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req?.auth;
  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );
  const isProtectedRoute = protectedRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Permitir acceso a rutas de autenticación si no está autenticado
  if (isPublicRoute) {
    if (isLoggedIn) {
      const redirectUrl = new URL('/', nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Redirigir a login si la ruta es protegida y no está autenticado
  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL(
      `/auth/signin?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`,
      nextUrl.origin
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Permitir el acceso a la ruta
  return NextResponse.next();
});

// Configuración del middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
