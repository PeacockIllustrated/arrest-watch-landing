/**
 * useDeckAccessRequests Hook
 * 
 * Tracks the current user's pending deck access requests.
 * Used to show "Requested" state on locked deck cards.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useDeckHubAuth } from '../components/deckhub/DeckHubAuthContext';

interface DeckAccessRequest {
    id: string;
    deck_id: string;
    status: 'pending' | 'approved' | 'denied';
    requested_at: string;
}

interface UseDeckAccessRequestsReturn {
    /** All requests for the current user */
    requests: DeckAccessRequest[];
    /** Loading state */
    loading: boolean;
    /** Check if a specific deck has a pending request */
    hasPendingRequest: (deckId: string) => boolean;
    /** Create a new access request for a deck */
    requestAccess: (deckId: string) => Promise<{ success: boolean; error?: string }>;
    /** Refresh requests from database */
    refresh: () => Promise<void>;
}

export const useDeckAccessRequests = (): UseDeckAccessRequestsReturn => {
    const { user, isAuthenticated } = useDeckHubAuth();
    const [requests, setRequests] = useState<DeckAccessRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all requests for current user
    const fetchRequests = useCallback(async () => {
        if (!user?.id) {
            setRequests([]);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('deck_access_requests')
                .select('id, deck_id, status, requested_at')
                .eq('user_id', user.id)
                .order('requested_at', { ascending: false });

            if (error) {
                console.error('Error fetching deck access requests:', error);
                setRequests([]);
            } else {
                setRequests(data || []);
            }
        } catch (err) {
            console.error('Error fetching deck access requests:', err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    // Initial fetch
    useEffect(() => {
        if (isAuthenticated) {
            fetchRequests();
        } else {
            setRequests([]);
            setLoading(false);
        }
    }, [isAuthenticated, fetchRequests]);

    // Check if a specific deck has a pending request
    const hasPendingRequest = useCallback((deckId: string): boolean => {
        return requests.some(r => r.deck_id === deckId && r.status === 'pending');
    }, [requests]);

    // Create a new access request
    const requestAccess = useCallback(async (deckId: string): Promise<{ success: boolean; error?: string }> => {
        if (!user?.id) {
            return { success: false, error: 'Not authenticated' };
        }

        // Check if request already exists
        const existing = requests.find(r => r.deck_id === deckId);
        if (existing) {
            return { success: false, error: 'Request already exists' };
        }

        try {
            const { data, error } = await supabase
                .from('deck_access_requests')
                .insert({
                    user_id: user.id,
                    deck_id: deckId,
                    status: 'pending'
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating deck access request:', error);
                return { success: false, error: error.message };
            }

            // Add to local state immediately for responsive UI
            if (data) {
                setRequests(prev => [...prev, data]);
            }

            return { success: true };
        } catch (err) {
            console.error('Error creating deck access request:', err);
            return { success: false, error: 'Failed to create request' };
        }
    }, [user?.id, requests]);

    return {
        requests,
        loading,
        hasPendingRequest,
        requestAccess,
        refresh: fetchRequests
    };
};

export default useDeckAccessRequests;
