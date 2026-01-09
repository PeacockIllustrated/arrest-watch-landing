import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * DECK HUB AUTH CONTEXT
 * 
 * This context provides authentication state for the Deck Hub.
 * It uses Supabase Auth for user authentication and checks the
 * user_deck_access table for deck-level permissions.
 * 
 * Flow:
 * 1. User signs up/signs in via SiteGatePage (Supabase Auth)
 * 2. Once authenticated, they can access the Deck Hub
 * 3. Deck access is controlled by entries in user_deck_access table
 * 4. Admins provision deck access via the admin panel
 */

interface DeckHubUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface DeckHubAuthContextType {
    user: DeckHubUser | null;
    isAuthenticated: boolean;
    accessibleDecks: string[];
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
    checkAccess: (deckId: string) => boolean;
    refreshDeckAccess: () => Promise<void>;
}

const DeckHubAuthContext = createContext<DeckHubAuthContextType | undefined>(undefined);

export const DeckHubAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<DeckHubUser | null>(null);
    const [accessibleDecks, setAccessibleDecks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch accessible decks and role for the current user
    const fetchUserData = async (userId: string, email?: string, name?: string) => {
        try {
            // 1. Fetch Deck Access
            const { data: deckData, error: deckError } = await supabase
                .from('user_deck_access')
                .select('deck_id')
                .eq('user_id', userId);

            if (deckError) {
                console.error('Error fetching deck access:', deckError.message);
                setAccessibleDecks([]);
            } else if (deckData) {
                setAccessibleDecks(deckData.map(d => d.deck_id));
            }

            // 2. Fetch User Role from Profiles
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            // Only set user once we have the role (or default to viewer if error/missing)
            setUser({
                id: userId,
                email: email || '',
                name: name,
                role: profileData?.role || 'viewer'
            });

        } catch (err) {
            console.error('Error fetching user data:', err);
            setAccessibleDecks([]);
            // Still set user even if extra data fails
            setUser({
                id: userId,
                email: email || '',
                name: name,
                role: 'viewer'
            });
        }
    };

    // Initialize auth state from Supabase session
    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const { data: { session: currentSession }, error } = await supabase.auth.getSession();

                if (!mounted) return;

                if (error) {
                    console.warn('Error getting session:', error.message);
                    setLoading(false);
                    return;
                }

                if (currentSession?.user) {
                    await fetchUserData(
                        currentSession.user.id,
                        currentSession.user.email,
                        currentSession.user.user_metadata?.name
                    );
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                if (!mounted) return;

                if (newSession?.user) {
                    await fetchUserData(
                        newSession.user.id,
                        newSession.user.email,
                        newSession.user.user_metadata?.name
                    );
                } else {
                    setUser(null);
                    setAccessibleDecks([]);
                }

                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setAccessibleDecks([]);
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return { success: false, message: error.message };
            }

            if (data.user) {
                await fetchUserData(
                    data.user.id,
                    data.user.email,
                    data.user.user_metadata?.name
                );
                return { success: true, message: 'Access granted' };
            }

            return { success: false, message: 'Login failed' };
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, message: 'An unexpected error occurred' };
        }
    };

    const checkAccess = (deckId: string): boolean => {
        return accessibleDecks.includes(deckId);
    };

    const refreshDeckAccess = async () => {
        if (user?.id) {
            await fetchUserData(user.id, user.email, user.name);
        }
    };

    return (
        <DeckHubAuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                accessibleDecks,
                loading,
                login,
                logout,
                checkAccess,
                refreshDeckAccess
            }}
        >
            {children}
        </DeckHubAuthContext.Provider>
    );
};

export const useDeckHubAuth = (): DeckHubAuthContextType => {
    const context = useContext(DeckHubAuthContext);
    if (!context) {
        throw new Error('useDeckHubAuth must be used within a DeckHubAuthProvider');
    }
    return context;
};

export default DeckHubAuthContext;
