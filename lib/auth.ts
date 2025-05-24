import { jwtVerify, SignJWT } from "jose"

// In a real application, this would be a secure environment variable
const JWT_SECRET = new TextEncoder().encode("your-secret-key-here")

export type UserSession = {
  id: string
  email: string
  name: string
  role: string
}

export async function createSession(user: UserSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifySession(token: string): Promise<UserSession | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as unknown as UserSession
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function saveSessionToLocalStorage(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

export function getSessionFromLocalStorage(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export function removeSessionFromLocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}
