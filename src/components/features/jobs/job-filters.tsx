"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const skillOptions = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "SEO",
  "Digital Marketing",
  "Data Analysis",
  "Machine Learning",
]

export function JobFilters() {
  const [priceRange, setPriceRange] = useState([500, 10000])
  const [remoteOnly, setRemoteOnly] = useState(true)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Next.js"])

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const clearFilters = () => {
    setPriceRange([500, 10000])
    setRemoteOnly(false)
    setVerifiedOnly(false)
    setSelectedSkills([])
  }

  const applyFilters = () => {
    // In a real app, this would trigger a search with the selected filters
    console.log({
      priceRange,
      remoteOnly,
      verifiedOnly,
      selectedSkills,
    })
  }

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Budget Range (₹)</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={500}
                max={50000}
                step={500}
                onValueChange={setPriceRange}
                className="z-0" // Fix z-index issues
              />
              <div className="flex items-center justify-between">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="remote-only">Remote Only</Label>
              <Switch id="remote-only" checked={remoteOnly} onCheckedChange={setRemoteOnly} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="verified-only">Verified Employers Only</Label>
              <Switch id="verified-only" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </button>
                </Badge>
              ))}
              {selectedSkills.length === 0 && <span className="text-sm text-muted-foreground">No skills selected</span>}
            </div>
            <div className="h-40 overflow-y-auto border rounded-md p-2">
              <div className="space-y-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center justify-between w-full px-2 py-1 text-sm rounded-md ${
                        selectedSkills.includes(skill) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <span>{skill}</span>
                      {selectedSkills.includes(skill) && <Check className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
