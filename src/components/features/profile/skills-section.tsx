"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, PlusCircle, XCircle, AlertCircle, Award } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function SkillsSection() {
  const [newSkill, setNewSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [testAnswers, setTestAnswers] = useState<number[]>([])

  // Mock skills data
  const [skills, setSkills] = useState([
    { id: 1, name: "React", level: 90, verified: true, verificationMethod: "portfolio" },
    { id: 2, name: "Node.js", level: 85, verified: true, verificationMethod: "test" },
    { id: 3, name: "MongoDB", level: 75, verified: false, verificationMethod: null },
    { id: 4, name: "TypeScript", level: 80, verified: true, verificationMethod: "portfolio" },
    { id: 5, name: "UI/UX Design", level: 65, verified: false, verificationMethod: null },
  ])

  // Mock test questions
  const mockTests = {
    React: [
      {
        question: "What is the virtual DOM in React?",
        options: [
          "A direct copy of the actual DOM",
          "A lightweight copy of the actual DOM used for performance optimization",
          "A browser extension for React development",
          "A third-party library for DOM manipulation",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useReducer", "useEffect", "useContext"],
        correctAnswer: 2,
      },
      {
        question: "What is the correct way to update state in React?",
        options: [
          "Directly modify the state variable",
          "Use the setState function or state updater from useState",
          "Use document.getElementById to find and update elements",
          "Modify the props object",
        ],
        correctAnswer: 1,
      },
    ],
    "Node.js": [
      {
        question: "What is Node.js?",
        options: [
          "A frontend JavaScript framework",
          "A JavaScript runtime environment",
          "A database management system",
          "A programming language",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is NOT a core module in Node.js?",
        options: ["http", "fs", "path", "react"],
        correctAnswer: 3,
      },
      {
        question: "What does the 'npm' stand for?",
        options: ["Node Package Manager", "Node Programming Module", "New Package Manager", "Node Process Manager"],
        correctAnswer: 0,
      },
    ],
    MongoDB: [
      {
        question: "MongoDB is what type of database?",
        options: ["Relational database", "NoSQL document database", "Graph database", "In-memory database"],
        correctAnswer: 1,
      },
      {
        question: "What is a document in MongoDB?",
        options: [
          "A table row",
          "A JSON-like data structure with field-value pairs",
          "A text file",
          "A database schema",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is the MongoDB query language?",
        options: ["SQL", "MQL", "GraphQL", "XQuery"],
        correctAnswer: 1,
      },
    ],
    TypeScript: [
      {
        question: "TypeScript is a superset of which language?",
        options: ["Java", "C#", "JavaScript", "Python"],
        correctAnswer: 2,
      },
      {
        question: "What file extension is used for TypeScript files?",
        options: [".js", ".ts", ".tsx", ".typescript"],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is NOT a basic type in TypeScript?",
        options: ["number", "string", "boolean", "character"],
        correctAnswer: 3,
      },
    ],
    "UI/UX Design": [
      {
        question: "What does UX stand for?",
        options: ["User Experience", "User Extension", "User Examination", "User Extraction"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is NOT a UX design principle?",
        options: ["Consistency", "Accessibility", "Code Optimization", "Feedback"],
        correctAnswer: 2,
      },
      {
        question: "What is a wireframe?",
        options: ["A 3D model", "A low-fidelity layout", "A type of server", "A programming language"],
        correctAnswer: 1,
      },
    ],
  }

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...skills.map((s) => s.id)) + 1
      setSkills([
        ...skills,
        {
          id: newId,
          name: newSkill,
          level: 50,
          verified: false,
          verificationMethod: null,
        },
      ])
      setNewSkill("")
      setIsLoading(false)
      toast({
        title: "Skill added",
        description: "Your new skill has been added successfully.",
      })
    }, 1000)
  }

  const handleRemoveSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id))
    toast({
      title: "Skill removed",
      description: "The skill has been removed from your profile.",
    })
  }

  const handleVerifySkill = (skill: any) => {
    setSelectedSkill(skill)
    setTestAnswers([])
  }

  const handleUploadPortfolio = (id: number) => {
    setIsLoading(true)

    // Simulate API call to verify skill via portfolio
    setTimeout(() => {
      setSkills(
        skills.map((skill) =>
          skill.id === id ? { ...skill, verified: true, verificationMethod: "portfolio" } : skill,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Portfolio verified",
        description: "Your portfolio has been analyzed and the skill has been verified.",
      })
    }, 1500)
  }

  const handleSubmitTest = () => {
    setIsLoading(true)

    // Simulate API call to verify skill via test
    setTimeout(() => {
      // Calculate score
      const testQuestions = mockTests[selectedSkill.name as keyof typeof mockTests] || []
      let correctAnswers = 0

      testAnswers.forEach((answer, index) => {
        if (index < testQuestions.length && answer === testQuestions[index].correctAnswer) {
          correctAnswers++
        }
      })

      const score = testQuestions.length > 0 ? (correctAnswers / testQuestions.length) * 100 : 0
      const passed = score >= 70 // 70% passing threshold

      if (passed) {
        setSkills(
          skills.map((skill) =>
            skill.id === selectedSkill.id ? { ...skill, verified: true, verificationMethod: "test" } : skill,
          ),
        )
        toast({
          title: "Skill verified",
          description: `Congratulations! You passed the ${selectedSkill.name} test with a score of ${score.toFixed(0)}%.`,
        })
      } else {
        toast({
          title: "Test not passed",
          description: `You scored ${score.toFixed(0)}%. A score of 70% or higher is required to verify this skill.`,
          variant: "destructive",
        })
      }

      setIsLoading(false)
      setSelectedSkill(null)
    }, 1500)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...testAnswers]
    newAnswers[questionIndex] = answerIndex
    setTestAnswers(newAnswers)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add your skills and get them verified to stand out to potential clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    {skill.verified && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveSkill(skill.id)}>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Proficiency</span>
                    <span className="font-medium">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>

                {!skill.verified && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleVerifySkill(skill)}>
                          <Award className="mr-2 h-4 w-4" />
                          Take Skill Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>{skill.name} Skill Test</DialogTitle>
                          <DialogDescription>
                            Answer the following questions to verify your {skill.name} skills.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="py-4 space-y-6">
                          {mockTests[skill.name as keyof typeof mockTests]?.map((question, qIndex) => (
                            <div key={qIndex} className="space-y-3">
                              <h4 className="font-medium">
                                Question {qIndex + 1}: {question.question}
                              </h4>
                              <RadioGroup
                                value={testAnswers[qIndex]?.toString()}
                                onValueChange={(value) => handleAnswerSelect(qIndex, Number.parseInt(value))}
                              >
                                {question.options.map((option, oIndex) => (
                                  <div key={oIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                                    <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                        </div>

                        <DialogFooter>
                          <Button
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={handleSubmitTest}
                            disabled={
                              isLoading ||
                              testAnswers.length < (mockTests[skill.name as keyof typeof mockTests]?.length || 0)
                            }
                          >
                            {isLoading ? "Submitting..." : "Submit Test"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Upload Portfolio
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Verify {skill.name} with Portfolio</DialogTitle>
                          <DialogDescription>
                            Upload portfolio samples that demonstrate your {skill.name} skills.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="py-4 space-y-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="portfolio-file">Upload Portfolio Sample</Label>
                            <Input id="portfolio-file" type="file" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Our AI will analyze your portfolio to verify your skills. Upload your best work samples.
                          </p>
                        </div>

                        <DialogFooter>
                          <Button
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => {
                              handleUploadPortfolio(skill.id)
                            }}
                            disabled={isLoading}
                          >
                            {isLoading ? "Analyzing..." : "Upload & Verify"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {skill.verified && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Verified via {skill.verificationMethod === "portfolio" ? "portfolio analysis" : "skill assessment"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Tests</CardTitle>
          <CardDescription>
            Take tests to verify your skills and increase your chances of getting hired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">React Proficiency Test</h4>
                  <p className="text-sm text-muted-foreground">20 questions • 30 minutes</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Score: 92%</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>React Proficiency Certificate</DialogTitle>
                      <DialogDescription>This certificate verifies your React skills</DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      <div className="border rounded-lg p-6 text-center space-y-4">
                        <div className="text-2xl font-bold text-purple-600">Certificate of Achievement</div>
                        <div className="text-lg">This certifies that</div>
                        <div className="text-xl font-semibold">Rahul Patel</div>
                        <div className="text-lg">has successfully completed the</div>
                        <div className="text-xl font-semibold">React Proficiency Test</div>
                        <div className="text-lg">with a score of</div>
                        <div className="text-2xl font-bold text-purple-600">92%</div>
                        <div className="text-sm text-muted-foreground">Issued on May 10, 2025</div>
                        <div className="text-sm text-muted-foreground">Certificate ID: REACT-92-20250510</div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button className="bg-purple-600 hover:bg-purple-700">Download Certificate</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Node.js Development Test</h4>
                  <p className="text-sm text-muted-foreground">15 questions • 25 minutes</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Score: 85%</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Node.js Development Certificate</DialogTitle>
                      <DialogDescription>This certificate verifies your Node.js skills</DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      <div className="border rounded-lg p-6 text-center space-y-4">
                        <div className="text-2xl font-bold text-purple-600">Certificate of Achievement</div>
                        <div className="text-lg">This certifies that</div>
                        <div className="text-xl font-semibold">Rahul Patel</div>
                        <div className="text-lg">has successfully completed the</div>
                        <div className="text-xl font-semibold">Node.js Development Test</div>
                        <div className="text-lg">with a score of</div>
                        <div className="text-2xl font-bold text-purple-600">85%</div>
                        <div className="text-sm text-muted-foreground">Issued on April 25, 2025</div>
                        <div className="text-sm text-muted-foreground">Certificate ID: NODE-85-20250425</div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button className="bg-purple-600 hover:bg-purple-700">Download Certificate</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">UI/UX Design Principles</h4>
                  <p className="text-sm text-muted-foreground">25 questions • 40 minutes</p>
                </div>
                <Badge variant="outline">Not Started</Badge>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Take this test to verify your UI/UX skills</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Start Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>UI/UX Design Principles Test</DialogTitle>
                      <DialogDescription>
                        This test will assess your knowledge of UI/UX design principles.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Test Information</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• 25 multiple-choice questions</li>
                          <li>• 40 minutes to complete</li>
                          <li>• 70% passing score required</li>
                          <li>• You cannot pause once started</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <h4 className="font-medium mb-2">Topics Covered</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">UI Principles</Badge>
                          <Badge variant="outline">UX Research</Badge>
                          <Badge variant="outline">Wireframing</Badge>
                          <Badge variant="outline">Prototyping</Badge>
                          <Badge variant="outline">Accessibility</Badge>
                          <Badge variant="outline">Design Systems</Badge>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button className="bg-purple-600 hover:bg-purple-700">Begin Test</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Browse All Skill Tests
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Available Skill Tests</DialogTitle>
                <DialogDescription>
                  Browse and take tests to verify your skills and increase your chances of getting hired.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <Input placeholder="Search tests..." />

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">JavaScript Fundamentals</h4>
                        <p className="text-sm text-muted-foreground">30 questions • 45 minutes</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Test
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">MongoDB Database Design</h4>
                        <p className="text-sm text-muted-foreground">20 questions • 30 minutes</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Test
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">TypeScript Advanced Concepts</h4>
                        <p className="text-sm text-muted-foreground">25 questions • 40 minutes</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Test
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">React Native Development</h4>
                        <p className="text-sm text-muted-foreground">30 questions • 45 minutes</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Test
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">GraphQL API Design</h4>
                        <p className="text-sm text-muted-foreground">20 questions • 30 minutes</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Test
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
