import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase project credentials
const SUPABASE_URL = 'https://mgctwvaexqtubvtwpbzj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_abgUhRWPAlXzIpkJ_GL7IA_dPrLaf0_';

// Create and export the Supabase client
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);