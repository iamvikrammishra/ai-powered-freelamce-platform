"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function TalentFilters() {
  const [hourlyRate, setHourlyRate] = useState([0])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const categories = [
    { id: "web-dev", label: "Web Development", count: 2453 },
    { id: "mobile-dev", label: "Mobile Development", count: 1829 },
    { id: "design", label: "Design & Creative", count: 3102 },
    { id: "writing", label: "Writing & Translation", count: 1567 },
    { id: "marketing", label: "Digital Marketing", count: 2104 },
    { id: "data", label: "Data & Analytics", count: 892 },
    { id: "admin", label: "Admin & Customer Support", count: 1345 },
  ]

  const experienceLevels = [
    { id: "entry", label: "Entry Level", count: 1204 },
    { id: "intermediate", label: "Intermediate", count: 2341 },
    { id: "expert", label: "Expert", count: 1876 },
  ]

  const languages = [
    { id: "english", label: "English", count: 4521 },
    { id: "hindi", label: "Hindi", count: 3892 },
    { id: "tamil", label: "Tamil", count: 1234 },
    { id: "bengali", label: "Bengali", count: 987 },
    { id: "marathi", label: "Marathi", count: 765 },
  ]

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const clearAllFilters = () => {
    setHourlyRate([0])
    setSelectedCategories([])
    setSelectedExperience([])
    setSelectedLanguages([])
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hourly Rate */}
        <div className="space-y-3">
          <h4 className="font-medium">Hourly Rate</h4>
          <div className="space-y-2">
            <Slider value={hourlyRate} onValueChange={setHourlyRate} max={200} step={5} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹0</span>
              <span>₹{hourlyRate[0]}/hr</span>
              <span>₹200+</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div className="space-y-3">
          <h4 className="font-medium">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={level.id}
                    checked={selectedExperience.includes(level.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedExperience([...selectedExperience, level.id])
                      } else {
                        setSelectedExperience(selectedExperience.filter((id) => id !== level.id))
                      }
                    }}
                  />
                  <label
                    htmlFor={level.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {level.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {level.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Languages */}
        <div className="space-y-3">
          <h4 className="font-medium">Languages</h4>
          <div className="space-y-2">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={language.id}
                    checked={selectedLanguages.includes(language.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLanguages([...selectedLanguages, language.id])
                      } else {
                        setSelectedLanguages(selectedLanguages.filter((id) => id !== language.id))
                      }
                    }}
                  />
                  <label
                    htmlFor={language.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {language.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {language.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
