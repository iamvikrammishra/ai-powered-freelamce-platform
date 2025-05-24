"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, X, Camera } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface AvatarUploadProps {
  userId: string
  existingUrl?: string
  onAvatarChange: (url: string) => void
}

export function AvatarUpload({ userId, existingUrl, onAvatarChange }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState(existingUrl || "")
  const [uploading, setUploading] = useState(false)
  
  // Sample profile images for quick selection
  const sampleAvatars = [
    "/professional-headshot.png",
    "/indian-professional-man.png", 
    "/indian-man-headshot.png",
    "/indian-man-professional-headshot-2.png",
    "/indian-woman-professional.png",
    "/indian-woman-professional-headshot.png",
    "/professional-indian-headshot.png"
  ]

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `avatars/${userId}-${Math.random()}.${fileExt}`
      
      // Upload image to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })
        
      if (uploadError) {
        throw uploadError
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)
        
      setAvatarUrl(publicUrl)
      onAvatarChange(publicUrl)
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile image has been updated."
      })
      
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your image.",
        variant: "destructive"
      })
      console.error("Error uploading avatar:", error)
    } finally {
      setUploading(false)
    }
  }
  
  const handleSampleAvatarSelect = (url: string) => {
    setAvatarUrl(url)
    onAvatarChange(url)
    
    toast({
      title: "Avatar selected",
      description: "Your profile image has been updated."
    })
  }
  
  const handleRemoveAvatar = () => {
    setAvatarUrl("")
    onAvatarChange("")
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        {avatarUrl ? (
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20">
              <Image 
                src={avatarUrl} 
                alt="Profile" 
                width={128} 
                height={128} 
                className="object-cover h-full w-full"
              />
            </div>
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
              onClick={handleRemoveAvatar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
            <Camera className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="avatar" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
              <Upload className="h-4 w-4" />
              <span>{uploading ? "Uploading..." : "Upload profile picture"}</span>
            </div>
            <input 
              id="avatar" 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </Label>
          <p className="text-xs text-muted-foreground">
            Recommended: Square image, at least 400x400px
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm">Or choose from sample avatars:</Label>
        <div className="flex flex-wrap gap-3 justify-center">
          {sampleAvatars.map((avatar, index) => (
            <button
              key={index}
              className={`h-16 w-16 rounded-full overflow-hidden border-2 transition-all ${
                avatarUrl === avatar ? 'border-primary ring-2 ring-primary/30' : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => handleSampleAvatarSelect(avatar)}
            >
              <Image 
                src={avatar} 
                alt={`Sample avatar ${index + 1}`} 
                width={64} 
                height={64} 
                className="object-cover h-full w-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
