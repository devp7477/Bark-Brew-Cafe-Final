// Clerk Configuration
import { ENV } from './environment'

export const CLERK_CONFIG = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ENV.CLERK_PUBLISHABLE_KEY
}

// Environment variables (create .env.local file with these):
// VITE_CLERK_PUBLISHABLE_KEY=pk_test_bGlrZWQta2l0LTI1LmNsZXJrLmFjY291bnRzLmRldiQ
// VITE_SUPABASE_URL=https://uilhjssbemqvgatxkloi.supabase.co
// VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbGhqc3NiZW1xdmdhdHhrbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzQ4NzQsImV4cCI6MjA0OTg1MDg3NH0.BrCalbxXxr7MFd4dA