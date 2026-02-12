import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { Role } from './lib/types';
// import { DepartmentUserLinksUrls, ManagerLinksUrls, PurchaserLinksUrls, SupplierLinksUrls } from './lib/static';

type JWT = {
  "roleId": string,
}
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const currentPage = pathname.split("/")[1];
  console.log("the currentpage", currentPage)

  // console.log("the url from middleare", request.url.split("/")[4].split("?")[0]);
  const jwt = jwtDecode<JWT>(token as string);
  const tokenRole = +jwt['roleId']
  const isAdmin = tokenRole === Role.Admin

  if (!currentPage) {
    return NextResponse.next();
  }

  if (!isAdmin && currentPage === "admin") {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
  if (isAdmin && currentPage === "dash") {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
  // else if (token) {
  //   const jwt = jwtDecode<Jwt>(token);
  //   if (request.url.includes('dash') && +jwt.RoleId === Role.User) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }
  return NextResponse.next();

}

export const config = {
  matcher: ['/dash/:path*', "/dash", "/admin", "/admin/:path*"],
};


// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { cookies, headers } from 'next/headers';
// import { jwtDecode } from 'jwt-decode';
// import { Jwt, Role } from './lib/types';
