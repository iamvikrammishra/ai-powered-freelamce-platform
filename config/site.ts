export const siteConfig = {
  name: "Freelance Platform",
  description: "An AI-powered freelance marketplace for connecting talent with employers",
  url: "https://freelance-platform.vercel.app",
  ogImage: "https://freelance-platform.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/freelanceplatform",
    github: "https://github.com/username/freelance-platform",
  },
  creator: "Vikram Mishra",
  keywords: [
    "freelance",
    "marketplace",
    "jobs",
    "remote work",
    "hiring",
    "talent",
    "AI-powered"
  ]
};

export const navConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Find Work",
      href: "/find-work",
    },
    {
      title: "Find Talent",
      href: "/find-talent",
    },
    {
      title: "How It Works",
      href: "/how-it-works",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],
  dashboardNav: {
    freelancer: [
      { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { title: "Find Jobs", href: "/dashboard/find-jobs", icon: "Search" },
      { title: "My Jobs", href: "/dashboard/my-jobs", icon: "Briefcase" },
      { title: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
      { title: "Profile", href: "/dashboard/profile", icon: "User" },
    ],
    employer: [
      { title: "Dashboard", href: "/dashboard/employer", icon: "LayoutDashboard" },
      { title: "Post Job", href: "/dashboard/employer/post-job", icon: "PlusCircle" },
      { title: "Applicants", href: "/dashboard/employer/applicants", icon: "Users" },
      { title: "Contracts", href: "/dashboard/employer/contracts", icon: "FileText" },
      { title: "Messages", href: "/dashboard/employer/messages", icon: "MessageSquare" },
      { title: "Payments", href: "/dashboard/employer/payments", icon: "CreditCard" },
    ]
  }
};
