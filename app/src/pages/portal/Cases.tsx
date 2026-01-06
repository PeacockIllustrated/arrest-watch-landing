import React from 'react';
import { PageHeader, Card, CardBody, Badge, Button, EmptyState } from '../../components/ui';
import { FolderIcon } from '../../components/portal/Icons';

interface Case {
    id: string;
    name: string;
    status: 'open' | 'active' | 'closed';
    entity_count: number;
    alert_count: number;
    created_at: string;
    updated_at: string;
}

// Mock data
const mockCases: Case[] = [
    { id: 'c1', name: 'Operation Sunrise', status: 'active', entity_count: 12, alert_count: 5, created_at: '2025-11-01T10:00:00Z', updated_at: '2026-01-01T18:00:00Z' },
    { id: 'c2', name: 'Fleet Vehicle Monitoring', status: 'open', entity_count: 45, alert_count: 2, created_at: '2025-10-15T14:00:00Z', updated_at: '2025-12-30T09:00:00Z' },
    { id: 'c3', name: 'Compliance Audit Q4', status: 'closed', entity_count: 8, alert_count: 0, created_at: '2025-09-01T11:00:00Z', updated_at: '2025-12-31T16:00:00Z' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'default'; label: string }> = {
    open: { variant: 'warning', label: 'Open' },
    active: { variant: 'success', label: 'Active' },
    closed: { variant: 'default', label: 'Closed' },
};

const Cases: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Cases"
                description="Manage investigations and link related entities and alerts"
                actions={
                    <Button variant="primary" leftIcon={<span>+</span>}>
                        New Case
                    </Button>
                }
            />

            {mockCases.length === 0 ? (
                <Card>
                    <CardBody>
                        <EmptyState
                            icon={<FolderIcon size={32} />}
                            title="No cases yet"
                            description="Create your first case to start organising investigations."
                            action={{ label: 'Create Case', onClick: () => { } }}
                        />
                    </CardBody>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {mockCases.map((caseItem) => (
                        <Card key={caseItem.id} hover style={{ cursor: 'pointer' }}>
                            <CardBody>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                                                color: 'var(--accent)',
                                            }}
                                        >
                                            <FolderIcon size={24} />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <span style={{
                                                    fontFamily: 'var(--font-body, inherit)',
                                                    fontWeight: 600,
                                                    color: 'var(--text-primary)',
                                                    fontSize: '1rem'
                                                }}>
                                                    {caseItem.name}
                                                </span>
                                                <Badge variant={statusConfig[caseItem.status].variant} size="sm">
                                                    {statusConfig[caseItem.status].label}
                                                </Badge>
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                fontFamily: 'var(--font-body, inherit)',
                                                color: 'var(--text-muted)',
                                                textTransform: 'uppercase'
                                            }}>
                                                {caseItem.entity_count} entities • Updated {new Date(caseItem.updated_at).toLocaleDateString('en-GB')}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        {caseItem.alert_count > 0 && (
                                            <Badge variant="danger" dot>
                                                {caseItem.alert_count} alerts
                                            </Badge>
                                        )}
                                        <Button size="sm" variant="ghost">Open →</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            {/* TODO placeholder */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--info-muted)', borderRadius: '0px', border: '1px solid var(--info)' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body, inherit)',
                    textTransform: 'uppercase',
                    color: 'var(--info)'
                }}>
                    <strong>TODO:</strong> Implement case detail view with entity linking and timeline
                </p>
            </div>
        </div>
    );
};

export default Cases;

