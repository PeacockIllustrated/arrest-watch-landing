/**
 * Founder–Investor Fit Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Founder - Investor Fit.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/founder-investor-fit.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    id: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    keyStance: string;
    intro: string;
}

export interface AlignmentItem {
    id: string;
    text: string;
    whyMatters?: string;
}

export interface LookingForSection {
    id: string;
    eyebrow: string;
    headline: string;
    intro: string;
    items: AlignmentItem[];
    closing: string;
}

export interface NotOptimizedSection {
    id: string;
    eyebrow: string;
    headline: string;
    intro: string;
    items: AlignmentItem[];
    closing: string;
}

export interface GrowthStage {
    id: string;
    label: string;
    bulletIndices: number[];
}

export interface GrowthSection {
    id: string;
    eyebrow: string;
    headline: string;
    bullets: string[];
    conviction: string;
    stages: GrowthStage[];
}

export interface PartnershipTerm {
    id: string;
    term: string;
    detail: string;
}

export interface PartnershipSection {
    id: string;
    eyebrow: string;
    headline: string;
    intro: string;
    terms: PartnershipTerm[];
    reciprocal: string;
}

export interface ClosingSection {
    id: string;
    eyebrow: string;
    statement: string[];
    partnershipProfile: string;
}

export interface FounderInvestorFitConfig {
    thesis: ThesisSection;
    lookingFor: LookingForSection;
    notOptimized: NotOptimizedSection;
    growth: GrowthSection;
    partnership: PartnershipSection;
    closing: ClosingSection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const FOUNDER_INVESTOR_FIT_CONFIG: FounderInvestorFitConfig = {
    thesis: {
        id: 'thesis',
        eyebrow: 'FOUNDER–INVESTOR FIT',
        headline: 'How We Think About Building ArrestDelta',
        subheadline: 'Enterprise decision infrastructure in a regulated, high-stakes environment.',
        keyStance: 'Accuracy and trust are the engine of scale.',
        intro: 'ArrestDelta is being built as enterprise decision infrastructure in a regulated, high-stakes environment. The opportunity is large, the demand is real, and we are determined to build a high-growth, category-defining business.'
    },

    lookingFor: {
        id: 'looking-for',
        eyebrow: 'ALIGNMENT INDICATORS',
        headline: 'What We\'re Looking For in an Investor',
        intro: 'We are looking for investors who are aligned with building a fast-growing enterprise company where growth is earned through reliability.',
        items: [
            {
                id: 'enterprise-understanding',
                text: 'Understand enterprise and regulated buying environments',
                whyMatters: 'Our buyers navigate complex procurement cycles.'
            },
            {
                id: 'accuracy-scale',
                text: 'Appreciate that accuracy and defensibility unlock scale, not limit it',
                whyMatters: 'In high-trust markets, reliability enables expansion.'
            },
            {
                id: 'pilot-led',
                text: 'Are comfortable with pilot-led adoption that converts into large, durable contracts',
                whyMatters: 'Enterprise deals require validation before commitment.'
            },
            {
                id: 'strategy-tradeoffs',
                text: 'Can engage thoughtfully on strategy, tradeoffs, and sequencing',
                whyMatters: 'Decisions require nuanced understanding of constraints.'
            },
            {
                id: 'long-term-ambition',
                text: 'Share our ambition to build a meaningful, long-term business',
                whyMatters: 'Durable outcomes require sustained commitment.'
            }
        ],
        closing: 'We welcome investors who push us on growth, as long as growth is grounded in evidence, not shortcuts.'
    },

    notOptimized: {
        id: 'not-optimized',
        eyebrow: 'MISALIGNMENT INDICATORS',
        headline: 'What We Are Not Optimized For',
        intro: 'ArrestDelta is not being built as a hype-driven or optics-first business.',
        items: [
            {
                id: 'data-integrity',
                text: 'Growth strategies that compromise data integrity or signal confidence',
                whyMatters: 'Eroding trust undermines the core value proposition.'
            },
            {
                id: 'premature-scope',
                text: 'Expanding scope before the core product is proven at scale',
                whyMatters: 'Premature expansion dilutes focus and increases risk.'
            },
            {
                id: 'volume-gtm',
                text: 'Volume-driven GTM approaches that create downstream risk',
                whyMatters: 'Low-quality adoption leads to churn and reputation damage.'
            },
            {
                id: 'short-term-valuation',
                text: 'Businesses designed primarily around short-term valuation or narrative momentum',
                whyMatters: 'Optics-first approaches do not compound in high-trust markets.'
            }
        ],
        closing: 'We believe these approaches ultimately cap growth in high-trust markets like ours.'
    },

    growth: {
        id: 'growth',
        eyebrow: 'GROWTH PHILOSOPHY',
        headline: 'Our View on Growth',
        bullets: [
            'Solving a problem enterprises already pay for',
            'Delivering materially better outcomes than existing solutions',
            'Expanding coverage, customers, and use cases once trust is established',
            'Becoming embedded infrastructure rather than a point solution'
        ],
        conviction: 'In this market, accuracy scales faster than speed alone.',
        stages: [
            {
                id: 'pilot-signal',
                label: 'Pilot signal',
                bulletIndices: [0, 1]
            },
            {
                id: 'reliability-proven',
                label: 'Reliability proven',
                bulletIndices: [1, 2]
            },
            {
                id: 'scale-expansion',
                label: 'Scale expansion',
                bulletIndices: [2, 3]
            }
        ]
    },

    partnership: {
        id: 'partnership',
        eyebrow: 'PARTNERSHIP TERMS',
        headline: 'How We Think About Partnership',
        intro: 'We view investors as long-term partners in decision-making, not just sources of capital.',
        terms: [
            {
                id: 'dialogue',
                term: 'Dialogue',
                detail: 'Direct, honest dialogue'
            },
            {
                id: 'milestones',
                term: 'Milestones',
                detail: 'Alignment on milestones and capital discipline'
            },
            {
                id: 'reassess',
                term: 'Reassess',
                detail: 'Willingness to reassess assumptions when evidence changes'
            },
            {
                id: 'complexity',
                term: 'Respect complexity',
                detail: 'Respect for operational complexity'
            }
        ],
        reciprocal: 'In return, we commit to transparency, rigor, and accountability as we scale ArrestDelta.'
    },

    closing: {
        id: 'closing',
        eyebrow: 'CLOSING THOUGHT',
        statement: [
            'We are ambitious about what ArrestDelta can become.',
            'We are equally disciplined about how we get there.',
            'The right investors will recognize that this combination-high ambition with operational restraint-is what enables durable, outsized outcomes.'
        ],
        partnershipProfile: 'long-term / evidence-led / enterprise-native'
    },

    slideNavTitles: [
        'Thesis',
        'Aligned',
        'Avoid',
        'Growth',
        'Partnership',
        'Close'
    ]
};

export default FOUNDER_INVESTOR_FIT_CONFIG;
