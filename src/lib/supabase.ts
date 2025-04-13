
import { createClient } from '@supabase/supabase-js';

// Use the direct constants instead of environment variables
const supabaseUrl = "https://qzznnnsmbkvukymamwjs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6em5ubnNtYmt2dWt5bWFtd2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjQ0MTksImV4cCI6MjA1OTcwMDQxOX0.DQiO4ecM29qYYnAJxlse3-Y3rODEVxjFcQ2ZqzEqjOk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
