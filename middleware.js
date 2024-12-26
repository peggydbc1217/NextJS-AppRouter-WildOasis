// import { NextResponse } from "next/server";

// export function middleware(request) {
//     return NextResponse.redirect(new URL('/about', request.url));
// }


// export const config = {
//     matcher: ['/cabins/:path*', '/about', '/account'],
// }

export { default } from "next-auth/middleware"

export const config = { matcher: ["/cabins/:path(.*)", "/account/:path(.*)"] }



