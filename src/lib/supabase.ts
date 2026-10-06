import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqwxpivtkevcqantxrcl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxd3hwaXZ0a2V2Y3FhbnR4cmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTQyODAsImV4cCI6MjEwNjY5MDI4MH0.7_qkQkLpDDxiU355WLvLViw38Eb-gYO5a7zJkQHPDV0';

// Standard Supabase client for browser and ISR fetch operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
