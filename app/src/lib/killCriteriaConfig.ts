/**
 * Kill Criteria & Downside Discipline Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Kill Criteria & Downside Discipline.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/kill-criteria.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    id: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    content: string[];
}

export interface KillCriterion {
    id: string;
    title: string;
    condition: string;
    rationale: string;
    action: string[];
    actionSummary?: string;
    timeWindowBadge?: string;
}

export interface TriggerBlock {
    id: string;
    eyebrow: string;
    headline: string;
    condition: string;
    actions: string[];
    closing: string;
}

export interface InvestorSummarySection {
    eyebrow: string;
    summary: string;
    finalNote: string;
}

export interface KillCriteriaConfig {
    thesis: ThesisSection;
    criteria: KillCriterion[];
    trigger: TriggerBlock;
    investorSummary: InvestorSummarySection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const KILL_CRITERIA_CONFIG: KillCriteriaConfig = {
    thesis: {
        id: 'thesis',
        eyebrow: 'KILL CRITERIA & DOWNSIDE DISCIPLINE',
        headline: 'We Define Failure Conditions Upfront',
        subheadline: 'This is not pessimism. It is risk management.',
        content: [
            'Arrest Delta operates in a high-stakes, enterprise environment where discipline matters.',
            'We believe strong companies are built by defining what success looks like and what failure looks like before capital is fully deployed.',
            'We define clear conditions under which we would pause, materially change direction, or discontinue the current approach.'
        ]
    },

    criteria: [
        {
            id: 'signal-confidence',
            title: 'Inability to Achieve Signal Confidence',
            condition: 'If we cannot demonstrate, in live pilot environments, that ArrestDelta materially reduces false positives and delivers decision-grade confidence relative to existing processes within the first 6 months.',
            rationale: 'If verified change detection does not materially outperform current approaches, the core thesis does not hold.',
            action: [
                'Event definitions',
                'Verification logic',
                'Product scope'
            ],
            actionSummary: 'We would halt GTM expansion and reassess. If confidence cannot be achieved, we would not scale.',
            timeWindowBadge: '≤ 6 months'
        },
        {
            id: 'willingness-to-pay',
            title: 'Lack of Willingness to Pay',
            condition: 'If enterprises validate the problem but are unwilling to engage in paid pilots or early contracts within 6–9 months.',
            rationale: 'Time investment without budget commitment indicates interest, not demand.',
            action: [
                'ICP focus',
                'Pricing and packaging',
                'Buyer persona alignment'
            ],
            actionSummary: 'We would reassess. We will not subsidize validation indefinitely.',
            timeWindowBadge: '6–9 months'
        },
        {
            id: 'non-repeatable-sales',
            title: 'Non-Repeatable Sales Motion',
            condition: 'If early enterprise deals prove to be purely relationship-driven and cannot be replicated beyond initial accounts.',
            rationale: 'A business that depends on unique personal relationships does not scale.',
            action: [],
            actionSummary: 'We would pause hiring and expansion, refine positioning, and validate whether the value proposition resonates independently of specific relationships.'
        },
        {
            id: 'sales-cycle-exceeds',
            title: 'Sales Cycle Exceeds Enterprise Reality',
            condition: 'If the average sales cycle consistently exceeds 9 months without clear progress toward commitment.',
            rationale: 'Extended cycles indicate either insufficient urgency or misaligned value.',
            action: [],
            actionSummary: 'We would narrow scope further, target higher-urgency buyers, or repackage the offering.',
            timeWindowBadge: '≤ 9 months'
        },
        {
            id: 'regulatory-friction',
            title: 'Regulatory or Legal Friction Is Structural',
            condition: 'If legal, compliance, or regulatory stakeholders consistently block pilots despite technical and operational alignment.',
            rationale: 'If the product cannot be deployed defensibly, adoption will stall regardless of value.',
            action: [
                'Product framing',
                'Delivery model',
                'Market selection'
            ],
            actionSummary: 'We would reassess. We will not push against immovable institutional barriers.'
        }
    ],

    trigger: {
        id: 'capital-discipline-trigger',
        eyebrow: 'CAPITAL DISCIPLINE TRIGGER',
        headline: 'If two or more kill criteria are met simultaneously',
        condition: 'Two or more kill criteria met simultaneously',
        actions: [
            'Freeze non-essential spend',
            'Halt headcount expansion',
            'Reassess the core thesis with board and advisors',
            'Determine whether to pivot, narrow, or wind down'
        ],
        closing: 'This ensures capital is preserved and decisions are made deliberately.'
    },

    investorSummary: {
        eyebrow: 'INVESTOR SUMMARY',
        summary: 'We define failure conditions upfront because we are building enterprise decision infrastructure - and discipline is part of the product.',
        finalNote: 'These kill criteria are not expectations of failure. They are guardrails to ensure we only scale when the core thesis is proven.'
    },

    slideNavTitles: [
        'Thesis',
        'Console',
        'Signal',
        'Payment',
        'Sales',
        'Cycle',
        'Legal',
        'Trigger',
        'Summary'
    ]
};

export default KILL_CRITERIA_CONFIG;
