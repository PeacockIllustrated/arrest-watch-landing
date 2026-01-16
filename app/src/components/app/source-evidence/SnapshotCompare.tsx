import React from 'react';
import type { Snapshot } from '../../../lib/contracts/pipeline';

// =============================================================================
// SNAPSHOT COMPARE - Side-by-side snapshot comparison
// =============================================================================

export interface SnapshotCompareProps {
    snapshotBefore: Snapshot;
    snapshotAfter: Snapshot;
}

function shortenHash(hash: string): string {
    return hash.slice(0, 10);
}

function formatTimestamp(isoString: string): string {
    return isoString.slice(0, 19).replace('T', ' ');
}

const SnapshotCard: React.FC<{
    title: string;
    snapshot: Snapshot;
    variant: 'before' | 'after';
}> = ({ title, snapshot, variant }) => {
    const borderColour = variant === 'before' ? 'var(--border-subtle)' : 'var(--accent)';

    return (
        <div style={{
            flex: 1,
            minWidth: '280px',
        }}>
            <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
            }}>
                {title}
            </div>
            <div style={{
                background: 'var(--bg-surface)',
                border: `1px solid ${borderColour}`,
                borderRadius: '4px',
                overflow: 'hidden',
            }}>
                {/* Metadata row */}
                <div style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    fontSize: '0.65rem',
                }}>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Captured: </span>
                        <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                            {formatTimestamp(snapshot.capturedAtISO)}
                        </span>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Hash: </span>
                        <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                            {shortenHash(snapshot.fingerprintHash)}
                        </span>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Parser: </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            {snapshot.parserVersion}
                        </span>
                    </div>
                </div>
                {/* Raw preview */}
                <pre style={{
                    margin: 0,
                    padding: '12px',
                    fontSize: '0.65rem',
                    fontFamily: 'monospace',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '140px',
                    overflowY: 'auto',
                    background: 'var(--bg-elevated)',
                }}>
                    {snapshot.rawPreview}
                </pre>
            </div>
        </div>
    );
};

export const SnapshotCompare: React.FC<SnapshotCompareProps> = ({
    snapshotBefore,
    snapshotAfter,
}) => {
    return (
        <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
        }}>
            <SnapshotCard
                title="Yesterday Snapshot"
                snapshot={snapshotBefore}
                variant="before"
            />
            <SnapshotCard
                title="Today Snapshot"
                snapshot={snapshotAfter}
                variant="after"
            />
        </div>
    );
};

export default SnapshotCompare;
