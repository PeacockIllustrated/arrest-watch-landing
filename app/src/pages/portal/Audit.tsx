import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, EmptyState } from '../../components/ui';
import { CheckIcon, EditIcon, XIcon, EyeIcon, DocumentIcon, UserIcon, BoltIcon, ListIcon } from '../../components/portal/Icons';

// =============================================================================
// TYPES - Ready for Supabase integration
// =============================================================================

type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'export' | 'login' | 'logout' | 'assign' | 'escalate';
type AuditTarget = 'employee' | 'incident' | 'alert' | 'case' | 'report' | 'risk_factor' | 'user' | 'settings';

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    actor_id: string;
    actor_name: string;
    actor_email: string;
    action: AuditAction;
    target_type: AuditTarget;
    target_id: string;
    target_name: string;
    metadata: Record<string, unknown>;
    ip_address: string;
}

// =============================================================================
// MOCK DATA - Replace with Supabase query
// TODO: Connect to Supabase table `audit_logs`
// =============================================================================

const mockAuditLogs: AuditLogEntry[] = [
    { id: 'log-001', timestamp: '2026-01-02T10:30:00Z', actor_id: 'user-001', actor_name: 'Jane Admin', actor_email: 'jane@company.com', action: 'update', target_type: 'employee', target_id: 'emp-001', target_name: 'John Michael Smith', metadata: { field: 'risk_level', old_value: 'medium', new_value: 'high' }, ip_address: '192.168.1.100' },
    { id: 'log-002', timestamp: '2026-01-02T10:15:00Z', actor_id: 'system', actor_name: 'System', actor_email: 'system@arrestdelta.com', action: 'create', target_type: 'incident', target_id: 'inc-001', target_name: 'DUI Arrest - Miami-Dade County', metadata: { source: 'automated_scan' }, ip_address: '0.0.0.0' },
    { id: 'log-003', timestamp: '2026-01-02T09:45:00Z', actor_id: 'user-002', actor_name: 'Bob Analyst', actor_email: 'bob@company.com', action: 'export', target_type: 'report', target_id: 'rpt-001', target_name: 'Weekly Activity Summary', metadata: { format: 'PDF' }, ip_address: '192.168.1.105' },
    { id: 'log-004', timestamp: '2026-01-02T09:30:00Z', actor_id: 'user-001', actor_name: 'Jane Admin', actor_email: 'jane@company.com', action: 'assign', target_type: 'case', target_id: 'case-001', target_name: 'Operation Sunrise', metadata: { assigned_to: 'Bob Analyst' }, ip_address: '192.168.1.100' },
    { id: 'log-005', timestamp: '2026-01-02T09:00:00Z', actor_id: 'user-003', actor_name: 'Alice Manager', actor_email: 'alice@company.com', action: 'login', target_type: 'user', target_id: 'user-003', target_name: 'Alice Manager', metadata: { method: 'SSO' }, ip_address: '192.168.1.110' },
    { id: 'log-006', timestamp: '2026-01-01T18:00:00Z', actor_id: 'user-001', actor_name: 'Jane Admin', actor_email: 'jane@company.com', action: 'escalate', target_type: 'incident', target_id: 'inc-001', target_name: 'DUI Arrest - Miami-Dade County', metadata: { reason: 'Critical severity' }, ip_address: '192.168.1.100' },
    { id: 'log-007', timestamp: '2026-01-01T17:30:00Z', actor_id: 'user-002', actor_name: 'Bob Analyst', actor_email: 'bob@company.com', action: 'view', target_type: 'employee', target_id: 'emp-004', target_name: 'Maria Garcia', metadata: {}, ip_address: '192.168.1.105' },
    { id: 'log-008', timestamp: '2026-01-01T16:00:00Z', actor_id: 'user-001', actor_name: 'Jane Admin', actor_email: 'jane@company.com', action: 'update', target_type: 'risk_factor', target_id: 'rf-001', target_name: 'Recent Arrest', metadata: { field: 'weight', old_value: 90, new_value: 95 }, ip_address: '192.168.1.100' },
];

// =============================================================================
// ICONS - On-brand SVG icons for actions
// =============================================================================

const ActionIcons: Record<AuditAction, React.ReactNode> = {
    create: <CheckIcon size={12} />,
    update: <EditIcon size={12} />,
    delete: <XIcon size={12} />,
    view: <EyeIcon size={12} />,
    export: <DocumentIcon size={12} />,
    login: <CheckIcon size={12} />,
    logout: <XIcon size={12} />,
    assign: <UserIcon size={12} />,
    escalate: <BoltIcon size={12} />,
};

