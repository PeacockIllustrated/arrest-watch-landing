import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxuwooxuwcrpgrlqmccc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dXdvb3h1d2NycGdybHFtY2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjAzMTAsImV4cCI6MjA4MDU5NjMxMH0.f3FhzJ4n3QPSoCp8YAUGS-WZQIDvHPLuJpgi_T6jkHg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
