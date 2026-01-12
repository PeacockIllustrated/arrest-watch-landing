/**
 * Technical Defensibility Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Technical Defensibility.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/technical-defensibility.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string[];
}

export interface CountyVarianceSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string;
    varianceFactors: string[];
    conclusion: string;
    callout: string;
}

export interface ChangeDetectionSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string;
    scrapingApproach: {
        title: string;
        bullets: string[];
    };
    statefulApproach: {
        title: string;
        bullets: string[];
    };
    requirements: string[];
    callout: string;
}

export interface VerificationLogicSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string;
    evaluationCriteria: string[];
    improvementFactors: string[];
    callout: string;
}

export interface FalsePositivesSection {
    id: string;
    eyebrow: string;
    headline: string;
    competitorOptimization: {
        title: string;
        bullets: string[];
    };
    ourOptimization: {
        title: string;
        bullets: string[];
    };
    requirements: string[];
    callout: string;
}

export interface InfrastructureSection {
    id: string;
    eyebrow: string;
    headline: string;
    content: string;
    expansionBenefits: string[];
    flywheel: string;
    learningNote: string;
    callout: string;
}

export interface HardToCopySection {
    id: string;
    eyebrow: string;
    headline: string;
    competitorNeeds: string[];
    callout: string;
}

export interface RestraintSection {
    id: string;
    eyebrow: string;
    headline: string;
    deliberateChoicesIntro: string;
    deliberateChoices: string[];
    callout: string;
    closing: string;
}

export interface InvestorSummarySection {
    eyebrow: string;
    summary: string;
}

export interface TechnicalDefensibilityConfig {
    thesis: ThesisSection;
    countyVariance: CountyVarianceSection;
    changeDetection: ChangeDetectionSection;
    verificationLogic: VerificationLogicSection;
    falsePositives: FalsePositivesSection;
    infrastructure: InfrastructureSection;
    hardToCopy: HardToCopySection;
    restraint: RestraintSection;
    investorSummary: InvestorSummarySection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const TECHNICAL_DEFENSIBILITY_CONFIG: TechnicalDefensibilityConfig = {
    thesis: {
        id: 'thesis',
        eyebrow: 'TECHNICAL DEFENSIBILITY',
        headline: 'Defensibility Is Not IP. It Is Execution Under Real-World Constraints.',
        content: [
            'Arrest Delta is not defensible because of a single algorithm or proprietary dataset.',
            'It is defensible because it operates in a problem space where real-world complexity compounds faster than competitors can copy.',
            'Our advantage is built on operational learning, verification logic, and accumulated edge cases, not surface-level data access.'
        ]
    },

    countyVariance: {
        id: 'county-variance',
        eyebrow: 'CORE BARRIER',
        headline: 'County-Level Variance Is the Core Barrier',
        content: 'Arrest and booking data does not behave like a normalized dataset. Each jurisdiction differs across:',
        varianceFactors: [
            'Data structures',
            'Update timing',
            'Field semantics',
            'Correction behavior',
            'Error patterns',
            'Human intervention points'
        ],
        conclusion: 'This variance is not visible until systems are monitored continuously, at scale, over time.',
        callout: 'Competitors can scrape records. What they cannot shortcut is learning how each system actually changes in practice. This learning compounds with every additional jurisdiction.'
    },

    changeDetection: {
        id: 'change-detection',
        eyebrow: 'STATE AWARENESS',
        headline: 'Change Detection Is Not the Same as Scraping',
        content: 'Most systems treat arrest data as static records:',
        scrapingApproach: {
            title: 'Row-Based Approach',
            bullets: [
                'Ingest',
                'Refresh',
                'Compare rows'
            ]
        },
        statefulApproach: {
            title: 'Stateful Entity Model',
            bullets: [
                'Transitions, not rows',
                'Material changes, not cosmetic updates',
                'Temporal plausibility, not just field differences'
            ]
        },
        requirements: [
            'Historical context',
            'State awareness',
            'Multi-step verification logic'
        ],
        callout: 'A scraper can detect "something changed." It cannot determine whether the change is meaningful, real, or actionable.'
    },

    verificationLogic: {
        id: 'verification-logic',
        eyebrow: 'COMPOUNDING ACCURACY',
        headline: 'Verification Logic Compounds Over Time',
        content: 'Our system does not treat all deltas equally. Each detected change is evaluated against:',
        evaluationCriteria: [
            'Source reliability patterns',
            'Timing consistency',
            'Structural vs cosmetic updates',
            'Known correction behaviors',
            'Jurisdiction-specific quirks'
        ],
        improvementFactors: [
            'More events are observed',
            'More false positives are filtered',
            'More edge cases are resolved'
        ],
        callout: 'Accuracy improves with scale, not linearly, but cumulatively. This creates a learning curve advantage that is difficult to replicate quickly.'
    },

    falsePositives: {
        id: 'false-positives',
        eyebrow: 'HARDEST PROBLEM',
        headline: 'False Positives Are the Hardest Problem, and the Most Valuable to Solve',
        competitorOptimization: {
            title: 'Competitors Optimize For',
            bullets: [
                'Coverage',
                'Speed',
                'Volume'
            ]
        },
        ourOptimization: {
            title: 'We Optimize For',
            bullets: [
                'Confidence',
                'Defensibility',
                'Decision suitability'
            ]
        },
        requirements: [
            'Knowing when not to alert',
            'Suppressing noise without missing real events',
            'Accepting delayed signals over incorrect ones'
        ],
        callout: 'This tradeoff is counterintuitive and culturally hard for data teams focused on volume. Enterprises reward this approach - but it takes time to build correctly.'
    },

    infrastructure: {
        id: 'infrastructure',
        eyebrow: 'CROSS-CUSTOMER LEARNING',
        headline: 'Infrastructure Gets Stronger With Each Customer',
        content: 'ArrestDelta benefits from cross-customer learning at the decision infrastructure layer without sharing customer data.',
        expansionBenefits: [
            'More jurisdictions are observed',
            'More update patterns are learned',
            'Verification improves globally'
        ],
        flywheel: 'Coverage → learning → accuracy → trust → expansion',
        learningNote: 'This learning requires long-running observation of real correction behavior across jurisdictions - something that cannot be simulated or backfilled.',
        callout: 'A new entrant starts at zero.'
    },

    hardToCopy: {
        id: 'hard-to-copy',
        eyebrow: 'BARRIER DEPTH',
        headline: 'Why This Is Hard to Copy Quickly',
        competitorNeeds: [
            'Monitor hundreds of jurisdictions continuously',
            'Build and maintain jurisdiction-specific state-aware models',
            'Learn correction and update behaviors over time',
            'Absorb false-positive pain across real enterprise customers',
            'Earn enterprise trust while iterating'
        ],
        callout: 'This is not a 6-month engineering project. It is a multi-year operational learning curve.'
    },

    restraint: {
        id: 'restraint',
        eyebrow: 'STRATEGIC DISCIPLINE',
        headline: 'Our Defensibility Grows With Restraint',
        deliberateChoicesIntro: 'We deliberately trade short-term optics for long-term defensibility:',
        deliberateChoices: [
            'Avoid premature over-expansion',
            'Limit event types',
            'Prioritize accuracy over speed'
        ],
        callout: 'This slows short-term surface progress but strengthens long-term defensibility.',
        closing: 'The product becomes harder to replace as customers embed it into decision workflows.'
    },

    investorSummary: {
        eyebrow: 'INVESTOR SUMMARY',
        summary: 'Arrest Delta is defensible because it solves the hardest problem in arrest intelligence: verified change detection under real-world variability. That advantage compounds with every jurisdiction and every event observed.'
    },

    slideNavTitles: [
        'Thesis', 'Variance', 'Detection', 'Verification', 'False Positives', 'Infrastructure', 'Barriers', 'Restraint', 'Summary'
    ]
};

export default TECHNICAL_DEFENSIBILITY_CONFIG;
