"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

const mentorFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(50, {
      message: "Bio must be at least 50 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  expertise: z.array(z.string()).min(1, {
    message: "Select at least one area of expertise.",
  }),
  hourlyRate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Hourly rate must be a number.",
  }),
  availability: z.string().min(1, {
    message: "Please select your availability.",
  }),
  experience: z.string().min(1, {
    message: "Please select your experience level.",
  }),
  expectations: z.string().min(20, {
    message: "Please describe your expectations in at least 20 characters.",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

type MentorFormValues = z.infer<typeof mentorFormSchema>

export function BecomeMentor() {
  const [isLoading, setIsLoading] = useState(false)

  // Default values for the form
  const defaultValues: Partial<MentorFormValues> = {
    title: "",
    bio: "",
    expertise: [],
    hourlyRate: "",
    availability: "",
    experience: "",
    expectations: "",
    termsAccepted: false,
  }

  const form = useForm<MentorFormValues>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues,
  })

  function onSubmit(data: MentorFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Application submitted",
        description: "Your mentor application has been submitted for review.",
      })
      console.log(data)
    }, 1500)
  }

  const expertiseOptions = [
    { id: "web-dev", label: "Web Development" },
    { id: "mobile-dev", label: "Mobile Development" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "data-science", label: "Data Science" },
    { id: "devops", label: "DevOps" },
    { id: "cloud", label: "Cloud Computing" },
    { id: "content", label: "Content Writing" },
    { id: "marketing", label: "Digital Marketing" },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Become a Mentor</CardTitle>
          <CardDescription>
            Share your knowledge and experience with others while earning additional income.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Full Stack Developer" {...field} />
                    </FormControl>
                    <FormDescription>This will be displayed on your mentor profile.</FormDescription>
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
                        placeholder="Tell mentees about your professional background, expertise, and mentoring style."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expertise"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Areas of Expertise</FormLabel>
                      <FormDescription>Select the areas where you can provide mentorship.</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {expertiseOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="expertise"
                          render={({ field }) => {
                            return (
                              <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value?.filter((value) => value !== option.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{option.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
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
                        <Input placeholder="e.g. 2000" {...field} />
                      </FormControl>
                      <FormDescription>The amount you charge per hour in Indian Rupees.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 hours/week</SelectItem>
                          <SelectItem value="6-10">6-10 hours/week</SelectItem>
                          <SelectItem value="11-15">11-15 hours/week</SelectItem>
                          <SelectItem value="16+">16+ hours/week</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Professional Experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-7">4-7 years</SelectItem>
                        <SelectItem value="8-12">8-12 years</SelectItem>
                        <SelectItem value="13+">13+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentorship Expectations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what mentees can expect from your sessions and your mentoring approach."
                        className="min-h-24 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the mentor program terms and conditions</FormLabel>
                      <FormDescription>You must agree to our terms and conditions to become a mentor.</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Submitting application..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
