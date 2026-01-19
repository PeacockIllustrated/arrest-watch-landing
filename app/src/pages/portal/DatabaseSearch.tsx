import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, CardHeader, CardBody, EmptyState } from '../../components/ui';
import { EvidenceEventList, type ConfidenceBand } from '../../components/app/source-evidence/EvidenceEventList';
import { EvidenceDetail } from '../../components/app/source-evidence/EvidenceDetail';
import { useDemoSim } from '../../context/DemoSimContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import type { ChangeEvent } from '../../lib/contracts/pipeline';

// =============================================================================
// SOURCE EVIDENCE PAGE - Phase 2 "Smoking Gun" Implementation
// =============================================================================

const SourceEvidence: React.FC = () => {
    usePageTitle('Source Evidence');
    const navigate = useNavigate();
    const sim = useDemoSim();

    // Selection state
    const [selectedEvent, setSelectedEvent] = useState<ChangeEvent | null>(null);

    // Filter state
    const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceBand>('all');
    const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('');

    // Auto-select first event when events change and nothing selected
    useEffect(() => {
        if (sim.events.length > 0 && !selectedEvent) {
            setSelectedEvent(sim.events[0]);
            sim.pulse(sim.events[0].jurisdictionId);
        }
    }, [sim.events, selectedEvent, sim]);

    // Handle event selection
    const handleSelectEvent = (event: ChangeEvent) => {
        setSelectedEvent(event);
        sim.pulse(event.jurisdictionId);

        // Log human "viewed" action to audit trail
        sim.appendAudit({
            actor: { actorType: 'human', actorId: 'demo_user', actorLabel: 'Safety Ops' },
            action: { actionType: 'viewed', actionLabel: 'Viewed' },
            jurisdictionId: event.jurisdictionId,
            eventId: event.eventId,
            personId: event.personId,
            summary: 'Viewed event evidence bundle',
            metadata: { location: 'source_evidence' },
        });
    };

    // Handle navigate to dashboard
    const handleGoToDashboard = () => {
        navigate('/portal/dashboard');
    };

    // Empty state when no events
    if (sim.events.length === 0) {
        return (
            <div>
                <PageHeader
                    title="Source Evidence"
                    description="Verify and inspect transformation lifecycle and provenance records"
                />
                <Card style={{ marginTop: '24px' }}>
                    <CardBody>
                        <EmptyState
                            icon={
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            }
                            title="No evidence bundles yet"
                            description="Turn on Sim Mode in the Dashboard to generate demo events with full evidence bundles."
                            action={{
                                label: 'Go to Dashboard',
                                onClick: handleGoToDashboard,
                            }}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Source Evidence"
                description="Verify and inspect transformation lifecycle and provenance records"
            />

            {/* Two-panel layout */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '380px 1fr',
                    gap: '24px',
                    marginTop: '24px',
                }}
                className="evidence-grid"
            >
                {/* Left Panel - Event List */}
                <Card style={{ overflow: 'hidden', maxHeight: 'calc(100vh - 200px)' }}>
                    <CardHeader>Evidence Events</CardHeader>
                    <div style={{ height: 'calc(100% - 48px)' }}>
                        <EvidenceEventList
                            events={sim.events}
                            selectedEventId={selectedEvent?.eventId || null}
                            onSelectEvent={handleSelectEvent}
                            confidenceFilter={confidenceFilter}
                            onConfidenceFilterChange={setConfidenceFilter}
                            jurisdictionFilter={jurisdictionFilter}
                            onJurisdictionFilterChange={setJurisdictionFilter}
                        />
                    </div>
                </Card>

                {/* Right Panel - Evidence Detail */}
                <Card style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                    <CardBody>
                        <EvidenceDetail event={selectedEvent} />
                    </CardBody>
                </Card>
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 1000px) {
                    .evidence-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SourceEvidence;
