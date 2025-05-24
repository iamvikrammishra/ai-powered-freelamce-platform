"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AvatarUpload } from "@/components/avatar-upload"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import { Check, X, Plus, Trash, Upload, Edit3, Star, Briefcase, GraduationCap, Award, Clock } from "lucide-react"

export default function ProfilePage() {
  // User state
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<'freelancer' | 'employer'>('freelancer')
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const router = useRouter()
  
  // Form states
  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    title: '',
    bio: '',
    hourlyRate: '',
    location: '',
    phone: '',
    website: '',
    avatarUrl: ''
  })
  
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  
  const [education, setEducation] = useState<any[]>([])
  const [experiences, setExperiences] = useState<any[]>([])
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          // Not logged in, redirect to login
          router.push('/auth/login')
          return
        }
        
        setUser(user)
        
        // Determine user type from metadata
        const userRole = user.user_metadata?.role || 'freelancer'
        setUserType(userRole as 'freelancer' | 'employer')
        
        // Fetch profile data
        const table = userRole === 'employer' ? 'employer_profiles' : 'freelancer_profiles'
        const { data: profileData, error: profileError } = await supabase
          .from(table)
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError
        }
        
        if (profileData) {
          setProfile(profileData)
          
          // Populate form data from profile
          setBasicInfo({
            fullName: profileData.full_name || user.user_metadata?.full_name || '',
            title: profileData.title || '',
            bio: profileData.bio || '',
            hourlyRate: profileData.hourly_rate?.toString() || '',
            location: profileData.location || '',
            phone: profileData.phone || user.phone || '',
            website: profileData.website || '',
            avatarUrl: profileData.avatar_url || ''
          })
          
          if (profileData.skills) {
            setSkills(typeof profileData.skills === 'string' 
              ? JSON.parse(profileData.skills) 
              : profileData.skills || [])
          }
          
          if (profileData.education) {
            setEducation(typeof profileData.education === 'string'
              ? JSON.parse(profileData.education)
              : profileData.education || [])
          }
          
          if (profileData.experience) {
            setExperiences(typeof profileData.experience === 'string'
              ? JSON.parse(profileData.experience)
              : profileData.experience || [])
          }
          
          // Calculate completion percentage
          calculateCompletionPercentage(profileData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error loading profile",
          description: "There was a problem loading your profile data. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [router])
  
  // Calculate profile completion percentage
  const calculateCompletionPercentage = (profileData: any) => {
    let completed = 0
    let total = 0
    
    // Basic info checks
    const basicInfoFields = ['full_name', 'title', 'bio', 'location', 'phone']
    basicInfoFields.forEach(field => {
      total++
      if (profileData[field]) completed++
    })
    
    // Skills check
    total++
    if (profileData.skills && 
        ((typeof profileData.skills === 'string' && JSON.parse(profileData.skills).length > 0) ||
         (Array.isArray(profileData.skills) && profileData.skills.length > 0))) {
      completed++
    }
    
    // Education check
    total++
    if (profileData.education && 
        ((typeof profileData.education === 'string' && JSON.parse(profileData.education).length > 0) ||
         (Array.isArray(profileData.education) && profileData.education.length > 0))) {
      completed++
    }
    
    // Experience check
    total++
    if (profileData.experience && 
        ((typeof profileData.experience === 'string' && JSON.parse(profileData.experience).length > 0) ||
         (Array.isArray(profileData.experience) && profileData.experience.length > 0))) {
      completed++
    }
    
    // Avatar check
    total++
    if (profileData.avatar_url) completed++
    
    setCompletionPercentage(Math.round((completed / total) * 100))
  }
  
  // Handle save profile
  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      
      const table = userType === 'employer' ? 'employer_profiles' : 'freelancer_profiles'
      
      const profileData = {
        user_id: user.id,
        full_name: basicInfo.fullName,
        title: basicInfo.title,
        bio: basicInfo.bio,
        hourly_rate: basicInfo.hourlyRate ? parseFloat(basicInfo.hourlyRate) : null,
        location: basicInfo.location,
        phone: basicInfo.phone,
        website: basicInfo.website,
        avatar_url: basicInfo.avatarUrl,
        skills: JSON.stringify(skills),
        education: JSON.stringify(education),
        experience: JSON.stringify(experiences),
        updated_at: new Date().toISOString()
      }
      
      let response
      
      if (profile) {
        // Update existing profile
        response = await supabase
          .from(table)
          .update(profileData)
          .eq('user_id', user.id)
      } else {
        // Create new profile
        response = await supabase
          .from(table)
          .insert([{ ...profileData, created_at: new Date().toISOString() }])
      }
      
      if (response.error) throw response.error
      
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully."
      })
      
      // Update profile completion percentage
      calculateCompletionPercentage(profileData)
      
      // Update local state
      setProfile({ ...profile, ...profileData })
      
    } catch (error: any) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error saving profile",
        description: error.message || "There was a problem saving your profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }
  
  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }
  
  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }
  
  return (
    <>
      <DashboardHeader 
        heading="Complete Your Profile" 
        text="Add your professional information to help others find you and get more opportunities." 
      >
        <Button onClick={handleSaveProfile} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </DashboardHeader>
      
      {/* Profile Completion Progress */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>
            A complete profile helps you get more visibility and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {completionPercentage}% Complete
              </span>
              <span className="text-sm text-muted-foreground">
                {completionPercentage === 100 ? 
                  "All set! Your profile is complete." : 
                  "Keep going to complete your profile"}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
        </TabsList>
        
        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Tell us about yourself. This information will be visible on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl border border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
                <AvatarUpload 
                  userId={user?.id || 'temp'}
                  existingUrl={basicInfo.avatarUrl}
                  onAvatarChange={(url) => setBasicInfo({...basicInfo, avatarUrl: url})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={basicInfo.fullName}
                    onChange={(e) => setBasicInfo({...basicInfo, fullName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Senior Web Developer" 
                    value={basicInfo.title}
                    onChange={(e) => setBasicInfo({...basicInfo, title: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell clients about your background, experience, and why they should work with you."
                  rows={5}
                  value={basicInfo.bio}
                  onChange={(e) => setBasicInfo({...basicInfo, bio: e.target.value})}
                />
                <p className="text-sm text-muted-foreground">
                  {basicInfo.bio.length}/500 characters (minimum 100)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userType === 'freelancer' && (
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <Input 
                      id="hourlyRate" 
                      type="number" 
                      placeholder="25.00"
                      value={basicInfo.hourlyRate}
                      onChange={(e) => setBasicInfo({...basicInfo, hourlyRate: e.target.value})}
                    />
                    <p className="text-sm text-muted-foreground">
                      Setting a competitive rate helps you win more projects
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, Country" 
                    value={basicInfo.location}
                    onChange={(e) => setBasicInfo({...basicInfo, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 123-4567" 
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({...basicInfo, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input 
                    id="website" 
                    placeholder="https://yourportfolio.com" 
                    value={basicInfo.website}
                    onChange={(e) => setBasicInfo({...basicInfo, website: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                This information can be edited any time from your profile settings.
              </p>
              <Button onClick={handleSaveProfile} disabled={saving}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>
                Add skills that showcase your expertise. These will help clients find you in searches.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Add a skill (e.g. React, Copywriting, Logo Design)" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                </div>
                <Button 
                  variant="secondary" 
                  onClick={handleAddSkill}
                  disabled={!newSkill}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Your Skills ({skills.length}/20)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                        {skill}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 rounded-full hover:bg-destructive/20"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Add skills to increase your profile visibility.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Add at least 3-5 relevant skills to improve your profile strength.
              </p>
              <Button onClick={handleSaveProfile} disabled={saving}>Save Skills</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add your educational background to showcase your qualifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Education list will go here */}
              <p className="text-center text-muted-foreground py-10">
                Education section will be implemented soon.
              </p>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Adding your education helps establish credibility with potential clients.
              </p>
              <Button onClick={handleSaveProfile} disabled={saving}>Save Education</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>
                Add your professional experience to showcase your work history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Experience list will go here */}
              <p className="text-center text-muted-foreground py-10">
                Work experience section will be implemented soon.
              </p>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Showcase your relevant work history to attract more clients.
              </p>
              <Button onClick={handleSaveProfile} disabled={saving}>Save Experience</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
