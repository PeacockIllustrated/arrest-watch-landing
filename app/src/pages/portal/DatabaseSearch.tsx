import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, EmptyState } from '../../components/ui';

// =============================================================================
// TYPES - Ready for Supabase/API integration
// =============================================================================

export interface DatabaseRecord {
    id: string;
    name: string;
    dob: string;
    aliases: string[];
    last_known_address: string;
    arrest_count: number;
    last_arrest_date: string | null;
    warrant_status: 'none' | 'active' | 'cleared';
    risk_score: number;
}

// =============================================================================
// MOCK DATA - Replace with API query
// TODO: Connect to criminal database API
// =============================================================================

const mockResults: DatabaseRecord[] = [
    { id: 'rec-001', name: 'John Michael Smith', dob: '1985-03-15', aliases: ['Johnny Smith', 'J.M. Smith'], last_known_address: '1234 Main St, Miami, FL', arrest_count: 3, last_arrest_date: '2026-01-01', warrant_status: 'none', risk_score: 72 },
    { id: 'rec-002', name: 'John Smith Jr', dob: '1992-08-22', aliases: ['John S.'], last_known_address: '456 Oak Ave, Orlando, FL', arrest_count: 1, last_arrest_date: '2024-06-15', warrant_status: 'none', risk_score: 35 },
    { id: 'rec-003', name: 'Jonathan M. Smith', dob: '1978-11-30', aliases: [], last_known_address: '789 Palm Blvd, Tampa, FL', arrest_count: 5, last_arrest_date: '2025-11-20', warrant_status: 'active', risk_score: 89 },
];

// =============================================================================
// COMPONENT
// =============================================================================

const DatabaseSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSearch = () => {
        if (query.trim()) {
            setHasSearched(true);
            // TODO: Implement actual search
        }
    };

    const getRiskColor = (score: number) => {
        if (score >= 70) return 'var(--danger)';
        if (score >= 40) return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <div>
            <PageHeader
                title="Database Search"
                description="Search criminal records and background databases"
            />

            {/* Search Input */}
            <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter name, SSN (last 4), DOB, or license number..."
                                leftIcon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                }
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSearch();
                                }}
                            />
                        </div>
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>

                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        {showAdvanced ? '− Hide Advanced Filters' : '+ Show Advanced Filters'}
                    </button>

                    {showAdvanced && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px',
                            marginTop: '16px',
                            padding: '16px',
                            background: 'var(--bg-elevated)',
                            borderRadius: '6px',
                        }}>
                            <Input label="Date of Birth" placeholder="YYYY-MM-DD" />
                            <Input label="SSN (Last 4)" placeholder="1234" />
                            <Input label="State" placeholder="FL" />
                            <Input label="County" placeholder="Miami-Dade" />
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                    Record Type
                                </label>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        background: 'var(--input-bg)',
                                        border: '1px solid var(--input-border)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <option value="all">All Records</option>
                                    <option value="arrests">Arrests Only</option>
                                    <option value="warrants">Warrants Only</option>
                                    <option value="traffic">Traffic Violations</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                    Date Range
                                </label>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        background: 'var(--input-bg)',
                                        border: '1px solid var(--input-border)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <option value="all">All Time</option>
                                    <option value="1y">Last Year</option>
                                    <option value="5y">Last 5 Years</option>
                                    <option value="10y">Last 10 Years</option>
                                </select>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Results Area */}
            <Card>
                <CardHeader>
                    {hasSearched ? `Search Results (${mockResults.length} found)` : 'Search Results'}
                </CardHeader>
                <CardBody cardPadding={hasSearched ? "0" : undefined}>
                    {!hasSearched ? (
                        <EmptyState
                            icon={
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                </svg>
                            }
                            title="Search Criminal Databases"
                            description="Enter a name, SSN, date of birth, or license number to search across connected criminal databases and public records."
                        />
                    ) : mockResults.length === 0 ? (
                        <EmptyState
                            icon={<span style={{ fontSize: '2rem' }}>📭</span>}
                            title="No results found"
                            description={`No records matching "${query}" were found. Try adjusting your search terms or filters.`}
                        />
                    ) : (
                        <div>
                            {mockResults.map((record, index) => (
                                <div
                                    key={record.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '16px',
                                        padding: '16px 20px',
                                        borderBottom: index < mockResults.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.1s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sidebar-item-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    {/* Risk Score */}
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: `${getRiskColor(record.risk_score)}20`,
                                            border: `2px solid ${getRiskColor(record.risk_score)}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            color: getRiskColor(record.risk_score),
                                            flexShrink: 0,
                                        }}
                                    >
                                        {record.risk_score}
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                {record.name}
                                            </span>
                                            {record.warrant_status === 'active' && (
                                                <Badge variant="danger" size="sm">ACTIVE WARRANT</Badge>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            DOB: {record.dob} • {record.last_known_address}
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            <span>Arrests: {record.arrest_count}</span>
                                            {record.last_arrest_date && <span>Last Arrest: {record.last_arrest_date}</span>}
                                            {record.aliases.length > 0 && <span>Aliases: {record.aliases.join(', ')}</span>}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                        <Button size="sm" variant="secondary">View Record</Button>
                                        <Button size="sm" variant="ghost">Add to Employee</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* TODO placeholder */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--info-muted)', borderRadius: '0px', border: '1px solid var(--info)' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body, inherit)',
                    textTransform: 'uppercase',
                    color: 'var(--info)'
                }}>
                    <strong>TODO:</strong> Connect to criminal database API with fuzzy matching, result ranking, and record detail modal
                </p>
            </div>
        </div>
    );
};

export default DatabaseSearch;
