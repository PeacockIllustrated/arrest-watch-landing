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

    // Fetch accessible decks for the current user
    const fetchAccessibleDecks = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_deck_access')
                .select('deck_id')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching deck access:', error.message);
                setAccessibleDecks([]);
                return;
            }

            if (data) {
                setAccessibleDecks(data.map(d => d.deck_id));
            }
        } catch (err) {
            console.error('Error fetching deck access:', err);
            setAccessibleDecks([]);
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
                    setUser({
                        id: currentSession.user.id,
                        email: currentSession.user.email || '',
                        name: currentSession.user.user_metadata?.name
                    });
                    await fetchAccessibleDecks(currentSession.user.id);
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
                    setUser({
                        id: newSession.user.id,
                        email: newSession.user.email || '',
                        name: newSession.user.user_metadata?.name
                    });
                    await fetchAccessibleDecks(newSession.user.id);
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
                setUser({
                    id: data.user.id,
                    email: data.user.email || '',
                    name: data.user.user_metadata?.name
                });
                await fetchAccessibleDecks(data.user.id);
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
            await fetchAccessibleDecks(user.id);
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
