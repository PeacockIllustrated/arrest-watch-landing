import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge } from '../../components/ui';
import DeepMapViz from '../../components/visuals/DeepMapViz';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useDemoSim } from '../../context/DemoSimContext';
import { JURISDICTION_MAP } from '../../lib/demo/demoJurisdictions';
import type { ChangeEvent } from '../../lib/contracts/pipeline';

// =============================================================================
// DASHBOARD - "Pulse" Home for Uber Demo
// =============================================================================

// Event type labels
const EVENT_TYPE_LABELS: Record<ChangeEvent['eventType'], string> = {
    booking_created: 'New Booking',
    charge_updated: 'Charge Updated',
    custody_status_changed: 'Status Changed',
    release_detected: 'Release Detected',
};

// Confidence badge variant
function getConfidenceBadgeVariant(confidence: number): 'success' | 'warning' | 'danger' | 'default' {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'danger';
}

// Format relative time
function formatRelativeTime(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

const Dashboard: React.FC = () => {
    usePageTitle('Pulse Dashboard');

    const sim = useDemoSim();
    const [selectedEvent, setSelectedEvent] = useState<ChangeEvent | null>(null);

    // KPI calculations
    const totalMonitored = sim.coverageByCounty.reduce((sum, c) => sum + c.monitoredCount, 0);
    const alertCount = sim.events.length;
    const confidenceBands = {
        high: sim.events.filter((e) => e.confidence >= 80).length,
        medium: sim.events.filter((e) => e.confidence >= 60 && e.confidence < 80).length,
        low: sim.events.filter((e) => e.confidence < 60).length,
    };
    const topCoverageCounties = [...sim.coverageByCounty]
        .sort((a, b) => b.monitoredCount - a.monitoredCount)
        .slice(0, 3);

    // Handle event click
    const handleEventClick = (event: ChangeEvent) => {
        setSelectedEvent(event);
        sim.pulse(event.jurisdictionId);
    };

    // Get county name
    const getCountyName = (jurisdictionId: string): string => {
        return JURISDICTION_MAP[jurisdictionId]?.displayName || jurisdictionId;
    };

    return (
        <div>
            <PageHeader
                title="Pulse Dashboard"
                description="Real-time monitoring activity and change intelligence"
            />

            {/* Sim Mode Control Bar */}
            <Card style={{ marginBottom: '16px' }}>
                <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    onClick={() => (sim.isOn ? sim.stop() : sim.start())}
                                    style={{
                                        padding: '8px 16px',
                                        background: sim.isOn ? 'var(--danger)' : 'var(--accent)',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        cursor: 'pointer',
                                        borderRadius: '2px',
                                    }}
                                >
                                    {sim.isOn ? 'Stop Sim' : 'Start Sim'}
                                </button>
                                <button
                                    onClick={sim.reset}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'transparent',
                                        border: '1px solid var(--border-default)',
                                        color: 'var(--text-muted)',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        borderRadius: '2px',
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                            {sim.isOn && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: 'var(--accent)',
                                            animation: 'pulse 1.5s infinite',
                                        }}
                                    />
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Sim Mode Live
                                    </span>
                                </div>
                            )}
                        </div>
                        {sim.events.length > 0 && (
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                Last event: {formatRelativeTime(sim.events[0].createdAtISO)}
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* KPI Cards Row */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                }}
                className="kpi-grid"
            >
                <Card padding="md">
                    <CardBody>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            Active Monitoring
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {totalMonitored}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            individuals across {sim.coverageByCounty.length} counties
                        </div>
                    </CardBody>
                </Card>

                <Card padding="md">
                    <CardBody>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            Alerts Generated
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: alertCount > 0 ? 'var(--accent)' : 'var(--text-primary)' }}>
                            {alertCount}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            this session
                        </div>
                    </CardBody>
                </Card>

                <Card padding="md">
                    <CardBody>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            Confidence Bands
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{confidenceBands.high}</span>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '4px' }}>80+</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>{confidenceBands.medium}</span>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '4px' }}>60-79</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>{confidenceBands.low}</span>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '4px' }}>&lt;60</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card padding="md">
                    <CardBody>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            Top Coverage
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {topCoverageCounties.map((c) => (
                                <div key={c.jurisdictionId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{c.displayName.replace(' County', '')}</span>
                                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{c.monitoredCount}</span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Map + Alerts Feed Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 400px',
                    gap: '24px',
                }}
                className="main-grid"
            >
                {/* Map Section */}
                <Card style={{ overflow: 'hidden', padding: 0 }}>
                    <DeepMapViz
                        isScanning={sim.isOn}
                        height="28rem"
                        onStateSelect={() => { }}
                        onCountySelect={() => { }}
                    />
                </Card>

                {/* Alerts Feed */}
                <Card>
                    <CardHeader actions={<Badge variant="accent" dot>Live</Badge>}>
                        Alerts Feed
                    </CardHeader>
                    <CardBody cardPadding="0">
                        <div style={{ maxHeight: '26rem', overflowY: 'auto' }}>
                            {sim.events.length === 0 ? (
                                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <p style={{ margin: 0, fontSize: '0.8rem' }}>No alerts yet</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '0.7rem' }}>Start Sim Mode to generate events</p>
                                </div>
                            ) : (
                                sim.events.slice(0, 20).map((event) => (
                                    <div
                                        key={event.eventId}
                                        onClick={() => handleEventClick(event)}
                                        style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid var(--border-subtle)',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                            background: selectedEvent?.eventId === event.eventId ? 'var(--accent-muted)' : 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedEvent?.eventId !== event.eventId) {
                                                e.currentTarget.style.background = 'var(--sidebar-item-hover)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedEvent?.eventId !== event.eventId) {
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                            <div>
                                                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                                                    {event.evidence.recordAfter.person.displayName}
                                                </span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginLeft: '8px' }}>
                                                    ({event.evidence.recordAfter.person.dobYear})
                                                </span>
                                            </div>
                                            <Badge variant={getConfidenceBadgeVariant(event.confidence)} size="sm">
                                                {event.confidence}%
                                            </Badge>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <Badge variant="default" size="sm">
                                                    {EVENT_TYPE_LABELS[event.eventType]}
                                                </Badge>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                                    {getCountyName(event.jurisdictionId).replace(' County', '')}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                                                {formatRelativeTime(event.createdAtISO)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Event Details Panel (shown when event selected) */}
            {selectedEvent && (
                <Card style={{ marginTop: '24px' }}>
                    <CardHeader
                        actions={
                            <button
                                onClick={() => setSelectedEvent(null)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                }}
                            >
                                Close
                            </button>
                        }
                    >
                        Event Evidence
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                            {/* Diff Summary */}
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                    Change Detected
                                </div>
                                <div style={{
                                    padding: '12px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    color: 'var(--accent)',
                                    fontFamily: 'monospace',
                                }}>
                                    {selectedEvent.evidence.diff.highlight}
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    {selectedEvent.evidence.diff.changedFields.map((cf, idx) => (
                                        <div key={idx} style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>{cf.field}:</span>{' '}
                                            <span style={{ color: 'var(--danger)', textDecoration: 'line-through' }}>{cf.before}</span>{' '}
                                            <span style={{ color: 'var(--success)' }}>{cf.after}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Snapshot Before */}
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                    Snapshot Before
                                </div>
                                <pre style={{
                                    padding: '12px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    margin: 0,
                                    maxHeight: '150px',
                                    overflowY: 'auto',
                                }}>
                                    {selectedEvent.evidence.snapshotBefore.rawPreview}
                                </pre>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    {selectedEvent.evidence.snapshotBefore.capturedAtISO.slice(0, 19).replace('T', ' ')}
                                </div>
                            </div>

                            {/* Snapshot After */}
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                    Snapshot After
                                </div>
                                <pre style={{
                                    padding: '12px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    margin: 0,
                                    maxHeight: '150px',
                                    overflowY: 'auto',
                                }}>
                                    {selectedEvent.evidence.snapshotAfter.rawPreview}
                                </pre>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    {selectedEvent.evidence.snapshotAfter.capturedAtISO.slice(0, 19).replace('T', ' ')}
                                </div>
                            </div>
                        </div>

                        {/* Confidence Reasons */}
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Confidence Reasons ({selectedEvent.confidence}%)
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {selectedEvent.confidenceReasons.map((reason, idx) => (
                                    <Badge key={idx} variant="default" size="sm">{reason}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @media (max-width: 1200px) {
                    .kpi-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .main-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 600px) {
                    .kpi-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
