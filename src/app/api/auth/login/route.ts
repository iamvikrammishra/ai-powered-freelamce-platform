import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real application, you would validate credentials against your database
    // This is a simplified example for demonstration purposes

    // Mock validation - in production, use proper authentication
    if (email && password) {
      // Success response with mock user data and token
      return NextResponse.json({
        success: true,
        user: {
          id: "user_123456",
          email,
          name: "Demo User",
          role: email.includes("admin") ? "admin" : "freelancer",
        },
        token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
      })
    } else {
      // Invalid credentials
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
