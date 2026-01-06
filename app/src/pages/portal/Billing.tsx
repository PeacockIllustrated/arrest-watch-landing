import React from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, ComingSoon } from '../../components/ui';

const Billing: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Billing"
                description="Manage your subscription and view invoices"
            />

            {/* Current Plan */}
            <Card style={{ marginBottom: '24px' }}>
                <CardHeader>Current Plan</CardHeader>
                <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    Professional
                                </span>
                                <Badge variant="success" dot>Active</Badge>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                Unlimited alerts, 50 entities, 10 watchlists, API access
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                $299
                                <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>/month</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Next billing: 1 Feb 2026
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
                        <Button variant="secondary">Change Plan</Button>
                        <Button variant="ghost">Cancel Subscription</Button>
                    </div>
                </CardBody>
            </Card>

            {/* Usage */}
            <Card style={{ marginBottom: '24px' }}>
                <CardHeader>Usage This Month</CardHeader>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                        {[
                            { label: 'Entities', used: 32, limit: 50, unit: '' },
                            { label: 'Watchlists', used: 8, limit: 10, unit: '' },
                            { label: 'API Calls', used: 12450, limit: 50000, unit: '' },
                            { label: 'Alerts Processed', used: 847, limit: null, unit: '' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                    {item.label}
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {item.used.toLocaleString()}
                                    {item.limit && (
                                        <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-muted)' }}>
                                            {' '}/ {item.limit.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                {item.limit && (
                                    <div
                                        style={{
                                            marginTop: '8px',
                                            height: '4px',
                                            background: 'var(--border-default)',
                                            borderRadius: '2px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${(item.used / item.limit) * 100}%`,
                                                background: item.used / item.limit > 0.8 ? 'var(--warning)' : 'var(--accent)',
                                                transition: 'width 0.3s ease',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Invoices */}
            <Card style={{ marginBottom: '24px' }}>
                <CardHeader>Recent Invoices</CardHeader>
                <CardBody cardPadding="0">
                    <div>
                        {[
                            { id: 'INV-2025-12', date: '1 Dec 2025', amount: '$299.00', status: 'paid' },
                            { id: 'INV-2025-11', date: '1 Nov 2025', amount: '$299.00', status: 'paid' },
                            { id: 'INV-2025-10', date: '1 Oct 2025', amount: '$299.00', status: 'paid' },
                        ].map((invoice) => (
                            <div
                                key={invoice.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '14px 20px',
                                    borderBottom: '1px solid var(--border-subtle)',
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{invoice.id}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{invoice.date}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{invoice.amount}</span>
                                    <Badge variant="success" size="sm">Paid</Badge>
                                    <Button size="sm" variant="ghost">Download</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            <ComingSoon
                title="Stripe Integration"
                description="Full billing management with Stripe including payment method updates, plan changes, and downloadable invoices."
            />
        </div>
    );
};

export default Billing;
