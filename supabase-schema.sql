-- This SQL script sets up the database schema for our freelancing platform
-- Execute this in the Supabase SQL Editor after creating your project

-- Profiles for freelancers
CREATE TABLE IF NOT EXISTS public.freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  contact_email TEXT,
  phone TEXT,
  primary_skill TEXT,
  skills TEXT[] DEFAULT '{}',
  hourly_rate DECIMAL(10, 2),
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
  availability TEXT CHECK (availability IN ('full-time', 'part-time', 'contract', 'not-available')),
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  rating DECIMAL(3, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Profiles for employers
CREATE TABLE IF NOT EXISTS public.employer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  contact_email TEXT,
  phone TEXT,
  company_name TEXT,
  company_website TEXT,
  company_size TEXT,
  industry TEXT,
  jobs_posted INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills_required TEXT[] DEFAULT '{}',
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  budget_type TEXT NOT NULL CHECK (budget_type IN ('fixed', 'hourly')),
  duration TEXT CHECK (duration IN ('short', 'medium', 'long')),
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'in-progress', 'completed', 'cancelled')),
  location_type TEXT NOT NULL CHECK (location_type IN ('remote', 'onsite', 'hybrid')),
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Job applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_rate DECIMAL(10, 2),
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, freelancer_id)
);

-- Contracts between employers and freelancers
CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  terms TEXT NOT NULL,
  rate DECIMAL(10, 2) NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('hourly', 'fixed')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'completed', 'cancelled', 'disputed')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages between users
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations between users
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participants UUID[] NOT NULL,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(reviewer_id, reviewee_id, job_id)
);

-- Payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills catalog
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  reference_id UUID,
  reference_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies to secure the data
-- These are just examples, you should customize based on your specific needs

-- Enable RLS on all tables
ALTER TABLE public.freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
-- Allow users to read their own profiles
CREATE POLICY freelancer_profiles_select ON public.freelancer_profiles 
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.jobs j
    JOIN public.job_applications ja ON j.id = ja.job_id
    WHERE j.employer_id = auth.uid() AND ja.freelancer_id = user_id
  ));

CREATE POLICY employer_profiles_select ON public.employer_profiles 
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.job_applications ja
    JOIN public.jobs j ON ja.job_id = j.id
    WHERE ja.freelancer_id = auth.uid() AND j.employer_id = user_id
  ));

-- Allow users to update only their own profiles
CREATE POLICY freelancer_profiles_update ON public.freelancer_profiles 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY employer_profiles_update ON public.employer_profiles 
  FOR UPDATE USING (auth.uid() = user_id);

-- Jobs policies
CREATE POLICY jobs_select ON public.jobs FOR SELECT USING (true);  -- Anyone can view jobs
CREATE POLICY jobs_insert ON public.jobs FOR INSERT WITH CHECK (auth.uid() = employer_id);
CREATE POLICY jobs_update ON public.jobs FOR UPDATE USING (auth.uid() = employer_id);

-- Job applications policies
CREATE POLICY job_applications_select ON public.job_applications 
  FOR SELECT USING (
    auth.uid() = freelancer_id OR 
    EXISTS (SELECT 1 FROM public.jobs WHERE id = job_id AND employer_id = auth.uid())
  );
CREATE POLICY job_applications_insert ON public.job_applications 
  FOR INSERT WITH CHECK (auth.uid() = freelancer_id);
CREATE POLICY job_applications_update ON public.job_applications 
  FOR UPDATE USING (
    auth.uid() = freelancer_id OR 
    EXISTS (SELECT 1 FROM public.jobs WHERE id = job_id AND employer_id = auth.uid())
  );

-- Set up full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create indexes for job search
CREATE INDEX IF NOT EXISTS jobs_title_trgm_idx ON public.jobs USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS jobs_description_trgm_idx ON public.jobs USING GIN (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS jobs_skills_idx ON public.jobs USING GIN (skills_required);

-- Create indexes for freelancer search
CREATE INDEX IF NOT EXISTS freelancer_profiles_skills_idx ON public.freelancer_profiles USING GIN (skills);
CREATE INDEX IF NOT EXISTS freelancer_bio_trgm_idx ON public.freelancer_profiles USING GIN (bio gin_trgm_ops);

-- Create a view for job search
CREATE OR REPLACE VIEW public.job_search AS
SELECT 
  j.id,
  j.title,
  j.description,
  j.skills_required,
  j.budget_min,
  j.budget_max,
  j.budget_type,
  j.duration,
  j.experience_level,
  j.status,
  j.location_type,
  j.location,
  j.created_at,
  ep.company_name,
  ep.avatar_url as company_logo
FROM 
  public.jobs j
JOIN 
  public.employer_profiles ep ON j.employer_id = ep.user_id
WHERE 
  j.status = 'open';

-- Create a view for freelancer search
CREATE OR REPLACE VIEW public.freelancer_search AS
SELECT 
  fp.id,
  fp.user_id,
  fp.full_name,
  fp.display_name,
  fp.avatar_url,
  fp.bio,
  fp.location,
  fp.primary_skill,
  fp.skills,
  fp.hourly_rate,
  fp.experience_level,
  fp.availability,
  fp.total_earnings,
  fp.jobs_completed,
  fp.rating
FROM 
  public.freelancer_profiles fp
WHERE 
  fp.availability != 'not-available';

-- Create functions for handling user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, content)
  VALUES (NEW.id, 'welcome', 'Welcome to GigIndia! Complete your profile to get started.');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add sample skills data
INSERT INTO public.skills (name, category) VALUES
  ('JavaScript', 'Development'),
  ('React', 'Development'),
  ('Node.js', 'Development'),
  ('Python', 'Development'),
  ('Java', 'Development'),
  ('UI Design', 'Design'),
  ('UX Design', 'Design'),
  ('Graphic Design', 'Design'),
  ('Logo Design', 'Design'),
  ('Content Writing', 'Writing'),
  ('Copywriting', 'Writing'),
  ('SEO', 'Marketing'),
  ('Social Media Marketing', 'Marketing'),
  ('Email Marketing', 'Marketing'),
  ('Mobile App Development', 'Development'),
  ('Data Analysis', 'Data'),
  ('Machine Learning', 'Data'),
  ('Video Editing', 'Multimedia'),
  ('Animation', 'Multimedia'),
  ('Project Management', 'Business')
ON CONFLICT (name) DO NOTHING;
