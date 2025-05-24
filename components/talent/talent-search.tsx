"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, X } from "lucide-react"

export function TalentSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [availability, setAvailability] = useState("")

  const popularSkills = [
    "React",
    "Node.js",
    "Python",
    "UI/UX Design",
    "WordPress",
    "Mobile App",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Machine Learning",
  ]

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-6">
      {/* Main Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for skills, roles, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="flex gap-2">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-48 h-12">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anywhere">Anywhere</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>

          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-48 h-12">
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="immediate">Available Now</SelectItem>
              <SelectItem value="week">Within a Week</SelectItem>
              <SelectItem value="month">Within a Month</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Popular Skills */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Popular Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="cursor-pointer hover:bg-muted transition-colors"
              onClick={() => addSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
