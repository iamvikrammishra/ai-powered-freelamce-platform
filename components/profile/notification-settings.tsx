"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

type NotificationSetting = {
  id: string
  title: string
  description: string
  enabled: boolean
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email-projects",
      title: "New Project Matches",
      description: "Receive email notifications when new projects match your skills",
      enabled: true,
    },
    {
      id: "email-messages",
      title: "New Messages",
      description: "Receive email notifications for new messages",
      enabled: true,
    },
    {
      id: "email-proposals",
      title: "Proposal Updates",
      description: "Receive email notifications when your proposals are accepted or rejected",
      enabled: true,
    },
    {
      id: "push-projects",
      title: "New Project Matches",
      description: "Receive push notifications when new projects match your skills",
      enabled: false,
    },
    {
      id: "push-messages",
      title: "New Messages",
      description: "Receive push notifications for new messages",
      enabled: true,
    },
    {
      id: "push-proposals",
      title: "Proposal Updates",
      description: "Receive push notifications when your proposals are accepted or rejected",
      enabled: false,
    },
    {
      id: "marketing",
      title: "Marketing Communications",
      description: "Receive updates about new features and special offers",
      enabled: false,
    },
  ])

  const handleToggle = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))

    const setting = settings.find((s) => s.id === id)
    if (setting) {
      toast({
        title: `${setting.title} notifications ${!setting.enabled ? "enabled" : "disabled"}`,
        description: `You will ${!setting.enabled ? "now" : "no longer"} receive ${setting.title.toLowerCase()} notifications.`,
        duration: 3000,
      })
    }
  }

  const saveSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive notifications from GigIndia</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            {settings
              .filter((s) => s.id.startsWith("email-"))
              .map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id}>{setting.title}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <div className="space-y-4">
            {settings
              .filter((s) => s.id.startsWith("push-"))
              .map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id}>{setting.title}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Marketing</h3>
          <div className="space-y-4">
            {settings
              .filter((s) => s.id === "marketing")
              .map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id}>{setting.title}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
                </div>
              ))}
          </div>
        </div>

        <Button onClick={saveSettings}>Save Settings</Button>
      </CardContent>
    </Card>
  )
}
