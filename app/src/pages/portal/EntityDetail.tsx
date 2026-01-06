import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, ComingSoon } from '../../components/ui';

type Tab = 'overview' | 'timeline' | 'notes' | 'links' | 'audit';

const mockEntity = {
    id: 'e1',
    type: 'person',
    display_name: 'John Michael Smith',
    metadata: {
        dob: '1985-03-15',
        aliases: ['Johnny Smith', 'J.M. Smith'],
        ssn_last4: '1234',
        addresses: ['1234 Main Street, Miami, FL 33101'],
    },
    created_at: '2025-10-01T10:00:00Z',
    last_activity: '2026-01-01T19:20:00Z',
    alert_count: 3,
    watchlist_count: 2,
};

const EntityDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    const tabs: { id: Tab; label: string }[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'notes', label: 'Notes' },
        { id: 'links', label: 'Links' },
        { id: 'audit', label: 'Audit' },
    ];

    const entity = mockEntity;

    return (
        <div>
            <PageHeader
                title={entity.display_name}
                breadcrumbs={[
                    { label: 'Entities', href: '/portal/entities' },
                    { label: entity.display_name },
                ]}
                actions={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="secondary" leftIcon={<span>➕</span>}>
                            Add to Watchlist
                        </Button>
                        <Button variant="primary" leftIcon={<span>✏️</span>}>
                            Edit
                        </Button>
                    </div>
                }
            />

            {/* Entity Summary */}
            <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                }}
                            >
                                👤
                            </div>
                            <div>
                                <Badge variant="accent" style={{ marginBottom: '4px' }}>Person</Badge>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    ID: {entity.id}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '32px' }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--danger)' }}>
                                    {entity.alert_count}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Alerts</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {entity.watchlist_count}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Watchlists</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                    {new Date(entity.last_activity).toLocaleDateString('en-GB')}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last Activity</div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Tabs */}
            <div
                style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border-default)',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 20px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? 500 : 400,
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <Card>
                        <CardHeader>Details</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        Date of Birth
                                    </div>
                                    <div style={{ color: 'var(--text-primary)' }}>{entity.metadata.dob}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        SSN (Last 4)
                                    </div>
                                    <div style={{ color: 'var(--text-primary)' }}>***-**-{entity.metadata.ssn_last4}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        Known Aliases
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {entity.metadata.aliases.map((alias) => (
                                            <Badge key={alias} size="sm">{alias}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        Addresses
                                    </div>
                                    {entity.metadata.addresses.map((addr, i) => (
                                        <div key={i} style={{ color: 'var(--text-primary)' }}>{addr}</div>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>Recent Alerts</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    { type: 'Arrest', date: '2026-01-01', severity: 'high' },
                                    { type: 'Booking', date: '2025-12-28', severity: 'medium' },
                                    { type: 'Release', date: '2025-12-15', severity: 'low' },
                                ].map((alert, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10px 12px',
                                            background: 'var(--bg-elevated)',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{alert.type}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.date}</div>
                                        </div>
                                        <Badge
                                            variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'default'}
                                            size="sm"
                                        >
                                            {alert.severity}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}

            {activeTab !== 'overview' && (
                <ComingSoon
                    title={`${tabs.find((t) => t.id === activeTab)?.label} Coming Soon`}
                    description={`The ${activeTab} feature is currently in development. Entity ID: ${id}`}
                />
            )}
        </div>
    );
};

export default EntityDetail;
