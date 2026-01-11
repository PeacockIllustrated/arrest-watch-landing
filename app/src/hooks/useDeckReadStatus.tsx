import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

/**
 * DECK READ STATUS CONTEXT
 * 
 * Tracks which decks users have opened and marked as read.
 * Syncs with Supabase table `user_deck_read_status`.
 */

interface DeckReadStatus {
    deck_id: string;
    opened_at: string | null;
    marked_read_at: string | null;
}

interface DeckReadStatusContextType {
    hasOpened: (deckId: string) => boolean;
    isRead: (deckId: string) => boolean;
    markOpened: (deckId: string) => Promise<void>;
    toggleRead: (deckId: string) => Promise<void>;
    loading: boolean;
}

const DeckReadStatusContext = createContext<DeckReadStatusContextType | undefined>(undefined);

export const DeckReadStatusProvider: React.FC<{ children: ReactNode; userId?: string }> = ({ children, userId }) => {
    const [statusMap, setStatusMap] = useState<Map<string, DeckReadStatus>>(new Map());
    const [loading, setLoading] = useState(true);

    const fetchStatuses = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('user_deck_read_status')
                .select('deck_id, opened_at, marked_read_at')
                .eq('user_id', userId);

            if (error) {
                // Table may not exist - fail silently
                console.warn('Error fetching deck read statuses:', error.message);
                setLoading(false);
                return;
            }

            const newMap = new Map<string, DeckReadStatus>();
            data?.forEach(row => {
                newMap.set(row.deck_id, row);
            });
            setStatusMap(newMap);
        } catch (err) {
            console.warn('Error fetching deck read statuses:', err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    const hasOpened = useCallback((deckId: string): boolean => {
        return statusMap.has(deckId) && statusMap.get(deckId)?.opened_at !== null;
    }, [statusMap]);

    const isRead = useCallback((deckId: string): boolean => {
        return statusMap.has(deckId) && statusMap.get(deckId)?.marked_read_at !== null;
    }, [statusMap]);

    const markOpened = useCallback(async (deckId: string): Promise<void> => {
        if (!userId) return;
        if (statusMap.has(deckId)) return;

        const now = new Date().toISOString();

        try {
            await supabase
                .from('user_deck_read_status')
                .insert({
                    user_id: userId,
                    deck_id: deckId,
                    opened_at: now,
                    marked_read_at: null,
                });

            setStatusMap(prev => {
                const newMap = new Map(prev);
                newMap.set(deckId, {
                    deck_id: deckId,
                    opened_at: now,
                    marked_read_at: null,
                });
                return newMap;
            });
        } catch (err) {
            console.warn('Error marking deck as opened:', err);
        }
    }, [userId, statusMap]);

    const toggleRead = useCallback(async (deckId: string): Promise<void> => {
        if (!userId) return;
        if (!hasOpened(deckId)) return;

        const currentStatus = statusMap.get(deckId);
        const isCurrentlyRead = currentStatus?.marked_read_at !== null;
        const newReadAt = isCurrentlyRead ? null : new Date().toISOString();

        try {
            await supabase
                .from('user_deck_read_status')
                .update({ marked_read_at: newReadAt })
                .eq('user_id', userId)
                .eq('deck_id', deckId);

            setStatusMap(prev => {
                const newMap = new Map(prev);
                const existing = newMap.get(deckId);
                if (existing) {
                    newMap.set(deckId, { ...existing, marked_read_at: newReadAt });
                }
                return newMap;
            });
        } catch (err) {
            console.warn('Error toggling deck read status:', err);
        }
    }, [userId, hasOpened, statusMap]);

    return (
        <DeckReadStatusContext.Provider value={{ hasOpened, isRead, markOpened, toggleRead, loading }}>
            {children}
        </DeckReadStatusContext.Provider>
    );
};

export const useDeckReadStatus = (): DeckReadStatusContextType => {
    const context = useContext(DeckReadStatusContext);
    if (!context) {
        return {
            hasOpened: () => false,
            isRead: () => false,
            markOpened: async () => { },
            toggleRead: async () => { },
            loading: false,
        };
    }
    return context;
};

export default DeckReadStatusContext;
