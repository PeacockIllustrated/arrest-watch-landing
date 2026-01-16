import React from 'react';
import { Card, CardHeader, CardBody, Badge } from '../../ui';
import { SnapshotCompare } from './SnapshotCompare';
import type { ChangeEvent } from '../../../lib/contracts/pipeline';

// =============================================================================
// EVIDENCE DETAIL - Right panel showing transformation lifecycle
// =============================================================================

interface EvidenceIntegrityResult {
    isComplete: boolean;
    missing: string[];
}

function checkEvidenceIntegrity(event: ChangeEvent): EvidenceIntegrityResult {
    const missing: string[] = [];
    if (!event.evidence.snapshotBefore) missing.push('snapshotBefore');
    if (!event.evidence.snapshotAfter) missing.push('snapshotAfter');
    if (!event.evidence.recordBefore) missing.push('recordBefore');
    if (!event.evidence.recordAfter) missing.push('recordAfter');
    if (!event.evidence.diff) missing.push('diff');
    return {
        isComplete: missing.length === 0,
        missing,
    };
}

export interface EvidenceDetailProps {
    event: ChangeEvent | null;
}

export const EvidenceDetail: React.FC<EvidenceDetailProps> = ({ event }) => {
    if (!event) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
            }}>
                Select an event to view evidence
            </div>
        );
    }

    const integrity = checkEvidenceIntegrity(event);
    const { evidence } = event;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Section Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                }}>
                    Transformation Lifecycle
                </h3>
                <Badge
                    variant={integrity.isComplete ? 'success' : 'warning'}
                    size="sm"
                >
                    {integrity.isComplete ? 'Evidence Complete' : 'Incomplete Bundle'}
                </Badge>
            </div>

            {/* SourceRef Card */}
            <Card padding="sm">
                <CardHeader>Source Reference</CardHeader>
                <CardBody>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: '8px 16px',
                        fontSize: '0.8rem',
                    }}>
                        <span style={{ color: 'var(--text-muted)' }}>Label:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{evidence.source.label}</span>
                        <span style={{ color: 'var(--text-muted)' }}>Type:</span>
                        <Badge variant="default" size="sm">{evidence.source.sourceType.toUpperCase()}</Badge>
                        <span style={{ color: 'var(--text-muted)' }}>URL:</span>
                        <span style={{
                            color: 'var(--accent)',
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            wordBreak: 'break-all',
                        }}>
                            {evidence.source.canonicalUrl}
                        </span>
                    </div>
                </CardBody>
            </Card>

            {/* Snapshot Comparison */}
            <div>
                <div style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                    marginBottom: '12px',
                    fontWeight: 600,
                }}>
                    Snapshot Comparison
                </div>
                <SnapshotCompare
                    snapshotBefore={evidence.snapshotBefore}
                    snapshotAfter={evidence.snapshotAfter}
                />
            </div>

            {/* Diff Block */}
            <Card padding="sm">
                <CardHeader>Diff Summary</CardHeader>
                <CardBody>
                    <div style={{
                        padding: '10px 12px',
                        background: 'var(--accent-muted)',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        color: 'var(--accent)',
                        marginBottom: '12px',
                    }}>
                        {evidence.diff.highlight}
                    </div>
                    {evidence.diff.changedFields.length > 0 && (
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.75rem',
                        }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Field</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Before</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>After</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evidence.diff.changedFields.map((cf, idx) => (
                                    <tr
                                        key={idx}
                                        style={{
                                            background: 'var(--bg-elevated)',
                                            borderBottom: '1px solid var(--border-subtle)',
                                        }}
                                    >
                                        <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                                            {cf.field}
                                        </td>
                                        <td style={{
                                            padding: '8px',
                                            color: 'var(--danger)',
                                            fontFamily: 'monospace',
                                            textDecoration: cf.before !== '(none)' ? 'line-through' : 'none',
                                            opacity: cf.before === '(none)' ? 0.6 : 1,
                                        }}>
                                            {cf.before}
                                        </td>
                                        <td style={{ padding: '8px', color: 'var(--success)', fontFamily: 'monospace' }}>
                                            {cf.after}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>

            {/* Field Mapping Section */}
            <Card padding="sm">
                <CardHeader>Field Mapping</CardHeader>
                <CardBody>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '0.75rem',
                        marginBottom: '16px',
                    }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', minWidth: '160px' }}>Source rawPreview</span>
                            <span style={{ color: 'var(--text-muted)' }}>-&gt;</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                                Extracted displayName: <strong>{evidence.recordAfter.person.displayName}</strong>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', minWidth: '160px' }}>Source rawPreview</span>
                            <span style={{ color: 'var(--text-muted)' }}>-&gt;</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                                Extracted dobYear: <strong>{evidence.recordAfter.person.dobYear}</strong>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', minWidth: '160px' }}>Source rawPreview</span>
                            <span style={{ color: 'var(--text-muted)' }}>-&gt;</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                                Extracted bookingRef: <strong>{evidence.recordAfter.bookingRef || '(none)'}</strong>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', minWidth: '160px' }}>Source rawPreview</span>
                            <span style={{ color: 'var(--text-muted)' }}>-&gt;</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                                Extracted charges count: <strong>{evidence.recordAfter.charges.length}</strong>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', minWidth: '160px' }}>Source rawPreview</span>
                            <span style={{ color: 'var(--text-muted)' }}>-&gt;</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                                Extracted custodyStatus: <strong>{evidence.recordAfter.custodyStatus}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Match Confidence & Reasons */}
                    <div style={{
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-subtle)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '8px',
                        }}>
                            <span style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                            }}>
                                Match Confidence
                            </span>
                            <Badge
                                variant={evidence.recordAfter.match.matchConfidence >= 80 ? 'success' :
                                    evidence.recordAfter.match.matchConfidence >= 60 ? 'warning' : 'danger'}
                            >
                                {evidence.recordAfter.match.matchConfidence}%
                            </Badge>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '6px',
                            flexWrap: 'wrap',
                        }}>
                            {evidence.recordAfter.match.matchReasons.slice(0, 4).map((reason, idx) => (
                                <Badge key={idx} variant="default" size="sm">
                                    {reason}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Evidence Integrity Warning (if incomplete) */}
            {!integrity.isComplete && (
                <div style={{
                    padding: '12px 16px',
                    background: 'var(--warning-muted)',
                    border: '1px solid var(--warning)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    color: 'var(--warning)',
                }}>
                    <strong>Warning:</strong> Incomplete evidence bundle. Missing: {integrity.missing.join(', ')}
                </div>
            )}
        </div>
    );
};

export default EvidenceDetail;
