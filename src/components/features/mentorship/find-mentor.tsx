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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Search, Star, Clock, Calendar } from "lucide-react"

export function FindMentor() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  
  // Sample mentor data
  const mentors = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Senior Full Stack Developer",
      company: "TechMahindra",
      expertise: ["React", "Node.js", "MongoDB"],
      rating: 4.9,
      hourlyRate: "₹2,500",
      availability: "Weekends",
      image: "/mentor-1.png"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "UX/UI Design Lead",
      company: "Infosys",
      expertise: ["UI Design", "User Research", "Figma"],
      rating: 4.8,
      hourlyRate: "₹2,200",
      availability: "Weekday Evenings",
      image: "/mentor-2.png"
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "Senior Product Manager",
      company: "Flipkart",
      expertise: ["Product Strategy", "Agile", "Growth"],
      rating: 4.7,
      hourlyRate: "₹3,000",
      availability: "Flexible",
      image: "/mentor-3.png"
    },
    {
      id: 4,
      name: "Ananya Gupta",
      role: "Marketing Director",
      company: "Zomato",
      expertise: ["Digital Marketing", "Brand Strategy", "Analytics"],
      rating: 4.9,
      hourlyRate: "₹2,800",
      availability: "Weekends",
      image: "/mentor-4.png"
    }
  ]
  
  // Filter mentors based on search and selected skill
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = 
      selectedSkill === "all" || 
      mentor.expertise.some(skill => 
        skill.toLowerCase().includes(selectedSkill.toLowerCase())
      );
    
    return matchesSearch && matchesSkill;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search mentors..."
              className="w-full pl-8 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="design">UI/UX Design</SelectItem>
              <SelectItem value="node">Node.js</SelectItem>
              <SelectItem value="product">Product Management</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-base">{mentor.name}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    {mentor.role} at {mentor.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm mb-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{mentor.rating}</span>
                <span className="text-muted-foreground">(24 sessions)</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{mentor.hourlyRate} per hour</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Available: {mentor.availability}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t bg-muted/50 px-6 py-3">
              <Button className="w-full">View Profile</Button>
              <Button variant="outline" className="w-full">Book Session</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
