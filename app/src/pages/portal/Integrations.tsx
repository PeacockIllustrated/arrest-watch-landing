import React from 'react';
import { PageHeader, Card, CardBody, Badge, Button } from '../../components/ui';
import { BoltIcon, DatabaseIcon, MessageIcon, BriefcaseIcon, LinkIcon, WrenchIcon } from '../../components/portal/Icons';

interface Integration {
    id: string;
    name: string;
    description: string;
    Icon: React.FC<{ size?: number; color?: string }>;
    status: 'connected' | 'available' | 'coming_soon';
    category: string;
}

const integrations: Integration[] = [
    { id: 'supabase', name: 'Supabase', description: 'Real-time database and authentication', Icon: BoltIcon, status: 'connected', category: 'Core' },
    { id: 'miami_dade', name: 'Miami-Dade ArcGIS', description: 'Miami-Dade County jail booking data', Icon: DatabaseIcon, status: 'available', category: 'Data Sources' },
    { id: 'orange_county', name: 'Orange County Sheriff', description: 'Orange County booking records', Icon: DatabaseIcon, status: 'available', category: 'Data Sources' },
    { id: 'slack', name: 'Slack', description: 'Send alerts to Slack channels', Icon: MessageIcon, status: 'available', category: 'Notifications' },
    { id: 'teams', name: 'Microsoft Teams', description: 'Send alerts to Teams channels', Icon: BriefcaseIcon, status: 'coming_soon', category: 'Notifications' },
    { id: 'webhook', name: 'Webhooks', description: 'Custom HTTP webhooks for alerts', Icon: LinkIcon, status: 'available', category: 'Developer' },
    { id: 'api', name: 'REST API', description: 'Programmatic access to your data', Icon: WrenchIcon, status: 'available', category: 'Developer' },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'default' | 'info' }> = {
    connected: { label: 'Connected', variant: 'success' },
    available: { label: 'Available', variant: 'default' },
    coming_soon: { label: 'Coming Soon', variant: 'info' },
};

const Integrations: React.FC = () => {
    const categories = [...new Set(integrations.map((i) => i.category))];

    return (
        <div>
            <PageHeader
                title="Integrations"
                description="Connect data sources and configure alert destinations"
            />

            {categories.map((category) => (
                <div key={category} style={{ marginBottom: '32px' }}>
                    <h2
                        style={{
                            fontFamily: 'var(--font-body, inherit)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '16px',
                        }}
                    >
                        {category}
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '16px',
                        }}
                    >
                        {integrations
                            .filter((i) => i.category === category)
                            .map((integration) => (
                                <Card key={integration.id} hover>
                                    <CardBody>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                            <div
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '0px',
                                                    background: 'var(--bg-elevated)',
                                                    border: '1px solid var(--border-subtle)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                <integration.Icon size={24} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-body, inherit)',
                                                        fontWeight: 600,
                                                        color: 'var(--text-primary)'
                                                    }}>
                                                        {integration.name}
                                                    </span>
                                                    <Badge
                                                        variant={statusConfig[integration.status].variant}
                                                        size="sm"
                                                        dot={integration.status === 'connected'}
                                                    >
                                                        {statusConfig[integration.status].label}
                                                    </Badge>
                                                </div>
                                                <p style={{
                                                    fontSize: '0.75rem',
                                                    color: 'var(--text-muted)',
                                                    margin: '0 0 12px 0',
                                                    lineHeight: 1.4
                                                }}>
                                                    {integration.description}
                                                </p>
                                                <Button
                                                    variant={integration.status === 'connected' ? 'secondary' : 'primary'}
                                                    size="sm"
                                                    disabled={integration.status === 'coming_soon'}
                                                >
                                                    {integration.status === 'connected' ? 'Configure' : integration.status === 'coming_soon' ? 'Coming Soon' : 'Connect'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                </div>
            ))}

            {/* TODO placeholder */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--info-muted)', borderRadius: '0px', border: '1px solid var(--info)' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body, inherit)',
                    textTransform: 'uppercase',
                    color: 'var(--info)'
                }}>
                    <strong>TODO:</strong> Implement OAuth flows and configuration modals for each integration
                </p>
            </div>
        </div>
    );
};

export default Integrations;

