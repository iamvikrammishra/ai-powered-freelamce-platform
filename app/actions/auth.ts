'use server'

import { createClient } from '@supabase/supabase-js'

// Create a Supabase client with admin privileges using service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This key bypasses RLS
  { auth: { persistSession: false } }
)

/**
 * Creates a user profile with admin privileges to bypass RLS
 */
export async function createUserProfile(
  userId: string, 
  profileData: any, 
  userType: 'freelancer' | 'employer'
) {
  const table = userType === 'freelancer' ? 'freelancer_profiles' : 'employer_profiles'
  
  try {
    // Log for debugging
    console.log(`Creating ${userType} profile for user ${userId} with data:`, JSON.stringify(profileData));
    
    // Make sure we have the required fields for profiles
    if (!profileData.full_name || !profileData.display_name) {
      return { 
        success: false, 
        error: 'Missing required profile fields (full_name, display_name)'
      };
    }
    
    // Check if profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from(table)
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (existingProfile) {
      console.log(`Profile already exists for user ${userId}`);
      return { success: true }; // Profile already exists, return success
    }
    
    // Create the profile
    const { data, error } = await supabaseAdmin
      .from(table)
      .insert({
        user_id: userId,
        ...profileData
      })
      .select() // Return the created record
    
    if (error) {
      console.error('Database error creating profile:', error);
      throw error;
    }
    
    console.log(`Successfully created ${userType} profile:`, data);
    return { success: true, data };
  } catch (error: any) {
    // Detailed error logging
    console.error('Error creating profile:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    return { 
      success: false, 
      error: error.message || error.details || JSON.stringify(error) || 'Failed to create profile'
    };
  }
}
