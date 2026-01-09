import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * SECURITY NOTE: This authentication is for deck access only.
 * It uses email + password verification against the leads table.
 * 
 * For higher security requirements, consider:
 * - Using Supabase Auth for full authentication
 * - Adding rate limiting on login attempts
 * - Implementing password hashing
 */

interface DeckHubUser {
    email: string;
    leadId: string;
    name?: string;
}

interface StoredSession {
    user: DeckHubUser;
    expiresAt: number; // Unix timestamp
}

interface DeckHubAuthContextType {
    user: DeckHubUser | null;
    isAuthenticated: boolean;
    accessibleDecks: string[];
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    checkAccess: (deckId: string) => boolean;
}

const DeckHubAuthContext = createContext<DeckHubAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'arrestdelta_deck_user';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const DeckHubAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<DeckHubUser | null>(null);
    const [accessibleDecks, setAccessibleDecks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount (with expiration check)
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const session = JSON.parse(stored) as StoredSession;

                // Check if session has expired
                if (session.expiresAt && Date.now() > session.expiresAt) {
                    console.warn('Deck hub session expired, clearing...');
                    localStorage.removeItem(STORAGE_KEY);
                    setLoading(false);
                    return;
                }

                // Session is valid
                setUser(session.user);
                fetchAccessibleDecks(session.user.leadId);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchAccessibleDecks = async (leadId: string) => {
        const { data } = await supabase
            .from('user_deck_access')
            .select('deck_id')
            .eq('lead_id', leadId);

        if (data) {
            setAccessibleDecks(data.map(d => d.deck_id));
        }
        setLoading(false);
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
        // Normalize email to prevent case-sensitivity issues
        const normalizedEmail = email.toLowerCase().trim();

        // Check if email exists in leads table with matching password
        const { data: leads, error } = await supabase
            .from('leads')
            .select('id, email, name, password')
            .eq('email', normalizedEmail)
            .limit(1);

        if (error) {
            console.error('Login error:', error.message);
            return { success: false, message: 'System error. Please try again.' };
        }

        // Generic error message to prevent enumeration
        if (!leads || leads.length === 0) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const lead = leads[0];

        // Check if password matches
        if (!lead.password || lead.password !== password) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const deckUser: DeckHubUser = {
            email: lead.email,
            leadId: lead.id,
            name: lead.name
        };

        // Store session with expiration
        const session: StoredSession = {
            user: deckUser,
            expiresAt: Date.now() + SESSION_DURATION_MS
        };

        setUser(deckUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

        // Fetch accessible decks
        await fetchAccessibleDecks(lead.id);

        return { success: true, message: 'Access granted.' };
    };

    const logout = () => {
        setUser(null);
        setAccessibleDecks([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const checkAccess = (deckId: string): boolean => {
        return accessibleDecks.includes(deckId);
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
                checkAccess
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
