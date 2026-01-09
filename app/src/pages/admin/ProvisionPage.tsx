import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DECKS } from '../../lib/decks';
import { usePageTitle } from '../../hooks/usePageTitle';

interface ProvisionedUser {
    id: string;
    email: string;
    name: string;
    organization: string;
    password: string;
    decks: string[];
    created_at: string;
}

// Generate a random password
const generatePassword = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

const ProvisionPage: React.FC = () => {
    usePageTitle('Provision Access');
    // Form state
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedDecks, setSelectedDecks] = useState<string[]>([]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<ProvisionedUser | null>(null);
    const [recentProvisions, setRecentProvisions] = useState<ProvisionedUser[]>([]);
    const [copied, setCopied] = useState(false);

    // Fetch recent provisions on mount
    useEffect(() => {
        fetchRecentProvisions();
    }, []);

    const fetchRecentProvisions = async () => {
        const { data: leads } = await supabase
            .from('leads')
            .select('id, email, name, organization, created_at')
            .not('password', 'is', null)
            .order('created_at', { ascending: false })
            .limit(5);

        if (leads) {
            // Fetch deck access for each lead
            const provisioned: ProvisionedUser[] = [];
            for (const lead of leads) {
                const { data: access } = await supabase
                    .from('user_deck_access')
                    .select('deck_id')
                    .eq('lead_id', lead.id);

                provisioned.push({
                    ...lead,
                    password: '••••••••',
                    decks: access?.map(a => a.deck_id) || []
                });
            }
            setRecentProvisions(provisioned);
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

    const handleGeneratePassword = () => {
        setPassword(generatePassword());
        setShowPassword(true);
    };

    const handleCopyCredentials = () => {
        if (success) {
            const text = `ArrestDelta Deck Access\n\nEmail: ${success.email}\nPassword: ${success.password}\n\nLogin at: ${window.location.origin}/decks`;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!password) {
            setError('Password is required');
            setLoading(false);
            return;
        }

        try {
            const normalizedEmail = email.toLowerCase().trim();

            // Check if lead already exists
            const { data: existingLeads } = await supabase
                .from('leads')
                .select('id')
                .eq('email', normalizedEmail)
                .limit(1);

            let leadId: number;

            if (existingLeads && existingLeads.length > 0) {
                // Update existing lead
                leadId = existingLeads[0].id;
                await supabase
                    .from('leads')
                    .update({
                        name,
                        organization: organization || null,
                        password
                    })
                    .eq('id', leadId);

                // Clear existing deck access to replace with new selection
                await supabase
                    .from('user_deck_access')
                    .delete()
                    .eq('lead_id', leadId);
            } else {
                // Create new lead
                const { data: newLead, error: leadError } = await supabase
                    .from('leads')
                    .insert({
                        email: normalizedEmail,
                        name,
                        organization: organization || null,
                        password,
                        source: 'admin_provision'
                    })
                    .select('id')
                    .single();

                if (leadError) throw new Error(leadError.message);
                leadId = newLead.id;
            }

            // Grant deck access
            if (selectedDecks.length > 0) {
                const deckAccessRecords = selectedDecks.map(deckId => ({
                    lead_id: leadId,
                    deck_id: deckId,
                    granted_by: 'admin'
                }));

                const { error: accessError } = await supabase
                    .from('user_deck_access')
                    .insert(deckAccessRecords);

                if (accessError) throw new Error(accessError.message);
            }

            // Success!
            const provisionedUser: ProvisionedUser = {
                id: String(leadId),
                email: normalizedEmail,
                name,
                organization: organization || '',
                password,
                decks: selectedDecks,
                created_at: new Date().toISOString()
            };

            setSuccess(provisionedUser);
            setRecentProvisions(prev => [{ ...provisionedUser, password: '••••••••' }, ...prev.slice(0, 4)]);

            // Reset form
            setEmail('');
            setName('');
            setOrganization('');
            setPassword('');
            setSelectedDecks([]);
            setShowPassword(false);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to provision user');
        } finally {
            setLoading(false);
        }
    };

    const getDeckTitle = (deckId: string): string => {
        return DECKS.find(d => d.id === deckId)?.title || deckId;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>
                PROVISION INVESTOR ACCESS
            </h2>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: 0 }}>
                Create site and deck access for investors and partners. Share the login credentials with them.
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
                        NEW INVESTOR
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                                EMAIL *
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="investor@company.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid #333',
                                    color: 'white',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>
                                    PASSWORD *
                                </label>
                                <button
                                    type="button"
                                    onClick={handleGeneratePassword}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#e40028',
                                        fontSize: '0.7rem',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    GENERATE
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        paddingRight: '3rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid #333',
                                        color: 'white',
                                        fontFamily: 'inherit',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#666',
                                        cursor: 'pointer',
                                        fontSize: '0.7rem',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    {showPassword ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                                NAME *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Smith"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid #333',
                                    color: 'white',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>

                        {/* Organization */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                                ORGANIZATION
                            </label>
                            <input
                                type="text"
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                placeholder="Acme Ventures"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid #333',
                                    color: 'white',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>

                        {/* Deck Access */}
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
                                        GRANT ALL
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
                                        CLEAR
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.5rem',
                                padding: '0.75rem',
                                background: 'rgba(0, 0, 0, 0.2)',
                                border: '1px solid #222'
                            }}>
                                {DECKS.map((deck) => (
                                    <label
                                        key={deck.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            background: selectedDecks.includes(deck.id)
                                                ? 'rgba(228, 0, 40, 0.1)'
                                                : 'transparent',
                                            border: selectedDecks.includes(deck.id)
                                                ? '1px solid rgba(228, 0, 40, 0.3)'
                                                : '1px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedDecks.includes(deck.id)}
                                            onChange={() => handleDeckToggle(deck.id)}
                                            style={{ accentColor: '#e40028' }}
                                        />
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: selectedDecks.includes(deck.id) ? 'white' : '#888'
                                        }}>
                                            {deck.title}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

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
                            disabled={loading}
                            style={{
                                padding: '1rem',
                                background: loading ? '#333' : '#e40028',
                                border: 'none',
                                color: 'white',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                letterSpacing: '1px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            {loading ? 'PROVISIONING...' : 'PROVISION ACCESS'}
                        </button>
                    </form>
                </div>

                {/* Success / Recent Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Success Message with Credentials */}
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
                                ✓ ACCESS PROVISIONED
                            </div>
                            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
                                <strong>{success.name}</strong>
                            </div>
                            {success.organization && (
                                <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '1rem' }}>
                                    {success.organization}
                                </div>
                            )}

                            {/* Credentials Box */}
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                border: '1px solid #333',
                                padding: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    marginBottom: '0.5rem',
                                    letterSpacing: '1px'
                                }}>
                                    LOGIN CREDENTIALS
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div>
                                        <span style={{ color: '#888', fontSize: '0.75rem' }}>Email: </span>
                                        <span style={{ color: 'white', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                                            {success.email}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#888', fontSize: '0.75rem' }}>Password: </span>
                                        <span style={{ color: '#e40028', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                                            {success.password}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopyCredentials}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: copied ? '#2a5a2a' : 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid #333',
                                    color: copied ? 'white' : '#888',
                                    fontFamily: 'inherit',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY CREDENTIALS'}
                            </button>

                            <div style={{
                                fontSize: '0.75rem',
                                color: '#666',
                                borderTop: '1px solid #2a5a2a',
                                paddingTop: '1rem',
                                marginTop: '1rem'
                            }}>
                                DECKS: {success.decks.length > 0
                                    ? success.decks.map(getDeckTitle).join(', ')
                                    : 'None'}
                            </div>
                        </div>
                    )}

                    {/* Recent Provisions */}
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
                            RECENT PROVISIONS
                        </div>

                        {recentProvisions.length === 0 ? (
                            <div style={{ color: '#666', fontSize: '0.85rem' }}>
                                No provisions yet
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {recentProvisions.map((user) => (
                                    <div
                                        key={user.id}
                                        style={{
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            borderLeft: '3px solid #e40028'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.25rem'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '0.85rem' }}>
                                                {user.name}
                                            </span>
                                            <span style={{ color: '#666', fontSize: '0.7rem' }}>
                                                {user.decks.length} deck{user.decks.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div style={{ color: '#888', fontSize: '0.75rem' }}>
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
