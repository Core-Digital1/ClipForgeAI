import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdvczbswbwbghschjthq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdmN6YnN3YndiZ2hzY2hqdGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTcwNzIsImV4cCI6MjA3ODc3MzA3Mn0.LhiKgP0EWAANGJK7ocN8rbTBmEFttgTsCqwEzHzbezk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Redirect URL for email verification and password reset
export const getRedirectUrl = () => {
    // Use the current origin for redirects
    return window.location.origin + '/ClipForgeAI/';
};
