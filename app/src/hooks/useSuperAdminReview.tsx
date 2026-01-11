import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useDeckHubAuth } from '../components/deckhub/DeckHubAuthContext';

/**
 * SUPER ADMIN REVIEW HOOK
 * 
 * Provides review mode functionality for super admins only.
 * Tracks checkbox status for Content, Design, Desktop, Mobile
 * for both Michael and Tom across all decks.
 * 
 * CRITICAL: All functions return early if user is not super_admin.
 * No DOM elements, no network requests for non-super-admins.
 */

type ReviewerName = 'MICHAEL' | 'TOM';
type CheckField = 'content_ok' | 'design_ok' | 'desktop_ok' | 'mobile_ok';

interface ReviewStatus {
    content_ok: boolean;
    design_ok: boolean;
    desktop_ok: boolean;
    mobile_ok: boolean;
}

interface DeckReviewState {
    MICHAEL: ReviewStatus;
    TOM: ReviewStatus;
}

const DEFAULT_REVIEW_STATUS: ReviewStatus = {
    content_ok: false,
    design_ok: false,
    desktop_ok: false,
    mobile_ok: false,
};

interface SuperAdminReviewContextType {
    isSuperAdmin: boolean;
    reviewModeEnabled: boolean;
    toggleReviewMode: () => void;
    getReviewStatus: (deckId: string) => DeckReviewState;
    setCheckbox: (deckId: string, reviewer: ReviewerName, field: CheckField, value: boolean) => Promise<void>;
    loading: boolean;
}

const SuperAdminReviewContext = createContext<SuperAdminReviewContextType | undefined>(undefined);

export const SuperAdminReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useDeckHubAuth();
    const isSuperAdmin = user?.role === 'super_admin';

    const [reviewModeEnabled, setReviewModeEnabled] = useState(false);
    const [reviewData, setReviewData] = useState<Map<string, DeckReviewState>>(new Map());
    const [loading, setLoading] = useState(true);

    // Fetch all review statuses (super_admin only)
    const fetchReviews = useCallback(async () => {
        // CRITICAL: Don't make any requests if not super admin
        if (!isSuperAdmin) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('super_admin_deck_reviews')
                .select('*');

            if (error) {
                // Table may not exist yet - fail silently
                console.warn('Error fetching super admin reviews:', error.message);
                setLoading(false);
                return;
            }

            // Build map from data
            const newMap = new Map<string, DeckReviewState>();

            data?.forEach(row => {
                const deckId = row.deck_id;
                const reviewer = row.reviewer_name as ReviewerName;

                if (!newMap.has(deckId)) {
                    newMap.set(deckId, {
                        MICHAEL: { ...DEFAULT_REVIEW_STATUS },
                        TOM: { ...DEFAULT_REVIEW_STATUS }
                    });
                }

                const deckState = newMap.get(deckId)!;
                deckState[reviewer] = {
                    content_ok: row.content_ok ?? false,
                    design_ok: row.design_ok ?? false,
                    desktop_ok: row.desktop_ok ?? false,
                    mobile_ok: row.mobile_ok ?? false,
                };
            });

            setReviewData(newMap);
        } catch (err) {
            console.warn('Error fetching super admin reviews:', err);
        } finally {
            setLoading(false);
        }
    }, [isSuperAdmin]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // Set up realtime subscription for sync between devices
    useEffect(() => {
        if (!isSuperAdmin) return;

        const channel = supabase
            .channel('super_admin_reviews')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'super_admin_deck_reviews'
                },
                () => {
                    // Refetch on any change
                    fetchReviews();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isSuperAdmin, fetchReviews]);

    const toggleReviewMode = useCallback(() => {
        if (!isSuperAdmin) return;
        setReviewModeEnabled(prev => !prev);
    }, [isSuperAdmin]);

    const getReviewStatus = useCallback((deckId: string): DeckReviewState => {
        return reviewData.get(deckId) ?? {
            MICHAEL: { ...DEFAULT_REVIEW_STATUS },
            TOM: { ...DEFAULT_REVIEW_STATUS }
        };
    }, [reviewData]);

    const setCheckbox = useCallback(async (
        deckId: string,
        reviewer: ReviewerName,
        field: CheckField,
        value: boolean
    ): Promise<void> => {
        // CRITICAL: Don't do anything if not super admin
        if (!isSuperAdmin) return;

        // Optimistically update local state
        setReviewData(prev => {
            const newMap = new Map(prev);
            const currentState = newMap.get(deckId) ?? {
                MICHAEL: { ...DEFAULT_REVIEW_STATUS },
                TOM: { ...DEFAULT_REVIEW_STATUS }
            };

            newMap.set(deckId, {
                ...currentState,
                [reviewer]: {
                    ...currentState[reviewer],
                    [field]: value
                }
            });

            return newMap;
        });

        try {
            // Upsert to Supabase
            const { error } = await supabase
                .from('super_admin_deck_reviews')
                .upsert({
                    deck_id: deckId,
                    reviewer_name: reviewer,
                    [field]: value
                }, {
                    onConflict: 'deck_id,reviewer_name'
                });

            if (error) {
                console.error('Error updating review checkbox:', error.message);
                // Revert on error
                fetchReviews();
            }
        } catch (err) {
            console.error('Error updating review checkbox:', err);
            fetchReviews();
        }
    }, [isSuperAdmin, fetchReviews]);

    return (
        <SuperAdminReviewContext.Provider value={{
            isSuperAdmin,
            reviewModeEnabled,
            toggleReviewMode,
            getReviewStatus,
            setCheckbox,
            loading
        }}>
            {children}
        </SuperAdminReviewContext.Provider>
    );
};

export const useSuperAdminReview = (): SuperAdminReviewContextType => {
    const context = useContext(SuperAdminReviewContext);
    if (!context) {
        // Return safe defaults if used outside provider (never happens for super admins)
        return {
            isSuperAdmin: false,
            reviewModeEnabled: false,
            toggleReviewMode: () => { },
            getReviewStatus: () => ({
                MICHAEL: { ...DEFAULT_REVIEW_STATUS },
                TOM: { ...DEFAULT_REVIEW_STATUS }
            }),
            setCheckbox: async () => { },
            loading: false
        };
    }
    return context;
};

export type { ReviewerName, CheckField, ReviewStatus, DeckReviewState };
export default SuperAdminReviewContext;
