import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, CardBody, Badge, Button, EmptyState } from '../../components/ui';

interface Watchlist {
    id: string;
    name: string;
    entity_count: number;
    alert_count: number;
    created_at: string;
    updated_at: string;
}

// Mock data
const mockWatchlists: Watchlist[] = [
    { id: '1', name: 'High Priority Persons', entity_count: 24, alert_count: 7, created_at: '2025-11-15T10:00:00Z', updated_at: '2026-01-01T18:30:00Z' },
    { id: '2', name: 'Fleet Vehicles', entity_count: 156, alert_count: 3, created_at: '2025-10-20T14:00:00Z', updated_at: '2026-01-01T12:00:00Z' },
    { id: '3', name: 'Investigation Alpha', entity_count: 8, alert_count: 12, created_at: '2025-12-01T09:00:00Z', updated_at: '2025-12-31T16:45:00Z' },
    { id: '4', name: 'Compliance Monitoring', entity_count: 42, alert_count: 0, created_at: '2025-09-10T11:00:00Z', updated_at: '2025-12-28T08:20:00Z' },
];

const Watchlists: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <PageHeader
                title="Watchlists"
                description="Manage collections of entities you want to monitor"
                actions={
                    <Button variant="primary" leftIcon={<span>+</span>}>
                        New Watchlist
                    </Button>
                }
            />

            {mockWatchlists.length === 0 ? (
                <Card>
                    <CardBody>
                        <EmptyState
                            icon={<span style={{ fontSize: '2rem' }}>👁️</span>}
                            title="No watchlists yet"
                            description="Create your first watchlist to start monitoring entities."
                            action={{ label: 'Create Watchlist', onClick: () => { } }}
                        />
                    </CardBody>
                </Card>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {mockWatchlists.map((watchlist) => (
                        <Card
                            key={watchlist.id}
                            hover
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/portal/watchlists/${watchlist.id}`)}
                        >
                            <CardBody>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {watchlist.name}
                                    </h3>
                                    {watchlist.alert_count > 0 && (
                                        <Badge variant="danger" dot size="sm">
                                            {watchlist.alert_count} alerts
                                        </Badge>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                            {watchlist.entity_count}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                            Entities
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: watchlist.alert_count > 0 ? 'var(--danger)' : 'var(--text-primary)' }}>
                                            {watchlist.alert_count}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                            Alerts
                                        </div>
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Last updated: {new Date(watchlist.updated_at).toLocaleDateString('en-GB')}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlists;
