"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingMeetings } from "./upcoming-meetings"
import { ScheduleMeeting } from "./schedule-meeting"
import { MeetingHistory } from "./meeting-history"
import { MeetingRoom } from "./meeting-room"

export function MeetingTabs() {
  return (
    <Tabs defaultValue="upcoming" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="room">Meeting Room</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        <UpcomingMeetings />
      </TabsContent>

      <TabsContent value="schedule">
        <ScheduleMeeting />
      </TabsContent>

      <TabsContent value="history">
        <MeetingHistory />
      </TabsContent>

      <TabsContent value="room">
        <MeetingRoom />
      </TabsContent>
    </Tabs>
  )
}
