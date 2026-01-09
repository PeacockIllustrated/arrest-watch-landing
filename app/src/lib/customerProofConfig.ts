/**
 * Customer Proof — Early Validation Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Customer Proof _ Early Validation.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/customer-proof.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    id: string;
    eyebrow: string;
    headline: string;
    thesisLine: string;
    framing: string;
}

export interface EnterpriseQuote {
    id: string;
    text: string;
    sourceClass: string;
}

export interface SolutionRequirement {
    id: string;
    problemReality: string;
    solutionRequirement: string;
}

export interface EngagementEvidence {
    id: string;
    label: string;
    detail: string;
}

export interface DemonstrableArtifact {
    id: string;
    title: string;
    description: string;
}

export interface Milestone {
    id: string;
    text: string;
    isNext: boolean;
}

export interface InvestorSummarySection {
    eyebrow: string;
    summary: string;
}

export interface CustomerProofConfig {
    thesis: ThesisSection;
    enterpriseQuotes: {
        eyebrow: string;
        headline: string;
        intro: string;
        quotes: EnterpriseQuote[];
        closing: string;
    };
    solutionRequirements: {
        eyebrow: string;
        headline: string;
        intro: string;
        requirements: SolutionRequirement[];
        closing: string;
    };
    engagementEvidence: {
        eyebrow: string;
        headline: string;
        intro: string;
        evidence: EngagementEvidence[];
        closing: string;
    };
    demonstrableArtifacts: {
        eyebrow: string;
        headline: string;
        intro: string;
        artifacts: DemonstrableArtifact[];
        closing: string;
    };
    nextMilestones: {
        eyebrow: string;
        headline: string;
        intro: string;
        milestones: Milestone[];
        closing: string;
    };
    investorSummary: InvestorSummarySection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const CUSTOMER_PROOF_CONFIG: CustomerProofConfig = {
    thesis: {
        id: 'thesis',
        eyebrow: 'CUSTOMER PROOF — EARLY VALIDATION',
        headline: 'We Do Not Claim Traction. We Demonstrate Truth.',
        thesisLine: 'At this stage, our proof is not logos or contracts.',
        framing: 'Our proof is consistent buyer behaviour, repeatable problem validation, and clear alignment on what a viable solution must deliver.'
    },

    enterpriseQuotes: {
        eyebrow: 'SIGNAL TRANSCRIPT',
        headline: 'What Enterprises Consistently Tell Us',
        intro: 'Across conversations with Trust & Safety, Public Safety, Security, and Compliance leaders, we repeatedly hear the same themes:',
        quotes: [
            {
                id: 'quote-1',
                text: '"We don\'t know when arrest records have actually changed."',
                sourceClass: 'Trust & Safety'
            },
            {
                id: 'quote-2',
                text: '"False positives create more risk than missed events."',
                sourceClass: 'Security'
            },
            {
                id: 'quote-3',
                text: '"We spend too much time manually verifying updates."',
                sourceClass: 'Compliance'
            },
            {
                id: 'quote-4',
                text: '"We can\'t defend acting on stale or inconsistent arrest data."',
                sourceClass: 'Trust & Safety'
            },
            {
                id: 'quote-5',
                text: '"Our current tools surface refreshes, not meaningful change."',
                sourceClass: 'Security'
            }
        ],
        closing: 'These statements emerge independently, without prompting, across multiple organizations.'
    },

    solutionRequirements: {
        eyebrow: 'REQUIREMENTS ALIGNMENT',
        headline: 'What Buyers Say a Viable Solution Must Do',
        intro: 'Enterprises are remarkably aligned on solution requirements:',
        requirements: [
            {
                id: 'req-1',
                problemReality: 'Raw data refreshes create noise',
                solutionRequirement: 'Detect meaningful change, not raw data refreshes'
            },
            {
                id: 'req-2',
                problemReality: 'False positives erode trust',
                solutionRequirement: 'Aggressively suppress noise and false positives'
            },
            {
                id: 'req-3',
                problemReality: 'Alerts lack auditability',
                solutionRequirement: 'Provide confidence and auditability, not just alerts'
            },
            {
                id: 'req-4',
                problemReality: 'Siloed tools fragment workflows',
                solutionRequirement: 'Integrate into existing Trust & Safety and Security workflows'
            },
            {
                id: 'req-5',
                problemReality: 'Current tools introduce legal exposure',
                solutionRequirement: 'Reduce legal and operational risk, not introduce new exposure'
            }
        ],
        closing: 'This alignment confirms that the problem — and the solution shape — are well understood by the market.'
    },

    engagementEvidence: {
        eyebrow: 'ENGAGEMENT QUALITY',
        headline: 'Evidence of Serious Engagement',
        intro: 'While we are early, engagement quality indicates real demand:',
        evidence: [
            {
                id: 'eng-1',
                label: 'Discovery',
                detail: 'Multiple deep discovery sessions completed with enterprise organizations'
            },
            {
                id: 'eng-2',
                label: 'Cross-functional review',
                detail: 'Follow-up technical and operational reviews involving cross-functional stakeholders'
            },
            {
                id: 'eng-3',
                label: 'Pilot scoping',
                detail: 'Active scoping discussions for paid pilots, including success criteria and governance'
            },
            {
                id: 'eng-4',
                label: 'Stakeholder depth',
                detail: 'Engagements involving Trust & Safety, Security, and Legal stakeholders — not innovation teams'
            }
        ],
        closing: 'This is not casual interest; it is problem-driven engagement.'
    },

    demonstrableArtifacts: {
        eyebrow: 'ARTEFACTS',
        headline: 'What We Can Demonstrate Today',
        intro: 'We are already able to show tangible artifacts, including:',
        artifacts: [
            {
                id: 'art-1',
                title: 'Alert example (redacted)',
                description: 'Redacted examples of verified arrest-change alerts'
            },
            {
                id: 'art-2',
                title: 'Audit trail (sample)',
                description: 'Sample confidence scoring and audit trails'
            },
            {
                id: 'art-3',
                title: 'Pilot structure',
                description: 'A defined pilot structure suitable for enterprise deployment'
            },
            {
                id: 'art-4',
                title: 'Refresh vs change',
                description: 'A clear differentiation between "data refresh" and "state change"'
            }
        ],
        closing: 'These artifacts allow buyers to assess feasibility and risk before committing.'
    },

    nextMilestones: {
        eyebrow: 'VALIDATION ROADMAP',
        headline: 'What Comes Next',
        intro: 'Our near-term validation milestones are explicit:',
        milestones: [
            {
                id: 'mile-1',
                text: 'Convert pilot discussions into paid design partner engagements',
                isNext: true
            },
            {
                id: 'mile-2',
                text: 'Validate signal quality and false-positive reduction in live environments',
                isNext: false
            },
            {
                id: 'mile-3',
                text: 'Establish 1–2 referenceable enterprise customers',
                isNext: false
            },
            {
                id: 'mile-4',
                text: 'Expand coverage and product scope based on real operational feedback',
                isNext: false
            }
        ],
        closing: 'Customer proof will compound quickly once pilots begin.'
    },

    investorSummary: {
        eyebrow: 'INVESTOR SUMMARY',
        summary: 'At pre-seed, our customer proof is not logos — it is consistent enterprise validation of the problem, alignment on the solution requirements, and serious engagement toward paid pilots.'
    },

    slideNavTitles: [
        'Thesis',
        'Signals',
        'Aligned',
        'Engaged',
        'Artefacts',
        'Next',
        'Summary'
    ]
};

export default CUSTOMER_PROOF_CONFIG;
