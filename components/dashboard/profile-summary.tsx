"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Edit, Star, MapPin, CheckCircle2 } from "lucide-react"

interface ProfileSummaryProps {
  profile: any
  userType: 'freelancer' | 'employer'
}

export function ProfileSummary({ profile, userType }: ProfileSummaryProps) {
  if (!profile) return null
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const requiredFields = ['full_name', 'display_name', 'bio', 'location']
    const freelancerFields = ['skills', 'hourly_rate', 'experience_level']
    const employerFields = ['company_name', 'company_website', 'industry']
    
    const fieldsToCheck = [...requiredFields, ...(userType === 'freelancer' ? freelancerFields : employerFields)]
    const filledFields = fieldsToCheck.filter(field => !!profile[field])
    
    return Math.round((filledFields.length / fieldsToCheck.length) * 100)
  }
  
  const profileCompletion = calculateProfileCompletion()
  const displayName = profile.display_name || profile.full_name || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
  
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              <AvatarImage src={profile.avatar_url} alt={displayName} />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 text-center md:text-left">
              <h2 className="text-2xl font-bold">{displayName}</h2>
              {userType === 'freelancer' ? (
                <div className="text-muted-foreground">
                  {profile.primary_skill && <p className="font-medium">{profile.primary_skill}</p>}
                  {profile.experience_level && (
                    <p className="text-sm capitalize">{profile.experience_level} Level</p>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  {profile.company_name && <p className="font-medium">{profile.company_name}</p>}
                  {profile.industry && <p className="text-sm">{profile.industry}</p>}
                </div>
              )}
              {profile.location && (
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {profile.location}
                </div>
              )}
            </div>
          </div>
          
          {/* Profile details and actions */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {userType === 'freelancer' ? (
                <div className="flex flex-wrap gap-3 mt-2">
                  {profile.hourly_rate && (
                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                      ₹{profile.hourly_rate}/hr
                    </div>
                  )}
                  {profile.rating && (
                    <div className="flex items-center bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full px-3 py-1 text-sm font-medium">
                      <Star className="h-3.5 w-3.5 mr-1 fill-current" />
                      {profile.rating}
                    </div>
                  )}
                  {profile.availability && (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full px-3 py-1 text-sm font-medium capitalize">
                      {profile.availability}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 mt-2">
                  {profile.jobs_posted > 0 && (
                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                      {profile.jobs_posted} Jobs Posted
                    </div>
                  )}
                  {profile.company_size && (
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full px-3 py-1 text-sm font-medium capitalize">
                      {profile.company_size} Company
                    </div>
                  )}
                </div>
              )}
              
              {/* Bio preview */}
              {profile.bio ? (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-3">{profile.bio}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic mt-3">
                  No bio available. Add a professional bio to your profile.
                </p>
              )}
            </div>
            
            {/* Profile completion and actions */}
            <div className="mt-4 md:mt-auto">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Profile Completion</span>
                <span className="text-xs font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-1.5" />
              
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/profile">
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Edit Profile
                  </Link>
                </Button>
                {userType === 'freelancer' ? (
                  <Button asChild size="sm">
                    <Link href="/dashboard/find-jobs">Find Jobs</Link>
                  </Button>
                ) : (
                  <Button asChild size="sm">
                    <Link href="/dashboard/post-job">Post a Job</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
