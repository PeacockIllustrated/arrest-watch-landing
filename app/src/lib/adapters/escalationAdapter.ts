// =============================================================================
// ESCALATION ADAPTER - Normalizes Supabase payload JSONB to UI ViewModels
// =============================================================================
// INVARIANT: UI components MUST consume adapter output, never raw payload JSON.
// =============================================================================

import type {
    AlertCardModel,
    EscalationDetailModel,
    SubjectIdentity,
    ChargeEntry,
    BiometricResult,
    EvidenceArtifact,
} from '../../hooks/usePortalData';

// =============================================================================
// RAW SUPABASE TYPES (Input)
// These mirror the actual database schema from the scraper ingestion.
// =============================================================================

/**
 * Raw escalation row from Supabase `escalations` table
 */
export interface RawEscalationRow {
    id: string; // UUID
    escalation_key: string; // SHA-256 deterministic key
    run_id: string;
    status: string; // 'pending', 'reviewed', 'escalated'
    severity_score: number | null; // numeric(3,2) - 0.00 to 9.99 (needs conversion to 0-100)
    confidence_score: number | null; // numeric(3,2) - 0.00 to 9.99 (needs conversion to 0-100)
    summary: string | null;
    payload: RawEscalationPayload;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

/**
 * JSONB payload structure within an escalation
 * This is the hierarchical data from the scraper.
 */
export interface RawEscalationPayload {
    subject: {
        name: string;
        dob_year?: number;
        booking_id?: string;
        booking_date?: string;
    };
    charges?: Array<{
        description: string;
        severity?: 'felony' | 'misdemeanor' | 'infraction';
    }>;
    biometric?: {
        verified: boolean;
        confidence: number;
        method?: 'face_match' | 'fingerprint' | 'manual';
    };
    jurisdiction: {
        id: string;
        label: string;
    };
    evidence_refs?: Array<{
        artifact_id: string;
        artifact_type: 'mugshot' | 'page_snapshot' | 'pdf_report';
        storage_path: string;
        sha256?: string;
    }>;
}

/**
 * Raw evidence_snapshot row from Supabase
 */
export interface RawEvidenceSnapshotRow {
    id: string;
    escalation_key: string;
    sha256: string;
    storage_path: string;
    artifact_type: 'mugshot' | 'page_snapshot' | 'pdf_report';
    created_at: string;
}

// =============================================================================
// ADAPTER FUNCTIONS
// =============================================================================

/**
 * Convert a raw escalation row to AlertCardModel (for dashboard/feed)
 * DEFENSIVE: Handles potential payload shape variations from ingestion.
 */
export function toAlertCardModel(row: RawEscalationRow): AlertCardModel {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload: any = row.payload || {};
        const charges = payload.charges || [];

        // Extract subject name from ingestion pipeline fields
        const subjectName = payload.person_name ||
            payload.person_name_normalized ||
            payload.subject?.name ||
            payload.name ||
            'Unknown Subject';

        // Extract DOB year (not currently in payload, but handle if added)
        const dobYear = payload.dob_year ||
            payload.subject?.dob_year ||
            null;

        // Extract jurisdiction from county_slug + state
        const countySlug = payload.county_slug || 'unknown';
        const state = payload.state || 'FL';
        const jurisdictionId = `${state.toLowerCase()}_${countySlug}`;
        const jurisdictionLabel = `${countySlug.charAt(0).toUpperCase() + countySlug.slice(1)} County, ${state}`;

        // Extract mugshot URL
        const mugshotUrl = payload.image_url || null;

        // Debug logging (remove in production)
        console.log('[escalationAdapter] Processing row:', {
            escalation_key: row.escalation_key,
            run_id: row.run_id,
            subjectName,
            jurisdictionId,
            mugshotUrl: mugshotUrl ? '(has image)' : null,
        });

        // Convert decimal scores (0.00-1.00) to percentages (0-100)
        // numeric(3,2) means max 9.99, but likely storing as 0.00-1.00 range
        const severityPct = row.severity_score != null
            ? Math.round(row.severity_score > 1 ? row.severity_score : row.severity_score * 100)
            : 50;
        const confidencePct = row.confidence_score != null
            ? Math.round(row.confidence_score > 1 ? row.confidence_score : row.confidence_score * 100)
            : 50;

        // Map DB status to UI status
        const statusMap: Record<string, 'new' | 'reviewed' | 'escalated'> = {
            pending: 'new',
            reviewed: 'reviewed',
            escalated: 'escalated',
        };
        const status = statusMap[row.status] || 'new';

        return {
            escalationKey: row.escalation_key,
            createdAt: row.created_at,
            subject: {
                subjectName,
                dobYear,
                mugshotUrl, // From payload.image_url
            },
            jurisdictionId,
            jurisdictionLabel,
            severityScore: severityPct,
            confidenceScore: confidencePct,
            topCharge: charges.length > 0 ? (charges[0].description || charges[0]) : null,
            chargeCount: charges.length,
            status,
            runId: row.run_id,
        };
    } catch (err) {
        console.error('[escalationAdapter] Failed to parse row:', row, err);
        // Return a fallback model to avoid breaking the UI
        return {
            escalationKey: row.escalation_key || 'unknown',
            createdAt: row.created_at || new Date().toISOString(),
            subject: { subjectName: 'Parse Error', dobYear: null, mugshotUrl: null },
            jurisdictionId: 'unknown',
            jurisdictionLabel: 'Unknown',
            severityScore: 0,
            confidenceScore: 0,
            topCharge: null,
            chargeCount: 0,
            status: 'new',
            runId: row.run_id || 'unknown',
        };
    }
}

