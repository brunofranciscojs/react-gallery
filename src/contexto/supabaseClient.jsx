import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_ENDPOINT;
const supabaseKey = import.meta.env.VITE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);
