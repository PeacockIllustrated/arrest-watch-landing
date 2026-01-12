/**
 * Why Now Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Why Now.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/why-now.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface WhyNowSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string;
    bullets?: string[];
    callout?: string;
}

export interface SystemicRiskSection extends WhyNowSection {
    signalChips: Array<{
        label: string;
        tooltip: string;
    }>;
    influences: string[];
}

export interface AuditabilitySection extends WhyNowSection {
    then: {
        title: string;
        bullets: string[];
    };
    now: {
        title: string;
        bullets: string[];
    };
}

export interface FalsePositivesSection extends WhyNowSection {
    coverageBullets: string[];
    confidenceBullets: string[];
}

export interface FragmentationSection extends WhyNowSection {
    fragmentationFactors: string[];
}

export interface EnterpriseReadySection extends WhyNowSection {
    capabilities: string[];
}

export interface AIStakesSection extends WhyNowSection {
    escalations: string[];
}

export interface WhyNowExistsSection extends WhyNowSection {
    reasons: string[];
    closing: string;
}

export interface InvestorSummarySection {
    eyebrow: string;
    summary: string;
}

export interface WhyNowConfig {
    systemicRisk: SystemicRiskSection;
    auditability: AuditabilitySection;
    falsePositives: FalsePositivesSection;
    fragmentation: FragmentationSection;
    enterpriseReady: EnterpriseReadySection;
    aiStakes: AIStakesSection;
    whyNowExists: WhyNowExistsSection;
    investorSummary: InvestorSummarySection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const WHY_NOW_CONFIG: WhyNowConfig = {
    systemicRisk: {
        id: 'systemic-risk',
        eyebrow: 'WHY NOW',
        headline: 'The Problem Is Not New. The Risk Is.',
        content: 'Arrest and booking data has always been fragmented, asynchronous, and inconsistent across jurisdictions. What has changed is how much damage bad or stale arrest data now causes and how quickly that damage propagates inside modern enterprises.',
        signalChips: [
            { label: 'Event-driven systems', tooltip: 'Automated pipelines that act on data changes in real-time' },
            { label: 'Automated decisions', tooltip: 'Trust & Safety and compliance workflows with minimal human review' },
            { label: 'Downstream propagation', tooltip: 'One bad signal cascades through multiple systems instantly' }
        ],
        influences: [
            'Trust & Safety actions',
            'Marketplace access decisions',
            'Compliance workflows',
            'Legal exposure',
            'Public and regulatory scrutiny'
        ],
        callout: 'In this environment, acting on incorrect or outdated arrest information is no longer a tolerable edge case-it is a systemic risk.'
    },

    auditability: {
        id: 'auditability',
        eyebrow: 'REGULATORY SHIFT',
        headline: 'Regulatory and Legal Pressure Has Shifted the Equation',
        content: 'Over the last several years, regulatory and legal expectations have changed materially.',
        then: {
            title: 'Defendable Then',
            bullets: [
                'Point to "data availability" as justification',
                'Manual review as acceptable due diligence',
                'Limited liability for automated decisions',
                'Low enforcement around data correctness'
            ]
        },
        now: {
            title: 'Defendable Now',
            bullets: [
                'Must demonstrate data accuracy at the moment of action',
                'Greater scrutiny of automated and semi-automated decisions',
                'Increased liability for wrongful deactivation or denial of access',
                'Higher standards for explainability, auditability, and accuracy',
                'Growing enforcement around data correctness and proportionality'
            ]
        }
    },

    falsePositives: {
        id: 'false-positives',
        eyebrow: 'COST INVERSION',
        headline: 'The Cost of False Positives Is Rising Faster Than the Cost of Missed Events',
        content: 'Historically, organizations optimized for coverage-more data, more alerts. Today, the dominant cost has shifted.',
        coverageBullets: [
            'More data sources',
            'More frequent refreshes',
            'More alerts surfaced',
            'Higher recall prioritized'
        ],
        confidenceBullets: [
            'Wrongful action',
            'Reversals and appeals',
            'Legal challenges',
            'Reputational harm',
            'Regulatory inquiry'
        ],
        callout: 'False positives now create more downstream risk than delayed awareness. This makes signal confidence-not data volume-the critical variable.'
    },

    fragmentation: {
        id: 'fragmentation',
        eyebrow: 'DATA COMPLEXITY',
        headline: 'Public Records Are Getting Harder, Not Easier',
        content: 'Public safety data is not converging into a clean, centralized system. Instead:',
        fragmentationFactors: [
            'Jurisdictions remain fragmented',
            'Update cycles are asynchronous',
            'Corrections and expungements are increasing',
            'Systems are modernizing unevenly',
            'Scraping hostility is rising'
        ],
        callout: 'As systems become more complex, change detection becomes harder, not easier. This favors infrastructure built specifically for state transitions, not bulk ingestion.'
    },

    enterpriseReady: {
        id: 'enterprise-ready',
        eyebrow: 'INFRASTRUCTURE MATURITY',
        headline: 'Enterprise Architecture Has Finally Caught Up',
        content: 'What was not viable 5-10 years ago is now practical:',
        capabilities: [
            'Event-driven systems are standard',
            'Webhooks and real-time pipelines are expected',
            'Enterprises want signals, not dashboards',
            'Automation requires deterministic inputs'
        ],
        callout: 'Enterprises are now ready to consume arrest data as verified events, not static records.'
    },

    aiStakes: {
        id: 'ai-stakes',
        eyebrow: 'AMPLIFICATION RISK',
        headline: 'AI Has Raised the Stakes',
        content: 'As more downstream decisions are automated or AI-assisted:',
        escalations: [
            'Errors propagate faster',
            'Decisions scale instantly',
            'Liability compounds'
        ],
        callout: 'Bad data no longer affects one case-it affects thousands. This makes verified change detection foundational, not optional.'
    },

    whyNowExists: {
        id: 'why-now-exists',
        eyebrow: 'THE CONVERGENCE',
        headline: 'Why Arrest Delta Exists Now',
        content: 'Arrest Delta exists because:',
        reasons: [
            'Enterprises are exposed to arrest data risk in ways they were not before',
            'Existing tools surface data refreshes, not meaningful change',
            'False positives now cost more than missed events',
            'Enterprises are structurally ready for event-based intelligence'
        ],
        closing: 'The problem has always existed. The consequences have finally caught up.'
    },

    investorSummary: {
        eyebrow: 'BOARD / INVESTOR SUMMARY',
        summary: 'Arrest Delta exists because modern enterprises can no longer afford to act on arrest data without knowing what has actually changed, and current systems were not built for that reality.'
    },

    slideNavTitles: [
        'Risk', 'Regulatory', 'Costs', 'Fragmentation', 'Enterprise', 'AI', 'Why Now', 'Summary'
    ]
};

export default WHY_NOW_CONFIG;
