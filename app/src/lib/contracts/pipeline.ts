// =============================================================================
// PIPELINE CONTRACTS - Single source of truth for data flow
// =============================================================================

/**
 * Reference to a data source (jail roster page, PDF, etc.)
 */
export interface SourceRef {
    sourceId: string;
    jurisdictionId: string; // County FIPS id used by the map (e.g., "c12086")
    label: string;
    sourceType: 'html' | 'pdf' | 'json' | 'js';
    canonicalUrl: string;
}

/**
 * A point-in-time capture of source content
 */
export interface Snapshot {
    snapshotId: string;
    source: SourceRef;
    capturedAtISO: string;
    contentType: string;
    fingerprintHash: string;
    rawPreview: string; // Short, human-readable preview (not full payload)
    parserVersion: string;
}

/**
 * A parsed record extracted from a snapshot
 */
export interface ParsedRecord {
    recordId: string;
    snapshotId: string;
    jurisdictionId: string;
    observedAtISO: string;
    bookingRef: string;
    person: {
        personId: string;
        displayName: string; // Synthetic name
        dobYear: number;
    };
    charges: string[];
    custodyStatus: 'in_custody' | 'released' | 'unknown';
    match: {
        matchConfidence: number; // 0-100
        matchReasons: string[];
    };
}

/**
 * Difference between two snapshots
 */
export interface Diff {
    diffId: string;
    jurisdictionId: string;
    beforeSnapshotId: string;
    afterSnapshotId: string;
    highlight: string;
    changedFields: Array<{ field: string; before: string; after: string }>;
}

/**
 * A change event emitted by the pipeline
 */
export interface ChangeEvent {
    eventId: string;
    createdAtISO: string;
    jurisdictionId: string;
    eventType: 'booking_created' | 'charge_updated' | 'custody_status_changed' | 'release_detected';
    personId: string;
    confidence: number; // 0-100
    confidenceReasons: string[];
    evidence: {
        source: SourceRef;
        snapshotBefore: Snapshot;
        snapshotAfter: Snapshot;
        recordBefore: ParsedRecord;
        recordAfter: ParsedRecord;
        diff: Diff;
    };
    status: 'new' | 'reviewed' | 'escalated';
}

/**
 * Health status for a county source
 */
export interface CountyHealth {
    jurisdictionId: string;
    state: 'healthy' | 'degraded' | 'down';
    lastSuccessfulScanAtISO: string;
    lastAttemptAtISO: string;
    latencyMs: number;
    parserVersionLabel: string; // e.g., "v4.2 (Verified)"
}
