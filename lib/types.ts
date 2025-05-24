export type UserRole = 'freelancer' | 'employer' | 'admin';
export type UserType = 'freelancer' | 'employer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  contact_email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface FreelancerProfile extends Profile {
  skills: string[];
  hourly_rate: number | null;
  experience_level: 'beginner' | 'intermediate' | 'expert' | null;
  availability: 'full-time' | 'part-time' | 'contract' | 'not-available' | null;
  total_earnings: number;
  jobs_completed: number;
  rating: number | null;
}

export interface EmployerProfile extends Profile {
  company_name: string | null;
  company_website: string | null;
  company_size: string | null;
  industry: string | null;
  jobs_posted: number;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  skills_required: string[];
  budget_min: number | null;
  budget_max: number | null;
  budget_type: 'fixed' | 'hourly';
  duration: 'short' | 'medium' | 'long' | null;
  experience_level: 'beginner' | 'intermediate' | 'expert' | null;
  status: 'draft' | 'open' | 'in-progress' | 'completed' | 'cancelled';
  location_type: 'remote' | 'onsite' | 'hybrid';
  location: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

export interface JobApplication {
  id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter: string;
  proposed_rate: number | null;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  job_id: string;
  employer_id: string;
  freelancer_id: string;
  terms: string;
  rate: number;
  payment_type: 'hourly' | 'fixed';
  status: 'draft' | 'active' | 'completed' | 'cancelled' | 'disputed';
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  job_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Payment {
  id: string;
  contract_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  transaction_id: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  content: string;
  is_read: boolean;
  reference_id: string | null;
  reference_type: string | null;
  created_at: string;
}
