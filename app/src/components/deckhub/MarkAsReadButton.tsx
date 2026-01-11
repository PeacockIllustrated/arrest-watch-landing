import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

/**
 * MARK AS READ BUTTON
 * 
 * Simple, elegant button at the end of deck pages:
 * - Hover: Green highlight appears
 * - Click: Smooth transition to "← DATA ROOM"
 * - Click again: Marks as read + navigates back
 */

interface MarkAsReadButtonProps {
    deckId: string;
}

const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({ deckId }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMarking, setIsMarking] = useState(false);
    const navigate = useNavigate();

    // Check if already read on mount
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user?.id) return;

                // Use maybeSingle() instead of single() to handle no rows gracefully
                const { data } = await supabase
                    .from('user_deck_read_status')
                    .select('marked_read_at')
                    .eq('user_id', session.user.id)
                    .eq('deck_id', deckId)
                    .maybeSingle();

                if (data?.marked_read_at) {
                    setIsConfirmed(true);
                }
            } catch {
                // Ignore errors - table may not exist yet
            }
        };
        checkStatus();
    }, [deckId]);

    const handleClick = async () => {
        if (!isConfirmed) {
            // First click: transition to confirmed state
            setIsConfirmed(true);
            return;
        }

        // Second click: mark as read and navigate
        if (isMarking) return;
        setIsMarking(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
                const userId = session.user.id;
                const now = new Date().toISOString();

                // Check if row exists first
                const { data: existing } = await supabase
                    .from('user_deck_read_status')
                    .select('deck_id')
                    .eq('user_id', userId)
                    .eq('deck_id', deckId)
                    .maybeSingle();

                if (existing) {
                    // Update existing row
                    await supabase
                        .from('user_deck_read_status')
                        .update({ marked_read_at: now })
                        .eq('user_id', userId)
                        .eq('deck_id', deckId);
                } else {
                    // Insert new row
                    await supabase
                        .from('user_deck_read_status')
                        .insert({
                            user_id: userId,
                            deck_id: deckId,
                            opened_at: now,
                            marked_read_at: now,
                        });
                }
            }
        } catch (err) {
            console.warn('Failed to mark as read:', err);
        }

        // Navigate regardless of success
        navigate('/decks');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isMarking}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: isConfirmed
                    ? 'transparent'
                    : isHovered
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'transparent',
                border: isConfirmed
                    ? '1px solid var(--color-alert-red)'
                    : isHovered
                        ? '1px solid #4CAF50'
                        : '1px solid #444',
                color: isConfirmed
                    ? 'var(--color-alert-red)'
                    : isHovered
                        ? '#4CAF50'
                        : '#888',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                cursor: isMarking ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isHovered && !isConfirmed
                    ? '0 0 20px rgba(76, 175, 80, 0.2)'
                    : isConfirmed
                        ? '0 0 20px rgba(228, 0, 40, 0.2)'
                        : 'none',
            }}
        >
            {isConfirmed ? (
                <>
                    <span>←</span>
                    <span>{isMarking ? 'SAVING...' : 'DATA ROOM'}</span>
                </>
            ) : (
                <>
                    {/* Checkmark icon on hover */}
                    <span style={{
                        width: '18px',
                        height: '18px',
                        border: `2px solid ${isHovered ? '#4CAF50' : '#555'}`,
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        background: isHovered ? '#4CAF50' : 'transparent',
                    }}>
                        {isHovered && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </span>
                    <span>MARK AS READ</span>
                </>
            )}
        </button>
    );
};

export default MarkAsReadButton;
