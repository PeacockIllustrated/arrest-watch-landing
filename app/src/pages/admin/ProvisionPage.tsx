import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DECKS } from '../../lib/decks';
import { usePageTitle } from '../../hooks/usePageTitle';

interface ProvisionedAccess {
    email: string;
    decks: string[];
    grantedAt: string;
}

interface UserWithAccess {
    id: string;
    email: string;
    name: string | null;
    created_at: string;
    decks: string[];
}

// Toggle Switch Component
const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}> = ({ checked, onChange, disabled }) => (
    <div
        onClick={disabled ? undefined : onChange}
        style={{
            width: '36px',
            height: '20px',
            background: checked ? '#e40028' : '#333',
            borderRadius: '10px',
            position: 'relative',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            opacity: disabled ? 0.5 : 1,
            flexShrink: 0
        }}
    >
        <div
            style={{
                width: '16px',
                height: '16px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: checked ? '18px' : '2px',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
        />
    </div>
);

const ProvisionPage: React.FC = () => {
    usePageTitle('Provision Access');

    // Form state
    const [email, setEmail] = useState('');
    const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
    const [existingAccess, setExistingAccess] = useState<string[]>([]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<ProvisionedAccess | null>(null);
    const [recentUsers, setRecentUsers] = useState<UserWithAccess[]>([]);
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [checkingUser, setCheckingUser] = useState(false);

    // Fetch recent provisioned users on mount
    useEffect(() => {
        fetchRecentUsers();
    }, []);

    const fetchRecentUsers = async () => {
        try {
            const { data, error } = await supabase
                .rpc('get_recent_users_with_access', { p_limit: 10 });

            if (error) {
                console.error('Error fetching recent users:', error);
                return;
            }

            if (data) {
                const usersWithAccess: UserWithAccess[] = data.map((user: { user_id: string; email: string; name: string | null; created_at: string; deck_count: number }) => ({
                    id: user.user_id,
                    email: user.email,
                    name: user.name,
                    created_at: user.created_at,
                    decks: Array(user.deck_count).fill('')
                }));
                setRecentUsers(usersWithAccess);
            }
        } catch (err) {
            console.error('Error fetching recent users:', err);
        }
    };

    const handleDeckToggle = (deckId: string) => {
        setSelectedDecks(prev =>
            prev.includes(deckId)
                ? prev.filter(d => d !== deckId)
                : [...prev, deckId]
        );
    };

    const handleGrantAll = () => {
        setSelectedDecks(DECKS.map(d => d.id));
    };

    const handleClearAll = () => {
        setSelectedDecks([]);
    };

    // Check if user exists and fetch their current deck access
    const checkUserAndFetchAccess = async (emailToCheck: string) => {
        if (!emailToCheck.trim() || !emailToCheck.includes('@')) {
            setUserExists(null);
            setExistingAccess([]);
            setSelectedDecks([]);
            return;
        }

        setCheckingUser(true);
        try {
            const normalizedEmail = emailToCheck.toLowerCase().trim();

            // Check if user exists
            const { data: exists, error: existsError } = await supabase
                .rpc('check_user_exists', { p_email: normalizedEmail });

            if (existsError) {
                console.error('Error checking user:', existsError);
                setUserExists(null);
                setExistingAccess([]);
                return;
            }

            setUserExists(exists);

            if (exists) {
                // Fetch their existing deck access
                const { data: accessData, error: accessError } = await supabase
                    .rpc('get_user_deck_access', { p_email: normalizedEmail });

                if (accessError) {
                    console.error('Error fetching deck access:', accessError);
                    setExistingAccess([]);
                    setSelectedDecks([]);
                } else if (accessData) {
                    const deckIds = accessData.map((item: { deck_id: string }) => item.deck_id);
                    setExistingAccess(deckIds);
                    setSelectedDecks(deckIds); // Pre-select their existing access
                } else {
                    setExistingAccess([]);
                    setSelectedDecks([]);
                }
            } else {
                setExistingAccess([]);
                setSelectedDecks([]);
            }
        } catch (err) {
            console.error('Error checking user:', err);
            setUserExists(null);
            setExistingAccess([]);
        } finally {
            setCheckingUser(false);
        }
    };

    // Debounce email check
    useEffect(() => {
        const timer = setTimeout(() => {
            checkUserAndFetchAccess(email);
        }, 500);

        return () => clearTimeout(timer);
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const normalizedEmail = email.toLowerCase().trim();

        // Find decks to grant (newly selected) and revoke (deselected from existing)
        const decksToGrant = selectedDecks.filter(d => !existingAccess.includes(d));
        const decksToRevoke = existingAccess.filter(d => !selectedDecks.includes(d));

        if (decksToGrant.length === 0 && decksToRevoke.length === 0) {
            setError('No changes to apply');
            setLoading(false);
            return;
        }

        try {
            // Grant new access
            for (const deckId of decksToGrant) {
                const { error } = await supabase
                    .rpc('grant_deck_access_by_email', {
                        p_email: normalizedEmail,
                        p_deck_id: deckId,
                        p_granted_by: 'admin'
                    });

                if (error) {
                    throw new Error(`Failed to grant access to ${deckId}: ${error.message}`);
                }
            }

            // Revoke removed access
            for (const deckId of decksToRevoke) {
                const { error } = await supabase
                    .rpc('revoke_deck_access_by_email', {
                        p_email: normalizedEmail,
                        p_deck_id: deckId
                    });

                if (error) {
                    throw new Error(`Failed to revoke access to ${deckId}: ${error.message}`);
                }
            }

            // Success!
            setSuccess({
                email: normalizedEmail,
                decks: selectedDecks,
                grantedAt: new Date().toISOString()
            });

            // Update existing access to match current selection
            setExistingAccess(selectedDecks);

            // Refresh the recent users list
            fetchRecentUsers();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update access');
        } finally {
            setLoading(false);
        }
    };

    const getDeckTitle = (deckId: string): string => {
        return DECKS.find(d => d.id === deckId)?.title || deckId;
    };

    // Calculate changes for display
    const newlyGranted = selectedDecks.filter(d => !existingAccess.includes(d));
    const toBeRevoked = existingAccess.filter(d => !selectedDecks.includes(d));
    const hasChanges = newlyGranted.length > 0 || toBeRevoked.length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>
                PROVISION DECK ACCESS
            </h2>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: 0 }}>
                Grant or revoke deck access for registered users. Users must sign up at the site gate first.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form Section */}
                <div style={{
                    border: '1px solid #333',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        color: '#888',
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid #333'
                    }}>
                        MANAGE ACCESS
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                                USER EMAIL *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="user@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        paddingRight: '6rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: userExists === false
                                            ? '1px solid #e40028'
                                            : userExists === true
                                                ? '1px solid #4CAF50'
                                                : '1px solid #333',
                                        color: 'white',
                                        fontFamily: 'inherit',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.65rem',
                                    fontFamily: 'inherit'
                                }}>
                                    {checkingUser && (
                                        <span style={{ color: '#666' }}>CHECKING...</span>
                                    )}
                                    {!checkingUser && userExists === true && (
                                        <span style={{ color: '#4CAF50' }}>✓ REGISTERED</span>
                                    )}
                                    {!checkingUser && userExists === false && (
                                        <span style={{ color: '#e40028' }}>✗ NOT FOUND</span>
                                    )}
                                </div>
                            </div>
                            {userExists === false && (
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: '#e40028',
                                    marginTop: '0.5rem'
                                }}>
                                    This user hasn't signed up yet. They need to register at /gate first.
                                </div>
                            )}
                            {userExists && existingAccess.length > 0 && (
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: '#4CAF50',
                                    marginTop: '0.5rem'
                                }}>
                                    User has access to {existingAccess.length} deck{existingAccess.length !== 1 ? 's' : ''}
                                </div>
                            )}
                        </div>

                        {/* Deck Access with Toggle Switches */}
                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem'
                            }}>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>
                                    DECK ACCESS
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={handleGrantAll}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#e40028',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        ALL ON
                                    </button>
                                    <span style={{ color: '#333' }}>|</span>
                                    <button
                                        type="button"
                                        onClick={handleClearAll}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#666',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        ALL OFF
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                padding: '0.75rem',
                                background: 'rgba(0, 0, 0, 0.2)',
                                border: '1px solid #222'
                            }}>
                                {DECKS.map((deck) => {
                                    const isSelected = selectedDecks.includes(deck.id);
                                    const hadAccess = existingAccess.includes(deck.id);
                                    const isNewGrant = isSelected && !hadAccess;
                                    const isRevoke = !isSelected && hadAccess;

                                    return (
                                        <div
                                            key={deck.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '0.6rem 0.75rem',
                                                background: isNewGrant
                                                    ? 'rgba(76, 175, 80, 0.1)'
                                                    : isRevoke
                                                        ? 'rgba(228, 0, 40, 0.1)'
                                                        : 'transparent',
                                                border: isNewGrant
                                                    ? '1px solid rgba(76, 175, 80, 0.3)'
                                                    : isRevoke
                                                        ? '1px solid rgba(228, 0, 40, 0.3)'
                                                        : '1px solid #222',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{
                                                    fontSize: '0.8rem',
                                                    color: isSelected ? 'white' : '#666'
                                                }}>
                                                    {deck.title}
                                                </span>
                                                {isNewGrant && (
                                                    <span style={{
                                                        fontSize: '0.6rem',
                                                        color: '#4CAF50',
                                                        background: 'rgba(76, 175, 80, 0.2)',
                                                        padding: '0.15rem 0.4rem',
                                                        borderRadius: '2px'
                                                    }}>
                                                        + NEW
                                                    </span>
                                                )}
                                                {isRevoke && (
                                                    <span style={{
                                                        fontSize: '0.6rem',
                                                        color: '#e40028',
                                                        background: 'rgba(228, 0, 40, 0.2)',
                                                        padding: '0.15rem 0.4rem',
                                                        borderRadius: '2px'
                                                    }}>
                                                        - REMOVE
                                                    </span>
                                                )}
                                            </div>
                                            <ToggleSwitch
                                                checked={isSelected}
                                                onChange={() => handleDeckToggle(deck.id)}
                                                disabled={!userExists}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Changes Summary */}
                        {hasChanges && userExists && (
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid #333',
                                fontSize: '0.75rem'
                            }}>
                                <div style={{ color: '#888', marginBottom: '0.5rem' }}>PENDING CHANGES:</div>
                                {newlyGranted.length > 0 && (
                                    <div style={{ color: '#4CAF50' }}>
                                        + Granting: {newlyGranted.map(getDeckTitle).join(', ')}
                                    </div>
                                )}
                                {toBeRevoked.length > 0 && (
                                    <div style={{ color: '#e40028' }}>
                                        - Revoking: {toBeRevoked.map(getDeckTitle).join(', ')}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(228, 0, 40, 0.1)',
                                border: '1px solid #e40028',
                                color: '#e40028',
                                fontSize: '0.85rem'
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !userExists || !hasChanges}
                            style={{
                                padding: '1rem',
                                background: (loading || !userExists || !hasChanges) ? '#333' : '#e40028',
                                border: 'none',
                                color: 'white',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                letterSpacing: '1px',
                                cursor: (loading || !userExists || !hasChanges) ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            {loading ? 'UPDATING...' : hasChanges ? 'APPLY CHANGES' : 'NO CHANGES'}
                        </button>
                    </form>
                </div>

                {/* Success / Info Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Success Message */}
                    {success && (
                        <div style={{
                            border: '1px solid #2a5a2a',
                            background: 'rgba(42, 90, 42, 0.1)',
                            padding: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                color: '#4a9a4a',
                                marginBottom: '1rem'
                            }}>
                                ✓ ACCESS UPDATED
                            </div>
                            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
                                <strong>{success.email}</strong>
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#666',
                                marginTop: '1rem'
                            }}>
                                Now has access to {success.decks.length} deck{success.decks.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    )}

                    {/* How it works */}
                    <div style={{
                        border: '1px solid #333',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            letterSpacing: '1px',
                            color: '#888',
                            marginBottom: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid #333'
                        }}>
                            HOW IT WORKS
                        </div>
                        <ol style={{
                            margin: 0,
                            padding: '0 0 0 1.25rem',
                            color: '#888',
                            fontSize: '0.8rem',
                            lineHeight: 1.8
                        }}>
                            <li>User signs up at <code style={{ color: '#e40028' }}>/gate</code></li>
                            <li>Enter their email above to see current access</li>
                            <li>Toggle decks ON/OFF as needed</li>
                            <li>Click "Apply Changes" to update</li>
                            <li>User refreshes deck hub to see changes</li>
                        </ol>
                    </div>

                    {/* Recent Users */}
                    <div style={{
                        border: '1px solid #333',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            letterSpacing: '1px',
                            color: '#888',
                            marginBottom: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid #333'
                        }}>
                            RECENT USERS
                        </div>

                        {recentUsers.length === 0 ? (
                            <div style={{ color: '#666', fontSize: '0.85rem' }}>
                                No users yet
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {recentUsers.slice(0, 5).map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => setEmail(user.email)}
                                        style={{
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            borderLeft: user.decks.length > 0
                                                ? '3px solid #4CAF50'
                                                : '3px solid #333',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.25rem'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '0.85rem' }}>
                                                {user.name || user.email}
                                            </span>
                                            <span style={{ color: '#666', fontSize: '0.7rem' }}>
                                                {user.decks.length} deck{user.decks.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div style={{ color: '#888', fontSize: '0.7rem' }}>
                                            {user.email}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProvisionPage;
