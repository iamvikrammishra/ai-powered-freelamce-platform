"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { X, Plus, CheckCircle, Clock, Calendar, Info } from "lucide-react"

export function BecomeMentor() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [bio, setBio] = useState("")
  const [availability, setAvailability] = useState<string[]>([])
  
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill) && skills.length < 5) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }
  
  const handleToggleAvailability = (day: string) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day))
    } else {
      setAvailability([...availability, day])
    }
  }
  
  const weekdays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ]
  
  const expertiseOptions = [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", 
    "UI/UX Design", "Product Management", "DevOps", "Data Science",
    "Machine Learning", "Digital Marketing", "Content Strategy", 
    "Mobile Development", "Flutter", "React Native"
  ]
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Become a Mentor</CardTitle>
          <CardDescription>
            Share your expertise and help others grow while earning additional income
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 p-2 rounded-full">
                <Info className="h-4 w-4" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>As a mentor, you'll be able to:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Share your expertise with aspiring professionals</li>
                  <li>Build your professional network</li>
                  <li>Earn additional income at your own schedule</li>
                  <li>Strengthen your leadership and communication skills</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expertise">Your Areas of Expertise (Max 5)</Label>
                <div className="flex gap-2">
                  <Select value={newSkill} onValueChange={setNewSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {expertiseOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleAddSkill}
                    disabled={!newSkill || skills.length >= 5}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1.5 flex items-center gap-1">
                        {skill}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 rounded-full hover:bg-destructive/20"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No skills added yet</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Your Hourly Rate (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="e.g. 2000"
                    className="pl-7"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Most mentors on our platform charge between ₹1,500 - ₹5,000 per hour
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Mentor Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell potential mentees about your experience and expertise..."
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {bio.length}/400 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="space-y-3">
                  {weekdays.map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{day}</span>
                      </div>
                      <Switch
                        checked={availability.includes(day)}
                        onCheckedChange={() => handleToggleAvailability(day)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Our team will review your application within 48 hours
          </div>
          <Button className="w-full sm:w-auto">
            <CheckCircle className="mr-2 h-4 w-4" /> Submit Application
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
