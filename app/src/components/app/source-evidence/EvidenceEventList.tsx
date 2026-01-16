import React from 'react';
import { Badge } from '../../ui';
import type { ChangeEvent } from '../../../lib/contracts/pipeline';
import { JURISDICTION_MAP } from '../../../lib/demo/demoJurisdictions';

// =============================================================================
// EVIDENCE EVENT LIST - Left panel for Source Evidence page
// =============================================================================

const EVENT_TYPE_LABELS: Record<ChangeEvent['eventType'], string> = {
    booking_created: 'New Booking',
    charge_updated: 'Charge Updated',
    custody_status_changed: 'Status Changed',
    release_detected: 'Release Detected',
};

function getConfidenceBadgeVariant(confidence: number): 'success' | 'warning' | 'danger' {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'danger';
}

function getStatusPillColour(status: ChangeEvent['status']): string {
    switch (status) {
        case 'new': return 'var(--accent)';
        case 'reviewed': return 'var(--success)';
        case 'escalated': return 'var(--danger)';
        default: return 'var(--text-muted)';
    }
}

function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export type ConfidenceBand = 'all' | 'high' | 'medium' | 'low';

export interface EvidenceEventListProps {
    events: ChangeEvent[];
    selectedEventId: string | null;
    onSelectEvent: (event: ChangeEvent) => void;
    confidenceFilter: ConfidenceBand;
    onConfidenceFilterChange: (band: ConfidenceBand) => void;
    jurisdictionFilter: string;
    onJurisdictionFilterChange: (jurisdictionId: string) => void;
}

export const EvidenceEventList: React.FC<EvidenceEventListProps> = ({
    events,
    selectedEventId,
    onSelectEvent,
    confidenceFilter,
    onConfidenceFilterChange,
    jurisdictionFilter,
    onJurisdictionFilterChange,
}) => {
    // Get unique jurisdictions from events
    const jurisdictions = Array.from(new Set(events.map((e) => e.jurisdictionId)));

    // Filter events
    const filteredEvents = events.filter((event) => {
        // Jurisdiction filter
        if (jurisdictionFilter && event.jurisdictionId !== jurisdictionFilter) {
            return false;
        }
        // Confidence band filter
        if (confidenceFilter === 'high' && event.confidence < 80) return false;
        if (confidenceFilter === 'medium' && (event.confidence < 60 || event.confidence >= 80)) return false;
        if (confidenceFilter === 'low' && event.confidence >= 60) return false;
        return true;
    }).slice(0, 25);

    const getCountyName = (jurisdictionId: string): string => {
        return JURISDICTION_MAP[jurisdictionId]?.displayName || jurisdictionId;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Filters */}
            <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
            }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '4px',
                    }}>
                        Jurisdiction
                    </label>
                    <select
                        value={jurisdictionFilter}
                        onChange={(e) => onJurisdictionFilterChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: '4px',
                            color: 'var(--text-primary)',
                            fontSize: '0.75rem',
                        }}
                    >
                        <option value="">All Counties</option>
                        {jurisdictions.map((jId) => (
                            <option key={jId} value={jId}>
                                {getCountyName(jId).replace(' County', '')}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: '120px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '4px',
                    }}>
                        Confidence
                    </label>
                    <select
                        value={confidenceFilter}
                        onChange={(e) => onConfidenceFilterChange(e.target.value as ConfidenceBand)}
                        style={{
                            width: '100%',
                            padding: '6px 8px',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: '4px',
                            color: 'var(--text-primary)',
                            fontSize: '0.75rem',
                        }}
                    >
                        <option value="all">All Bands</option>
                        <option value="high">80-100%</option>
                        <option value="medium">60-79%</option>
                        <option value="low">&lt;60%</option>
                    </select>
                </div>
            </div>

            {/* Event count */}
            <div style={{
                padding: '8px 16px',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-subtle)',
            }}>
                Showing {filteredEvents.length} of {events.length} events
            </div>

            {/* Event list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredEvents.map((event) => (
                    <div
                        key={event.eventId}
                        onClick={() => onSelectEvent(event)}
                        style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                            background: selectedEventId === event.eventId
                                ? 'var(--accent-muted)'
                                : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            if (selectedEventId !== event.eventId) {
                                e.currentTarget.style.background = 'var(--sidebar-item-hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedEventId !== event.eventId) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        {/* Row 1: Name + DOB + Confidence */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '6px',
                        }}>
                            <div>
                                <span style={{
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                }}>
                                    {event.evidence.recordAfter.person.displayName}
                                </span>
                                <span style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.7rem',
                                    marginLeft: '6px',
                                }}>
                                    ({event.evidence.recordAfter.person.dobYear})
                                </span>
                            </div>
                            <Badge variant={getConfidenceBadgeVariant(event.confidence)} size="sm">
                                {event.confidence}%
                            </Badge>
                        </div>

                        {/* Row 2: Event type + County + Time */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Badge variant="default" size="sm">
                                    {EVENT_TYPE_LABELS[event.eventType]}
                                </Badge>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                    {getCountyName(event.jurisdictionId).replace(' County', '')}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: getStatusPillColour(event.status),
                                    }}
                                    title={event.status}
                                />
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                                    {formatTime(event.createdAtISO)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EvidenceEventList;
