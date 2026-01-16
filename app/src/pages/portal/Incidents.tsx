import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, CardBody, Badge, Button, Input, EmptyState } from '../../components/ui';
import { LocationIcon, ListIcon, PersonIcon } from '../../components/portal/Icons';
import { usePageTitle } from '../../hooks/usePageTitle';

// =============================================================================
// TYPES - Ready for Supabase integration
// =============================================================================

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'acknowledged' | 'investigating' | 'resolved' | 'closed';
export type IncidentType = 'arrest' | 'booking' | 'traffic_violation' | 'warrant' | 'background_flag' | 'other';

export interface Incident {
    id: string;
    employee_id: string;
    employee_name: string;
    type: IncidentType;
    severity: IncidentSeverity;
    status: IncidentStatus;
    title: string;
    description: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    created_at: string;
    updated_at: string;
}

// =============================================================================
// MOCK DATA - Replace with Supabase query
// TODO: Connect to Supabase table `incidents`
// =============================================================================

const mockIncidents: Incident[] = [];

// =============================================================================
// CONFIGURATION
// =============================================================================

type ViewMode = 'list' | 'map' | 'timeline';

const severityConfig: Record<IncidentSeverity, { badge: 'danger' | 'warning' | 'info' | 'default'; color: string }> = {
    critical: { badge: 'danger', color: 'var(--danger)' },
    high: { badge: 'warning', color: 'var(--warning)' },
    medium: { badge: 'info', color: 'var(--info)' },
    low: { badge: 'default', color: 'var(--text-muted)' },
};

const statusConfig: Record<IncidentStatus, { badge: 'danger' | 'warning' | 'info' | 'success' | 'default'; label: string }> = {
    open: { badge: 'danger', label: 'Open' },
    acknowledged: { badge: 'warning', label: 'Acknowledged' },
    investigating: { badge: 'info', label: 'Investigating' },
    resolved: { badge: 'success', label: 'Resolved' },
    closed: { badge: 'default', label: 'Closed' },
};

const typeLabels: Record<IncidentType, string> = {
    arrest: 'Arrest',
    booking: 'Booking',
    traffic_violation: 'Traffic Violation',
    warrant: 'Warrant',
    background_flag: 'Background Flag',
    other: 'Other',
};

// =============================================================================
// COMPONENT
// =============================================================================

const Incidents: React.FC = () => {
    usePageTitle('Incidents');
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <div>
            <PageHeader
                title="Incidents"
                description="Track and manage arrest and compliance incidents across your workforce"
                actions={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="secondary">Export</Button>
                        <Button variant="primary" leftIcon={<span>+</span>}>
                            Report Incident
                        </Button>
                    </div>
                }
            />

            {/* View Toggle & Filters */}
            <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* View Mode Toggle */}
                        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-elevated)', padding: '4px', borderRadius: '6px' }}>
                            {(['list', 'map', 'timeline'] as ViewMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    style={{
                                        padding: '8px 16px',
                                        background: viewMode === mode ? 'var(--accent)' : 'transparent',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: viewMode === mode ? 'white' : 'var(--text-muted)',
                                        fontFamily: 'var(--font-body, inherit)',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {mode === 'list' ? 'List' : mode === 'map' ? 'Map' : 'Timeline'}
                                </button>
                            ))}
                        </div>

                        {/* Search & Filters */}
                        <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '600px' }}>
                            <Input
                                placeholder="Search incidents..."
                                leftIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                }
                                fullWidth
                            />
                            <select
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
                                <option value="open">Open</option>
                                <option value="acknowledged">Acknowledged</option>
                                <option value="investigating">Investigating</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                            <select
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
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Content based on view mode */}
            {viewMode === 'list' && (
                <Card>
                    <CardBody cardPadding="0">
                        {mockIncidents.length === 0 ? (
                            <EmptyState
                                icon={<ListIcon size={32} />}
                                title="No incidents found"
                                description="No incidents match your current filters."
                            />
                        ) : (
                            <div>
                                {mockIncidents.map((incident, index) => (
                                    <div
                                        key={incident.id}
                                        onClick={() => navigate(`/portal/incidents/${incident.id}`)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '16px',
                                            padding: '16px 20px',
                                            borderBottom: index < mockIncidents.length - 1 ? '1px solid var(--border-subtle)' : 'none',
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
                                                height: '60px',
                                                borderRadius: '2px',
                                                background: severityConfig[incident.severity].color,
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    {incident.title}
                                                </span>
                                                <Badge size="sm" variant={severityConfig[incident.severity].badge}>
                                                    {incident.severity}
                                                </Badge>
                                                <Badge size="sm" variant={statusConfig[incident.status].badge}>
                                                    {statusConfig[incident.status].label}
                                                </Badge>
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                {incident.description}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <PersonIcon size={12} /> {incident.employee_name}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <LocationIcon size={12} /> {incident.location}
                                                </span>
                                                <span>{typeLabels[incident.type]}</span>
                                                <span>{new Date(incident.created_at).toLocaleString('en-GB')}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                            <Button size="sm" variant="ghost">View</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}

            {viewMode === 'map' && (
                <Card>
                    <CardBody>
                        <div style={{
                            height: '400px',
                            background: 'var(--bg-elevated)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px dashed var(--border-default)',
                        }}>
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                <span style={{ color: 'var(--accent)' }}><LocationIcon size={48} /></span>
                                <p style={{ marginTop: '16px' }}>Map View</p>
                                <p style={{ fontSize: '0.875rem' }}>Incident locations will be displayed here</p>
                                <p style={{ fontSize: '0.75rem', marginTop: '8px' }}>TODO: Integrate with DeepMapViz component</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}

            {viewMode === 'timeline' && (
                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {mockIncidents.map((incident, index) => (
                                <div key={incident.id} style={{ display: 'flex', gap: '16px' }}>
                                    {/* Timeline line */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: severityConfig[incident.severity].color,
                                            border: '2px solid var(--bg-base)',
                                            zIndex: 1,
                                        }} />
                                        {index < mockIncidents.length - 1 && (
                                            <div style={{
                                                width: '2px',
                                                flex: 1,
                                                background: 'var(--border-default)',
                                                minHeight: '40px',
                                            }} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div
                                        style={{
                                            flex: 1,
                                            padding: '12px 16px',
                                            marginBottom: '16px',
                                            background: 'var(--bg-elevated)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate(`/portal/incidents/${incident.id}`)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{incident.title}</span>
                                            <Badge size="sm" variant={statusConfig[incident.status].badge}>{statusConfig[incident.status].label}</Badge>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {incident.employee_name} • {new Date(incident.created_at).toLocaleString('en-GB')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
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
                    <strong>TODO:</strong> Connect to Supabase `incidents` table with real-time subscription and integrate map view with DeepMapViz
                </p>
            </div>
        </div>
    );
};

export default Incidents;
