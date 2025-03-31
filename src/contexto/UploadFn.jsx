import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://utyaegtlratnhymumqjm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWFlZ3RscmF0bmh5bXVtcWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTU5MDUsImV4cCI6MjA1ODkzMTkwNX0.B2-GTy9rJPgGTmDeB70CwfzbbTTdocp-1QzRaMNDntQ');

export const uploadFn = async (file, category) => {
  const filePath = `${category}/${file.name}`;

  const { data, error } = await supabase.storage
    .from('ilutras')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  return data.path;
};
