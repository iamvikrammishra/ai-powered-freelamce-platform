import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { ConditionalNavbar } from "@/components/conditional-navbar"
import { AuthErrorHandler } from "@/components/auth/auth-error-handler"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GigIndia - AI-Powered Freelancing Platform",
  description: "Connect with top freelancers and find projects using AI-powered matching",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Auth error handler to manage auth state globally */}
          <AuthErrorHandler />
          <ConditionalNavbar>
            {children}
          </ConditionalNavbar>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
