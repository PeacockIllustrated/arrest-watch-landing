import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * DECK PAGE WRAPPER
 * 
 * Wraps deck pages to automatically track when a user opens a deck.
 * Self-contained - gets user ID directly from Supabase auth.
 */

interface DeckPageWrapperProps {
    deckId: string;
    children: React.ReactNode;
}

const DeckPageWrapper: React.FC<DeckPageWrapperProps> = ({ deckId, children }) => {
    const [hasTracked, setHasTracked] = useState(false);

    useEffect(() => {
        const trackDeckOpened = async () => {
            if (hasTracked) return;

            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user?.id) return;

                const userId = session.user.id;

                // Use maybeSingle() to handle no rows gracefully
                const { data: existing } = await supabase
                    .from('user_deck_read_status')
                    .select('deck_id')
                    .eq('user_id', userId)
                    .eq('deck_id', deckId)
                    .maybeSingle();

                if (existing) {
                    setHasTracked(true);
                    return;
                }

                // Insert new tracking record
                await supabase
                    .from('user_deck_read_status')
                    .insert({
                        user_id: userId,
                        deck_id: deckId,
                        opened_at: new Date().toISOString(),
                        marked_read_at: null,
                    });

                setHasTracked(true);
            } catch (err) {
                // Silently fail - non-critical tracking
                console.warn('Error tracking deck open:', err);
            }
        };

        trackDeckOpened();
    }, [deckId, hasTracked]);

    return <>{children}</>;
};

export default DeckPageWrapper;
