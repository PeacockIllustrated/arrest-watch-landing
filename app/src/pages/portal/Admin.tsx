import React from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge, ComingSoon } from '../../components/ui';
import { useRole } from '../../hooks/useRole';

const Admin: React.FC = () => {
    const { role } = useRole();

    return (
        <div>
            <PageHeader
                title="Admin Console"
                description="Organisation administration and system management"
            />

            <div style={{ marginBottom: '24px' }}>
                <Badge variant="accent">Your Role: {role}</Badge>
            </div>

            {/* Quick Stats */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px',
                }}
            >
                {[
                    { label: 'Total Users', value: '12', icon: '👥' },
                    { label: 'Active Sessions', value: '8', icon: '🔒' },
                    { label: 'API Requests (24h)', value: '4.2K', icon: '📊' },
                    { label: 'Alerts Processed (24h)', value: '847', icon: '🔔' },
                ].map((stat) => (
                    <Card key={stat.label} padding="md">
                        <CardBody>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Admin Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <Card>
                    <CardHeader>User Management</CardHeader>
                    <CardBody>
                        <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Manage organisation members, invite new users, and configure roles.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: 'John Admin', email: 'john@example.com', role: 'admin' },
                                { name: 'Jane Analyst', email: 'jane@example.com', role: 'analyst' },
                                { name: 'Bob Viewer', email: 'bob@example.com', role: 'viewer' },
                            ].map((user) => (
                                <div
                                    key={user.email}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '10px 12px',
                                        background: 'var(--bg-elevated)',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                                    </div>
                                    <Badge size="sm">{user.role}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>Roles & Permissions</CardHeader>
                    <CardBody>
                        <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Define what each role can access and modify.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { role: 'Owner', desc: 'Full access including billing and deletion', color: 'var(--danger)' },
                                { role: 'Admin', desc: 'Manage users, settings, and integrations', color: 'var(--warning)' },
                                { role: 'Analyst', desc: 'Create watchlists, reports, and cases', color: 'var(--info)' },
                                { role: 'Viewer', desc: 'Read-only access to all data', color: 'var(--text-muted)' },
                            ].map((r) => (
                                <div
                                    key={r.role}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px 12px',
                                        background: 'var(--bg-elevated)',
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${r.color}`,
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.role}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div style={{ marginTop: '32px', display: 'grid', gap: '24px' }}>
                <ComingSoon
                    title="Audit Logs"
                    description="View a complete audit trail of all actions taken in your organisation."
                />
                <ComingSoon
                    title="Feature Flags"
                    description="Enable or disable features for your organisation."
                />
            </div>
        </div>
    );
};

export default Admin;
