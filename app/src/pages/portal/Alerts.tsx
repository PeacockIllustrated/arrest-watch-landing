import React, { useState } from 'react';
import { PageHeader, Card, CardBody, Badge, Button, Input, EmptyState } from '../../components/ui';
import { usePageTitle } from '../../hooks/usePageTitle';

type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
type AlertStatus = 'new' | 'acknowledged' | 'resolved';

interface Alert {
    id: string;
    entity_name: string;
    entity_type: string;
    alert_type: string;
    severity: AlertSeverity;
    status: AlertStatus;
    message: string;
    created_at: string;
}

// Mock data
const mockAlerts: Alert[] = [
    { id: '1', entity_name: 'John Michael Smith', entity_type: 'person', alert_type: 'Arrest', severity: 'critical', status: 'new', message: 'Subject arrested in Miami-Dade County', created_at: '2026-01-01T19:20:00Z' },
    { id: '2', entity_name: 'Jane Anne Doe', entity_type: 'person', alert_type: 'Booking', severity: 'high', status: 'new', message: 'Subject booked into Orange County Jail', created_at: '2026-01-01T19:05:00Z' },
    { id: '3', entity_name: 'FL ABC-1234', entity_type: 'vehicle', alert_type: 'Ping', severity: 'medium', status: 'acknowledged', message: 'Vehicle flagged in traffic stop', created_at: '2026-01-01T18:45:00Z' },
    { id: '4', entity_name: 'Robert James Wilson', entity_type: 'person', alert_type: 'Release', severity: 'low', status: 'resolved', message: 'Subject released on bond', created_at: '2026-01-01T17:30:00Z' },
    { id: '5', entity_name: 'Maria Garcia', entity_type: 'person', alert_type: 'Transfer', severity: 'medium', status: 'new', message: 'Subject transferred to federal custody', created_at: '2026-01-01T16:15:00Z' },
];

const severityConfig: Record<AlertSeverity, { color: string; badge: 'danger' | 'warning' | 'info' | 'default' }> = {
    critical: { color: 'var(--danger)', badge: 'danger' },
    high: { color: 'var(--warning)', badge: 'warning' },
    medium: { color: 'var(--info)', badge: 'info' },
    low: { color: 'var(--text-muted)', badge: 'default' },
};

const Alerts: React.FC = () => {
    usePageTitle('Alerts');
    const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | 'all'>('all');
    const [selectedStatus, setSelectedStatus] = useState<AlertStatus | 'all'>('all');

    const filteredAlerts = mockAlerts.filter((alert) => {
        if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false;
        if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false;
        return true;
    });

    return (
        <div>
            <PageHeader
                title="Alerts"
                description="Real-time notifications for entities on your watchlists"
                actions={
                    <Button variant="primary" leftIcon={<span>🔔</span>}>
                        Configure Alerts
                    </Button>
                }
            />

            {/* Filters */}
            <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <Input
                                placeholder="Search alerts..."
                                leftIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                }
                                fullWidth
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <select
                                value={selectedSeverity}
                                onChange={(e) => setSelectedSeverity(e.target.value as AlertSeverity | 'all')}
                                style={{
                                    padding: '8px 12px',
                                    background: 'var(--input-bg)',
                                    border: '1px solid var(--input-border)',
                                    borderRadius: '6px',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.875rem',
                                }}
                            >
                                <option value="all">All Severities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as AlertStatus | 'all')}
                                style={{
                                    padding: '8px 12px',
                                    background: 'var(--input-bg)',
                                    border: '1px solid var(--input-border)',
                                    borderRadius: '6px',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.875rem',
                                }}
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="acknowledged">Acknowledged</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Alerts List */}
            <Card>
                <CardBody cardPadding="0">
                    {filteredAlerts.length === 0 ? (
                        <EmptyState
                            icon={<span style={{ fontSize: '2rem' }}>🔔</span>}
                            title="No alerts found"
                            description="Adjust your filters or wait for new alerts to arrive."
                        />
                    ) : (
                        <div>
                            {filteredAlerts.map((alert, index) => (
                                <div
                                    key={alert.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '16px',
                                        padding: '16px 20px',
                                        borderBottom: index < filteredAlerts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.1s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sidebar-item-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    {/* Severity indicator */}
                                    <div
                                        style={{
                                            width: '4px',
                                            height: '48px',
                                            borderRadius: '2px',
                                            background: severityConfig[alert.severity].color,
                                            flexShrink: 0,
                                        }}
                                    />

                                    {/* Content */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                {alert.entity_name}
                                            </span>
                                            <Badge size="sm" variant={severityConfig[alert.severity].badge}>
                                                {alert.severity}
                                            </Badge>
                                            <Badge size="sm" variant={alert.status === 'new' ? 'accent' : 'default'}>
                                                {alert.status}
                                            </Badge>
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            {alert.message}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {alert.alert_type} • {new Date(alert.created_at).toLocaleString('en-GB')}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                        <Button size="sm" variant="ghost">View</Button>
                                        {alert.status === 'new' && (
                                            <Button size="sm" variant="secondary">Acknowledge</Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* TODO: Real-time subscription placeholder */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--info-muted)', borderRadius: '8px', border: '1px solid var(--info)' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--info)' }}>
                    <strong>TODO:</strong> Connect to Supabase Realtime for live alert updates
                </p>
            </div>
        </div>
    );
};

export default Alerts;
