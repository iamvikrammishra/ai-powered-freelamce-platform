import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "./lib/auth"

// Add paths that should be accessible without authentication
const publicPaths = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/api/auth/login",
  "/api/auth/register",
  "/find-work",
  "/find-talent",
  "/how-it-works",
  "/pricing",
]

// Check if the path should be accessible without authentication
function isPublicPath(path: string) {
  return publicPaths.some((publicPath) => {
    if (publicPath.endsWith("*")) {
      return path.startsWith(publicPath.slice(0, -1))
    }
    return path === publicPath
  })
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }
  
  // TEMPORARY: For development purposes - bypass authentication
  // Remove this in production
  if (pathname.startsWith("/dashboard")) {
    console.log("DEVELOPMENT MODE: Bypassing authentication for dashboard")
    return NextResponse.next()
  }

  // Check for auth token in cookies
  const token = request.cookies.get("auth_token")?.value

  // If no token, redirect to login
  if (!token) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const session = await verifySession(token)

    if (!session) {
      throw new Error("Invalid session")
    }

    // Check role-based access
    if (pathname.startsWith("/admin") && session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
