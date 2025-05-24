"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  title: z.string().min(2, {
    message: "Professional title must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  hourlyRate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Hourly rate must be a number.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  experience: z.string(),
  language: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    fullName: "Rahul Patel",
    email: "rahul.patel@example.com",
    title: "Full Stack Developer",
    bio: "Experienced full-stack developer with expertise in React, Node.js, and MongoDB. I specialize in building responsive web applications with modern JavaScript frameworks.",
    hourlyRate: "1500",
    location: "Bangalore, India",
    experience: "intermediate",
    language: "english",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      console.log(data)
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a professional photo to make your profile stand out.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src="/placeholder.svg?key=92yt3" alt="Profile" />
            <AvatarFallback className="text-2xl">RP</AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="picture">Upload a new picture</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="text-sm text-muted-foreground">
              Recommended: Square image, at least 400x400 pixels, less than 5MB.
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal and professional details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Full Stack Developer" {...field} />
                    </FormControl>
                    <FormDescription>This will be displayed at the top of your profile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell clients about yourself, your experience, and your work style."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate (₹)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1500" {...field} />
                      </FormControl>
                      <FormDescription>The amount you charge per hour in Indian Rupees.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mumbai, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
