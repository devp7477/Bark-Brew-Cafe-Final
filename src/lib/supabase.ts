import { createClient } from '@supabase/supabase-js'
import { ENV } from '@/config/environment'

// Use environment variables or fallback to config values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ENV.SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ENV.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})