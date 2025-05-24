"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/common/mode-toggle"
import { Menu, X, Search, UserCircle, LogIn, LogOut, ShieldCheck } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Check authentication status on page load
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (data && data.session) {
        setIsLoggedIn(true)
        // Get user role from metadata
        const { data: userData } = await supabase.auth.getUser()
        if (userData && userData.user) {
          setUserRole(userData.user.user_metadata?.role as string || null)
        }
      } else {
        setIsLoggedIn(false)
        setUserRole(null)
      }
    }
    
    checkAuth()
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true)
        setUserRole(session.user.user_metadata?.role as string || null)
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false)
        setUserRole(null)
      }
    })
    
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl xs:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
              GigIndia
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/find-work"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/find-work") ? "text-primary" : "text-muted-foreground"}`}
          >
            Find Work
          </Link>
          <Link
            href="/find-talent"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/find-talent") ? "text-primary" : "text-muted-foreground"}`}
          >
            Find Talent
          </Link>
          <Link
            href="/how-it-works"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/how-it-works") ? "text-primary" : "text-muted-foreground"}`}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-muted-foreground"}`}
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ModeToggle />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="Account menu">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">My Account</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userRole === 'freelancer' ? 'Freelancer' : userRole === 'employer' ? 'Employer' : 'User'}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                
                {userRole === 'freelancer' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/find-jobs" className="w-full cursor-pointer">
                        Find Jobs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="w-full cursor-pointer">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {userRole === 'employer' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/employer/post-job" className="w-full cursor-pointer">
                        Post a Job
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/employer" className="w-full cursor-pointer">
                        Employer Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {userRole === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="w-full cursor-pointer flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer flex items-center text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2 xs:gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 xs:h-9 xs:w-9 rounded-full">
            <Search className="h-4 w-4 xs:h-5 xs:w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="h-8 w-8 xs:h-9 xs:w-9 rounded-full"
          >
            {isMenuOpen ? <X className="h-4 w-4 xs:h-5 xs:w-5" /> : <Menu className="h-4 w-4 xs:h-5 xs:w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top duration-300">
          <div className="container py-3 sm:py-4 grid gap-3 sm:gap-4">
            <Link
              href="/find-work"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/find-work") ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Work
            </Link>
            <Link
              href="/find-talent"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/find-talent") ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Talent
            </Link>
            <Link
              href="/how-it-works"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/how-it-works") ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                
                {userRole === 'admin' && (
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
