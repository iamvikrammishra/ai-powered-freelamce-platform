"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase/client"
import { createUserProfile } from "@/app/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState<"freelancer" | "employer">("freelancer")

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [company, setCompany] = useState("")
  const [companySize, setCompanySize] = useState("small")
  const [primarySkill, setPrimarySkill] = useState("development")

  useEffect(() => {
    // Set account type based on URL parameter
    const type = searchParams.get("type")
    if (type === "employer") {
      setAccountType("employer")
    } else if (type === "freelancer") {
      setAccountType("freelancer")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: accountType,
          },
        },
      })

      if (authError) throw authError

      // Create profile in database based on account type using server action
      if (authData.user) {
        const userId = authData.user.id

        let profileData;
        if (accountType === 'freelancer') {
          profileData = {
            full_name: name,
            display_name: name,
            primary_skill: primarySkill,
            skills: [primarySkill],
            jobs_completed: 0,
            total_earnings: 0,
          };
        } else {
          profileData = {
            full_name: name,
            display_name: name,
            company_name: company,
            company_size: companySize,
            jobs_posted: 0,
          };
        }

        // Call server action to create profile (bypasses RLS)
        console.log(`Calling createUserProfile for ${accountType}`);
        const result = await createUserProfile(userId, profileData, accountType);
        console.log('Server action result:', result);
        
        if (!result.success) {
          // If server action fails, throw a detailed error
          const serverError = typeof result.error === 'string' 
            ? result.error 
            : JSON.stringify(result.error);
            
          console.error('Profile creation failed:', serverError);
          throw new Error(serverError || 'Failed to create user profile');
        }
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully. Please check your email for verification.",
      })

      // Redirect to login page
      router.push("/auth/login")
    } catch (error: any) {
      // Log the full error details with proper formatting
      console.error("Registration error:", error);
      
      // Extract meaningful error message
      let errorMessage = "An unexpected error occurred during registration.";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.error_description) {
        errorMessage = error.error_description;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
      
      // Handle specific error cases
      if (errorMessage.includes("foreign key constraint") && errorMessage.includes("employer_profiles")) {
        errorMessage = "Error creating employer profile. Please try again in a few moments.";
      }
      
      console.log("Showing error to user:", errorMessage);
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              GigIndia
            </span>
          </Link>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={accountType}
            onValueChange={(value) => setAccountType(value as "freelancer" | "employer")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <TabsContent value="freelancer" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Primary Skills</Label>
                  <RadioGroup defaultValue="development" value={primarySkill} onValueChange={setPrimarySkill}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="development" id="development" />
                      <Label htmlFor="development">Development</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="design" id="design" />
                      <Label htmlFor="design">Design</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="marketing" id="marketing" />
                      <Label htmlFor="marketing">Marketing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="writing" id="writing" />
                      <Label htmlFor="writing">Writing</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="employer" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="Acme Inc." 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <RadioGroup defaultValue="small" value={companySize} onValueChange={setCompanySize}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">1-10 employees</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">11-50 employees</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">51+ employees</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
