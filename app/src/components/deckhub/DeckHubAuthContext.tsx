import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

interface DeckHubUser {
    email: string;
    leadId: string;
}

interface DeckHubAuthContextType {
    user: DeckHubUser | null;
    isAuthenticated: boolean;
    accessibleDecks: string[];
    loading: boolean;
    login: (email: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    checkAccess: (deckId: string) => boolean;
}

const DeckHubAuthContext = createContext<DeckHubAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'arrestdelta_deck_user';

export const DeckHubAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<DeckHubUser | null>(null);
    const [accessibleDecks, setAccessibleDecks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as DeckHubUser;
                setUser(parsed);
                fetchAccessibleDecks(parsed.leadId);
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

    const login = async (email: string): Promise<{ success: boolean; message: string }> => {
        // Check if email exists in leads table
        const { data: leads, error } = await supabase
            .from('leads')
            .select('id, email, name')
            .eq('email', email.toLowerCase().trim())
            .limit(1);

        if (error) {
            return { success: false, message: 'System error. Please try again.' };
        }

        if (!leads || leads.length === 0) {
            return { success: false, message: 'Email not found. Please register your interest first.' };
        }

        const lead = leads[0];
        const deckUser: DeckHubUser = {
            email: lead.email,
            leadId: lead.id
        };

        setUser(deckUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(deckUser));

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
