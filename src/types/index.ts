// Global TypeScript type definitions
export interface User {
  id: string;
  email?: string;
  display_name?: string;
  avatar_url?: string;
  role?: 'freelancer' | 'employer' | 'admin';
}

export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  skills?: string[];
  location?: string;
  hourly_rate?: number;
  experience_level?: string;
  company_name?: string;
  company_website?: string;
  industry?: string;
  company_size?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  skills: string[];
  budget_min?: number;
  budget_max?: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  duration?: string;
  experience_level?: string;
  status: 'draft' | 'active' | 'closed' | 'archived';
  created_at: string;
  updated_at: string;
}

// User type definition for role-based access control
export type UserType = 'freelancer' | 'employer' | 'admin' | null;

// Add other type definitions as needed
