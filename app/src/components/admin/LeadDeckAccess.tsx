import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DECKS, type Deck } from '../../lib/decks';

interface DeckAccess {
    deck_id: string;
    granted_at: string;
}

interface LeadDeckAccessProps {
    leadId: string;
    leadEmail: string;
}

const LeadDeckAccess: React.FC<LeadDeckAccessProps> = ({ leadId, leadEmail }) => {
    const [accessList, setAccessList] = useState<DeckAccess[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchAccess();
    }, [leadId]);

    const fetchAccess = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('user_deck_access')
            .select('deck_id, granted_at')
            .eq('lead_id', leadId);

        if (data) setAccessList(data);
        setLoading(false);
    };

    const hasAccess = (deckId: string): boolean => {
        return accessList.some(a => a.deck_id === deckId);
    };

    const toggleAccess = async (deck: Deck) => {
        setUpdating(deck.id);

        if (hasAccess(deck.id)) {
            // Revoke access
            const { error } = await supabase
                .from('user_deck_access')
                .delete()
                .eq('lead_id', leadId)
                .eq('deck_id', deck.id);

            if (!error) {
                setAccessList(prev => prev.filter(a => a.deck_id !== deck.id));
            }
        } else {
            // Grant access
            const { error } = await supabase
                .from('user_deck_access')
                .insert({
                    lead_id: leadId,
                    deck_id: deck.id,
                    granted_by: 'admin'
                });

            if (!error) {
                setAccessList(prev => [...prev, { deck_id: deck.id, granted_at: new Date().toISOString() }]);
            }
        }

        setUpdating(null);
    };

    const grantAll = async () => {
        setUpdating('all');
        const toGrant = DECKS.filter(d => !hasAccess(d.id));

        for (const deck of toGrant) {
            await supabase.from('user_deck_access').insert({
                lead_id: leadId,
                deck_id: deck.id,
                granted_by: 'admin'
            });
        }

        await fetchAccess();
        setUpdating(null);
    };

    const revokeAll = async () => {
        setUpdating('all');
        await supabase.from('user_deck_access').delete().eq('lead_id', leadId);
        setAccessList([]);
        setUpdating(null);
    };

    if (loading) {
        return (
            <div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
                SCANNING ACCESS MATRIX...
            </div>
        );
    }

    const investorDecks = DECKS.filter(d => d.category === 'investor');
    const partnerDecks = DECKS.filter(d => d.category === 'partner');

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #333'
            }}>
                <div>
                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>DECK ACCESS CONTROL</div>
                    <div style={{ color: '#e40028', fontSize: '0.9rem' }}>{leadEmail}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={grantAll}
                        disabled={updating === 'all'}
                        style={{
                            background: 'transparent',
                            border: '1px solid #4CAF50',
                            color: '#4CAF50',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            opacity: updating === 'all' ? 0.5 : 1
                        }}
                    >
                        GRANT ALL
                    </button>
                    <button
                        onClick={revokeAll}
                        disabled={updating === 'all'}
                        style={{
                            background: 'transparent',
                            border: '1px solid #e40028',
                            color: '#e40028',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            opacity: updating === 'all' ? 0.5 : 1
                        }}
                    >
                        REVOKE ALL
                    </button>
                </div>
            </div>

            {/* Investor Decks */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.75rem', letterSpacing: '1px' }}>
                    INVESTOR MATERIALS ({accessList.filter(a => investorDecks.some(d => d.id === a.deck_id)).length}/{investorDecks.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {investorDecks.map(deck => (
                        <DeckToggle
                            key={deck.id}
                            deck={deck}
                            isGranted={hasAccess(deck.id)}
                            isUpdating={updating === deck.id}
                            onToggle={() => toggleAccess(deck)}
                        />
                    ))}
                </div>
            </div>

            {/* Partner Decks */}
            <div>
                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.75rem', letterSpacing: '1px' }}>
                    PARTNER MATERIALS ({accessList.filter(a => partnerDecks.some(d => d.id === a.deck_id)).length}/{partnerDecks.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {partnerDecks.map(deck => (
                        <DeckToggle
                            key={deck.id}
                            deck={deck}
                            isGranted={hasAccess(deck.id)}
                            isUpdating={updating === deck.id}
                            onToggle={() => toggleAccess(deck)}
                        />
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#666'
            }}>
                <span>TOTAL ACCESS: {accessList.length}/{DECKS.length}</span>
                <span style={{ color: accessList.length > 0 ? '#4CAF50' : '#e40028' }}>
                    {accessList.length > 0 ? 'ACTIVE' : 'RESTRICTED'}
                </span>
            </div>
        </div>
    );
};

// Individual deck toggle row
interface DeckToggleProps {
    deck: Deck;
    isGranted: boolean;
    isUpdating: boolean;
    onToggle: () => void;
}

const DeckToggle: React.FC<DeckToggleProps> = ({ deck, isGranted, isUpdating, onToggle }) => (
    <div
        onClick={isUpdating ? undefined : onToggle}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: isGranted ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${isGranted ? '#4CAF50' : '#333'}`,
            cursor: isUpdating ? 'wait' : 'pointer',
            opacity: isUpdating ? 0.5 : 1,
            transition: 'all 0.2s'
        }}
    >
        <div>
            <div style={{ fontSize: '0.85rem', color: 'white', marginBottom: '0.2rem' }}>
                {deck.title}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>
                {deck.description.slice(0, 50)}...
            </div>
        </div>
        <div style={{
            width: '40px',
            height: '20px',
            background: isGranted ? '#4CAF50' : '#333',
            borderRadius: '10px',
            position: 'relative',
            transition: 'background 0.2s'
        }}>
            <div style={{
                position: 'absolute',
                top: '2px',
                left: isGranted ? '22px' : '2px',
                width: '16px',
                height: '16px',
                background: 'white',
                borderRadius: '50%',
                transition: 'left 0.2s'
            }} />
        </div>
    </div>
);

export default LeadDeckAccess;
