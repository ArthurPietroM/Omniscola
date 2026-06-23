// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROTAS_PUBLICAS = ['/', '/cadastro'];
const COOKIE_NAME = 'omniscola_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isRotaPublica = ROTAS_PUBLICAS.includes(pathname);

  if (!token && !isRotaPublica) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isRotaPublica) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};