/**
 * Convert a raw escalation row to EscalationDetailModel (for detail page)
 */
export function toEscalationDetailModel(
    row: RawEscalationRow,
    evidenceSnapshots: RawEvidenceSnapshotRow[] = []
): EscalationDetailModel {
    const payload = row.payload;
    const charges = payload.charges || [];

    // Map charges
    const chargeEntries: ChargeEntry[] = charges.map((c) => ({
        description: c.description,
        severity: c.severity || 'unknown',
    }));

    // Map biometric
    const biometric: BiometricResult = payload.biometric
        ? {
            verified: payload.biometric.verified,
            confidence: payload.biometric.confidence,
            method: payload.biometric.method || 'none',
        }
        : {
            verified: false,
            confidence: 0,
            method: 'none',
        };

    // Map evidence artifacts - prefer evidence_snapshots table, fallback to payload refs
    let evidenceArtifacts: EvidenceArtifact[] = [];

    if (evidenceSnapshots.length > 0) {
        // Use authoritative evidence_snapshots table
        evidenceArtifacts = evidenceSnapshots.map((snap) => ({
            artifactId: snap.id,
            artifactType: snap.artifact_type,
            storagePath: snap.storage_path,
            sha256: snap.sha256,
            signedUrl: null, // Populated on demand
        }));
    } else if (payload.evidence_refs) {
        // Fallback to payload refs
        evidenceArtifacts = payload.evidence_refs.map((ref) => ({
            artifactId: ref.artifact_id,
            artifactType: ref.artifact_type,
            storagePath: ref.storage_path,
            sha256: ref.sha256 || null,
            signedUrl: null,
        }));
    }

    // Build the detail model
    const cardModel = toAlertCardModel(row);

    return {
        ...cardModel,
        charges: chargeEntries,
        biometric,
        evidence: evidenceArtifacts,
        bookingId: payload.subject.booking_id || null,
        bookingDate: payload.subject.booking_date || null,
        rawPayloadPreview: JSON.stringify(payload, null, 2).slice(0, 500) + '...',
    };
}

/**
 * Extract subject identity from payload
 */
function extractSubjectIdentity(payload: RawEscalationPayload): SubjectIdentity {
    return {
        subjectName: payload.subject.name || 'Unknown Subject',
        dobYear: payload.subject.dob_year || null,
        mugshotUrl: null, // Populated via signed URL helper
    };
}

// =============================================================================
// BATCH ADAPTERS (For list views)
// =============================================================================

/**
 * Convert multiple escalation rows to AlertCardModels
 */
export function toAlertCardModels(rows: RawEscalationRow[]): AlertCardModel[] {
    return rows.map(toAlertCardModel);
}