// =============================================================================
// CONFIGURATION
// =============================================================================

const actionConfig: Record<AuditAction, { label: string; color: string }> = {
    create: { label: 'Created', color: 'var(--success)' },
    update: { label: 'Updated', color: 'var(--info)' },
    delete: { label: 'Deleted', color: 'var(--danger)' },
    view: { label: 'Viewed', color: 'var(--text-muted)' },
    export: { label: 'Exported', color: 'var(--warning)' },
    login: { label: 'Logged In', color: 'var(--success)' },
    logout: { label: 'Logged Out', color: 'var(--text-muted)' },
    assign: { label: 'Assigned', color: 'var(--info)' },
    escalate: { label: 'Escalated', color: 'var(--danger)' },
};

const targetLabels: Record<AuditTarget, string> = {
    employee: 'Employee',
    incident: 'Incident',
    alert: 'Alert',
    case: 'Case',
    report: 'Report',
    risk_factor: 'Risk Factor',
    user: 'User',
    settings: 'Settings',
};

// =============================================================================
// COMPONENT
// =============================================================================

const Audit: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<AuditAction | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLogs = mockAuditLogs.filter((log) => {
        if (selectedAction !== 'all' && log.action !== selectedAction) return false;
        if (searchQuery && !log.actor_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !log.target_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div>
            <PageHeader
                title="Audit & Compliance"
                description="Complete audit trail of all actions in your organization"
                actions={
                    <Button variant="secondary" leftIcon={<DocumentIcon size={16} />}>
                        Export Logs
                    </Button>
                }
            />

            {/* Filters */}
            <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <Input
                                placeholder="Search by actor or target..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                }
                                fullWidth
                            />
                        </div>
                        <select
                            value={selectedAction}
                            onChange={(e) => setSelectedAction(e.target.value as AuditAction | 'all')}
                            style={{
                                padding: '8px 12px',
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                borderRadius: '6px',
                                color: 'var(--text-primary)',
                                fontSize: '0.875rem',
                            }}
                        >
                            <option value="all">All Actions</option>
                            {Object.entries(actionConfig).map(([key, value]) => (
                                <option key={key} value={key}>{value.label}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            style={{
                                padding: '8px 12px',
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                borderRadius: '6px',
                                color: 'var(--text-primary)',
                                fontSize: '0.875rem',
                            }}
                            placeholder="Start Date"
                        />
                        <input
                            type="date"
                            style={{
                                padding: '8px 12px',
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                borderRadius: '6px',
                                color: 'var(--text-primary)',
                                fontSize: '0.875rem',
                            }}
                            placeholder="End Date"
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Audit Log Table */}
            <Card>
                <CardHeader>
                    Audit Logs ({filteredLogs.length} entries)
                </CardHeader>
                <CardBody cardPadding="0">
                    {filteredLogs.length === 0 ? (
                        <EmptyState
                            icon={<ListIcon size={32} />}
                            title="No logs found"
                            description="No audit logs match your current filters."
                        />
                    ) : (
                        <div>
                            {/* Table Header */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '180px 150px 120px 1fr 120px',
                                    gap: '16px',
                                    padding: '12px 20px',
                                    borderBottom: '1px solid var(--border-default)',
                                    fontFamily: 'var(--font-body, inherit)',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                <div>Timestamp</div>
                                <div>Actor</div>
                                <div>Action</div>
                                <div>Target</div>
                                <div>IP Address</div>
                            </div>

                            {/* Table Rows */}
                            {filteredLogs.map((log, index) => (
                                <div
                                    key={log.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '180px 150px 120px 1fr 120px',
                                        gap: '16px',
                                        padding: '14px 20px',
                                        alignItems: 'center',
                                        borderBottom: index < filteredLogs.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                    }}
                                >
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {new Date(log.timestamp).toLocaleString('en-GB')}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                                            {log.actor_name}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {log.actor_email}
                                        </div>
                                    </div>
                                    <div>
                                        <Badge
                                            size="sm"
                                            style={{
                                                background: `${actionConfig[log.action].color}20`,
                                                color: actionConfig[log.action].color,
                                                border: `1px solid ${actionConfig[log.action].color}`,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                        >
                                            {ActionIcons[log.action]} {actionConfig[log.action].label}
                                        </Badge>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                                            {log.target_name}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {targetLabels[log.target_type]}
                                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                <span> • {JSON.stringify(log.metadata)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                        {log.ip_address}
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
                    <strong>TODO:</strong> Connect to Supabase `audit_logs` table with pagination, date range filtering, and CSV export
                </p>
            </div>
        </div>
    );
};

export default Audit;
