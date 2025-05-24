import { supabase } from "../supabase/client";

/**
 * API methods for fetching user profiles
 */
export const profileService = {
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async updateProfile(userId: string, profileData: any) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("user_id", userId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

/**
 * API methods for jobs
 */
export const jobService = {
  async getJobs(filters = {}) {
    let query = supabase.from("jobs").select("*");
    
    // Apply any filters here
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = query.eq(key, value);
      }
    });
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  
  async getJobById(jobId: string) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async createJob(jobData: any) {
    const { data, error } = await supabase
      .from("jobs")
      .insert(jobData)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};

// Add other API services as needed
