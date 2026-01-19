import { createClient } from '@supabase/supabase-js';
// HMR trigger: 2026-01-18T19:12:50Z

// Load Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that required environment variables are present
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. ' +
        'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
    );
}

// Create Supabase client with NO session persistence
// Disabled to avoid session restoration blocking network requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,  // Disable - session restore was blocking requests
        autoRefreshToken: false,
        detectSessionInUrl: false,
    },
});

// Test connectivity on load (after short delay to allow auth restoration)
setTimeout(async () => {
    console.log('[Supabase] Testing connectivity to:', supabaseUrl);
    try {
        // First check session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('[Supabase] Session status:', session ? `Logged in as ${session.user.email}` : 'No session');

        // Then test DB connectivity
        const startTime = Date.now();
        const { data, error } = await supabase.from('escalations').select('count', { count: 'exact', head: true });
        const duration = Date.now() - startTime;
        if (error) {
            console.error('[Supabase] Connectivity test failed:', error.message);
        } else {
            console.log('[Supabase] Connectivity OK (' + duration + 'ms)');
        }
    } catch (err) {
        console.error('[Supabase] Connectivity test threw:', err);
    }
}, 500); // 500ms delay to allow auth restoration
