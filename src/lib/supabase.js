import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgoaydvrlelrwompqjph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb2F5ZHZybGVscndvbXBxanBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjM2MzcsImV4cCI6MjA4NTA5OTYzN30.WGIJPXxL0QhBo3TpcTf8bNX9YMbVEtZztX1NtToZXRM';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: window.sessionStorage
    }
});

// Redirect URL for email verification and password reset
export const getRedirectUrl = () => {
    // Use the current origin for redirects
    return window.location.origin + '/ClipForgeAI/';
};
