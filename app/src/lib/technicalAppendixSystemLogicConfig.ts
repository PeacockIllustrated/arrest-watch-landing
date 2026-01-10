/**
 * Technical Appendix - System Logic Configuration
 * 
 * CANONICAL SOURCES:
 * 1. /supporting-docs/ArrestDelta - Product flow.md
 * 2. /supporting-docs/Technical Appendix (System Overview).md
 * 3. /supporting-docs/Technical Breakdown by Flow Step.md
 * 
 * All content preserved verbatim from original where possible.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ProductFlowStep {
    id: string;
    stepNumber: string;
    title: string;
    description: string;
    isGate?: boolean;
}

export interface SystemOverviewSection {
    purpose: string;
    overview: string[];
    processingFlow: {
        step: string;
        content: string;
    }[];
    principles: string[];
    summary: string;
}

export interface FlowBreakdownStep {
    id: string;
    stepNumber: string;
    title: string;
    subtitle: string;
    technicalPurpose: string;
    technicalDetails: string[];
    designPrinciple: string;
}

export interface TechnicalAppendixSystemLogicConfig {
    intro: {
        title: string;
        neutralLine: string;
    };
    productFlow: {
        steps: ProductFlowStep[];
        closingLine: string;
    };
    systemOverview: SystemOverviewSection;
    flowBreakdown: {
        systemSummary: string[];
        steps: FlowBreakdownStep[];
    };
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const TECHNICAL_APPENDIX_SYSTEM_LOGIC_CONFIG: TechnicalAppendixSystemLogicConfig = {
    intro: {
        title: 'Technical Appendix - System Logic',
        neutralLine: 'Architecture intent: detection → identity certainty → verification → routing.'
    },

    // Source: ArrestDelta - Product flow.md
    productFlow: {
        steps: [
            {
                id: 'ingestion',
                stepNumber: '1',
                title: 'Public Records Ingestion',
                description: 'County and jurisdictional sources with variable structure, latency, and completeness.'
            },
            {
                id: 'detection',
                stepNumber: '2',
                title: 'Provisional Signal Detection',
                description: 'Initial booking or custody events are detected but treated as provisional.'
            },
            {
                id: 'identity',
                stepNumber: '3',
                title: 'Identity Resolution',
                description: 'Records are resolved against an established identity reference using multiple signals, which may include biometric confirmation where legally permitted, to eliminate ambiguity and false matches.'
            },
            {
                id: 'verification',
                stepNumber: '4',
                title: 'Verification Gate',
                description: 'State transitions are confirmed and confidence thresholds applied. Noise and incomplete signals are suppressed.',
                isGate: true
            },
            {
                id: 'routing',
                stepNumber: '5',
                title: 'Actionable Alert Routing',
                description: 'Only verified, high-confidence changes are routed to Trust & Safety, Legal, or Security teams.'
            }
        ],
        closingLine: 'Verification occurs before alerts, not after.'
    },

    // Source: Technical Appendix (System Overview).md
    systemOverview: {
        purpose: 'This appendix provides a high-level technical overview of how ArrestDelta processes arrest-related public records into decision-grade alerts. It is intended to illustrate system logic and architectural intent rather than implementation detail.',
        overview: [
            'ArrestDelta is a verification-first decision layer that sits between fragmented public records sources and enterprise Trust & Safety, Legal, and Security systems.',
            'The system is designed to ensure that identity certainty and state verification occur before alerts are generated, reducing false positives and preventing reactive decision-making based on incomplete data.'
        ],
        processingFlow: [
            {
                step: '1. Public Records Ingestion',
                content: 'ArrestDelta ingests arrest-related records from county and jurisdictional sources that vary significantly in structure, update cadence, and completeness. All incoming data is normalized into an internal canonical format while preserving source provenance, timestamps, and data quality indicators. Ingestion does not imply accuracy or actionability.'
            },
            {
                step: '2. Provisional Signal Detection',
                content: 'New or updated records are detected as provisional signals. These may include booking, custody, or related arrest-adjacent events. At this stage signals are identified for relevance, no alerts are generated, and records are treated as incomplete and potentially reversible. Detection prioritizes coverage while deferring decision-making.'
            },
            {
                step: '3. Identity Resolution',
                content: 'Provisional signals are evaluated against an established identity reference created at onboarding or access time. Identity resolution uses multiple signals, which may include biographic attributes, historical identifiers, jurisdictional identifiers, and biometric confirmation where legally permitted and available. Each match is assigned a confidence assessment. Signals that do not meet identity certainty requirements are suppressed or held for further validation.'
            },
            {
                step: '4. Verification Gate',
                content: 'ArrestDelta applies verification logic to determine whether a provisional signal represents a meaningful and stable state transition. This includes assessing event progression and temporal stability, evaluating source reliability and corroboration, and applying configurable confidence thresholds based on role sensitivity and customer policy. Signals that fail verification criteria do not progress to alerting. Verification occurs before escalation.'
            },
            {
                step: '5. Actionable Alert Routing',
                content: 'Only verified, high-confidence state changes generate alerts. Alerts include confirmed identity reference, verified state transition context, confidence indicators, and source and audit metadata. Alerts are routed to appropriate enterprise functions based on predefined workflows, ensuring recipients can act without downstream re-verification.'
            }
        ],
        principles: [
            'Verification before alerts',
            'Identity certainty as a prerequisite for action',
            'Suppression of noise and ambiguous records',
            'Separation of detection, verification, and decision layers'
        ],
        summary: 'ArrestDelta is architected to prevent raw public records data from directly triggering enterprise action. By enforcing identity resolution and verification as system-level constraints, the platform delivers alerts that are defensible, auditable, and suitable for high-stakes operational decisions.'
    },

    // Source: Technical Breakdown by Flow Step.md
    flowBreakdown: {
        systemSummary: [
            'ArrestDelta is designed to separate detection, identity certainty, and verification into distinct system layers.',
            'This prevents raw public records data from directly triggering enterprise action and ensures that only stable, high-confidence changes result in alerts.'
        ],
        steps: [
            {
                id: 'ingestion',
                stepNumber: '1',
                title: 'Public Records Ingestion',
                subtitle: 'County and jurisdictional sources with variable structure, latency, and completeness.',
                technicalPurpose: 'To reliably ingest arrest-related data from highly fragmented public-sector systems without assuming uniform schemas, timing, or data quality.',
                technicalDetails: [
                    'Data is ingested from multiple public records endpoints, portals, and feeds.',
                    'Each source is treated as structurally inconsistent, latency-variable, and potentially incomplete or amended over time.',
                    'Records are normalized into an internal canonical format that preserves source provenance, timestamp metadata, and field-level confidence indicators.'
                ],
                designPrinciple: 'Ingestion does not imply truth. At this stage, data is treated as raw input, not a decision signal.'
            },
            {
                id: 'detection',
                stepNumber: '2',
                title: 'Provisional Signal Detection',
                subtitle: 'Initial booking or custody events are detected but treated as provisional.',
                technicalPurpose: 'To identify potentially relevant arrest-related activity without prematurely escalating incomplete or unstable records.',
                technicalDetails: [
                    'New or changed records are detected as provisional signals.',
                    'Signals are flagged based on event type (e.g. booking, custody, hold), jurisdictional context, and record completeness.',
                    'No alerts are generated at this stage.',
                    'Signals are queued for downstream identity resolution and verification.'
                ],
                designPrinciple: 'Detection is not confirmation. This layer prioritizes recall while deferring precision.'
            },
            {
                id: 'identity',
                stepNumber: '3',
                title: 'Identity Resolution',
                subtitle: 'Records are resolved against an established identity reference using multiple signals, which may include biometric confirmation where legally permitted, to eliminate ambiguity and false matches.',
                technicalPurpose: 'To determine whether a provisional signal refers to a known individual with sufficient confidence to proceed.',
                technicalDetails: [
                    'Provisional records are evaluated against an existing identity reference created at onboarding or access time.',
                    'Identity resolution uses multiple signals, which may include biographic attributes, historical identifiers, jurisdictional identifiers, and biometric confirmation where legally permitted and available.',
                    'Each match is assigned a confidence score reflecting signal consistency, source reliability, and historical alignment.'
                ],
                designPrinciple: 'Identity certainty is required before any decision logic is applied. Ambiguous matches are suppressed or held for further validation.'
            },
            {
                id: 'verification',
                stepNumber: '4',
                title: 'Verification Gate',
                subtitle: 'State transitions are confirmed and confidence thresholds applied. Noise and incomplete signals are suppressed.',
                technicalPurpose: 'To confirm that a meaningful, stable state change has occurred and that it meets predefined confidence thresholds for action.',
                technicalDetails: [
                    'ArrestDelta evaluates whether the provisional signal represents a verified state transition, not a transient or reversible condition.',
                    'The system assesses event progression (e.g. booking → confirmed arrest), source corroboration where available, and temporal stability.',
                    'Confidence thresholds are applied based on customer policy, role sensitivity, and jurisdictional reliability.',
                    'Signals that do not meet thresholds are suppressed, deferred, or monitored without escalation.'
                ],
                designPrinciple: 'Alerts are gated, not streamed. Verification occurs before alerts, not after.'
            },
            {
                id: 'routing',
                stepNumber: '5',
                title: 'Actionable Alert Routing',
                subtitle: 'Only verified, high-confidence changes are routed to Trust & Safety, Legal, or Security teams.',
                technicalPurpose: 'To deliver decision-grade alerts that can be acted upon immediately without requiring downstream re-verification.',
                technicalDetails: [
                    'Once verification criteria are met, an alert is generated with confirmed identity reference, verified state change context, confidence indicators, and source audit metadata.',
                    'Alerts are routed to the appropriate function: Trust & Safety, Legal, Security.',
                    'Routing logic respects organisational workflows, escalation policies, and audit and review requirements.'
                ],
                designPrinciple: 'Every alert must be defensible. Recipients should not need to ask, "Is this real?" before acting.'
            }
        ]
    }
};

export default TECHNICAL_APPENDIX_SYSTEM_LOGIC_CONFIG;
