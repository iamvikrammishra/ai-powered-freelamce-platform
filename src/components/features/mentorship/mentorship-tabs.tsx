"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FindMentor } from "@/components/features/mentorship/find-mentor"
import { BecomeMentor } from "@/components/features/mentorship/become-mentor"
import { MentorshipSessions } from "@/components/features/mentorship/mentorship-sessions"

export function MentorshipTabs() {
  return (
    <Tabs defaultValue="find-mentor">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
        <TabsTrigger value="become-mentor">Become a Mentor</TabsTrigger>
        <TabsTrigger value="sessions">My Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="find-mentor" className="mt-6">
        <FindMentor />
      </TabsContent>
      <TabsContent value="become-mentor" className="mt-6">
        <BecomeMentor />
      </TabsContent>
      <TabsContent value="sessions" className="mt-6">
        <MentorshipSessions />
      </TabsContent>
    </Tabs>
  )
}
