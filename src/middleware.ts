import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./Service/Auth/auth.service";

const AuthRoutes = ["/login", "/register"];
const roleBaseRoute = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

type TRole = keyof typeof roleBaseRoute;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  if (!user?.data) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  if (user?.data?.role && roleBaseRoute[user?.data?.role as TRole]) {
    const routes = roleBaseRoute[user?.data?.role as TRole];
    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/user/:page*",
    "/admin/:page*",
    "/login",
    "/register",
  ],
};
