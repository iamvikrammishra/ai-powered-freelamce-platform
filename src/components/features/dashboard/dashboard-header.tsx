"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  title: string
  href: string
}

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  actions?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  bordered?: boolean
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  actions,
  breadcrumbs,
  bordered = false,
  className,
}: DashboardHeaderProps) {
  const pathname = usePathname()
  
  // Generate breadcrumbs from pathname if not provided
  const generatedBreadcrumbs = !breadcrumbs && pathname ? generateBreadcrumbs(pathname) : breadcrumbs

  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-6",
        bordered && "border-b pb-6",
        className
      )}
    >
      {generatedBreadcrumbs && generatedBreadcrumbs.length > 0 && (
        <Breadcrumb className="text-sm text-muted-foreground">
          <BreadcrumbList>
            {generatedBreadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < generatedBreadcrumbs.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      
      <div className="flex items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-1"
        >
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h1>
          {text && <p className="text-muted-foreground">{text}</p>}
        </motion.div>
        
        {(actions || children) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            {actions}
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean)
  
  // Start with Dashboard
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" }
  ]
  
  // Add intermediate paths
  let currentPath = "/dashboard"
  for (let i = 1; i < paths.length; i++) {
    currentPath += `/${paths[i]}`
    const title = paths[i].split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")
    
    breadcrumbs.push({ title, href: currentPath })
  }
  
  return breadcrumbs
}
