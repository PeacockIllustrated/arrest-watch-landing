/**
 * Customer Access & Targeting Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Customer Access & Trageting.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/customer-access-targeting.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    id: string;
    eyebrow: string;
    headline: string;
    intro: string;
    keyFraming: string;
}

export interface Segment {
    id: string;
    name: string;
    shortName: string;
    isOptional: boolean;
    isPrimary: boolean;
    why: string[];
    buyerRoles: string[];
    accessStrategy: string[];
    marketingSupport: string[];
    outcome: string[];
    permissionNote?: string;
}

export interface MarketingRole {
    intro: string;
    does: string[];
    doesNot: string[];
}

export interface CoreAssets {
    intro: string;
    whitepaper: {
        label: string;
        title: string;
    };
    briefs: string[];
    thoughtLeadership: string;
    events: string;
    closing: string;
}

export interface CustomerAccessTargetingConfig {
    thesis: ThesisSection;
    segments: Segment[];
    marketingRole: MarketingRole;
    coreAssets: CoreAssets;
    triggers: {
        intro: string;
        items: string[];
        closing: string;
    };
    whyScales: string[];
    investorSummary: string;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const CUSTOMER_ACCESS_TARGETING_CONFIG: CustomerAccessTargetingConfig = {
    thesis: {
        id: 'thesis',
        eyebrow: 'CUSTOMER ACCESS & TARGETING',
        headline: 'We Combine Targeted Sales With Credibility-Led Marketing',
        intro: 'ArrestDelta is sold into environments where trust, risk, and defensibility matter. Our access strategy therefore combines:',
        keyFraming: 'Marketing is not used to create volume, it is used to establish legitimacy before the first meeting.'
    },

    segments: [
        {
            id: 'gig-marketplace',
            name: 'Gig & Marketplace Platforms',
            shortName: 'Gig/Marketplace',
            isOptional: false,
            isPrimary: true,
            why: [
                'Continuous exposure to arrest-related risk',
                'High sensitivity to false positives and wrongful action',
                'Existing background check and monitoring spend'
            ],
            buyerRoles: [
                'Trust & Safety leadership',
                'Public Safety Operations',
                'Security',
                'Legal (influence)'
            ],
            accessStrategy: [
                'Founder-led outreach to known buyers',
                'Warm introductions through Trust & Safety networks'
            ],
            marketingSupport: [
                'Thought leadership on false positives and decision risk',
                'ArrestDelta positioned as the "between-checks" layer',
                'Content shared internally by champions to Legal and Ops'
            ],
            outcome: [
                '3-5 enterprise customers',
                'High reference value',
                'Strong early validation'
            ]
        },
        {
            id: 'screening-providers',
            name: 'Background Screening Providers (as Customers & Partners)',
            shortName: 'Screening Providers',
            isOptional: true,
            isPrimary: false,
            why: [
                'Pressure from enterprise customers around noise and confidence',
                'Incentive to improve monitoring without cannibalising checks'
            ],
            buyerRoles: [
                'Product leadership',
                'Partnerships',
                'Enterprise sales leadership'
            ],
            accessStrategy: [
                'Direct product and partnership outreach',
                'Inbound credibility via ArrestDelta\'s public positioning'
            ],
            marketingSupport: [
                'Clear articulation of "verified change vs refresh"',
                'Coexistence narrative (augmentation, not replacement)',
                'Technical content demonstrating false-positive reduction'
            ],
            outcome: [
                '2-4 enterprise contracts or partnerships',
                'Distribution leverage',
                'Strategic optionality'
            ]
        },
        {
            id: 'regulated-enterprises',
            name: 'Regulated Enterprises With Manual Review Burden',
            shortName: 'Regulated Enterprises',
            isOptional: false,
            isPrimary: false,
            why: [
                'Existing internal arrest monitoring',
                'High analyst cost and compliance exposure',
                'Increasing audit and regulatory pressure'
            ],
            buyerRoles: [
                'Risk & Compliance',
                'Security Operations',
                'Legal'
            ],
            accessStrategy: [
                'Targeted outbound to known high-risk enterprises',
                'Introductions via law enforcement and compliance networks'
            ],
            marketingSupport: [
                'Executive briefs on legal risk of stale arrest data',
                '"Why false positives now cost more than missed events"',
                'Content designed for Legal, not just Security'
            ],
            outcome: [
                '2-3 high-ACV customers',
                'Slower cycles, very durable contracts'
            ],
            permissionNote: 'Marketing here creates permission to engage, not demand volume.'
        }
    ],

    marketingRole: {
        intro: 'Marketing is deliberately narrow and senior-focused.',
        does: [
            'Establish ArrestDelta as a credible new category',
            'Educate buyers before sales conversations',
            'Provide champions with material to sell internally',
            'Reduce perceived risk for Legal and Compliance'
        ],
        doesNot: [
            'High-volume lead generation',
            'Generic content',
            'Performance advertising',
            'SDR-driven outbound'
        ]
    },

    coreAssets: {
        intro: 'Core Marketing Assets (Year 1)',
        whitepaper: {
            label: 'Flagship whitepaper',
            title: '"Why arrest monitoring fails at scale and how enterprises fix it"'
        },
        briefs: [
            'Trust & Safety',
            'Legal & Compliance'
        ],
        thoughtLeadership: 'Thought leadership from founders and senior law enforcement leadership',
        events: 'Select event participation (Trust & Safety, Risk, Compliance)',
        closing: 'These assets directly support enterprise sales, they are not standalone campaigns.'
    },

    triggers: {
        intro: 'Deals typically start when:',
        items: [
            'Litigation & settlement figures get out of hand',
            'A high-profile incident occurs',
            'Legal reviews current processes',
            'An audit exposes false-positive risk',
            'Existing tools create alert fatigue'
        ],
        closing: 'Marketing ensures that when these triggers occur, ArrestDelta is already familiar.'
    },

    whyScales: [
        'Early traction is relationship-assisted, not relationship-dependent',
        'Marketing compounds credibility across multiple accounts simultaneously',
        'Sales cycles shorten as ArrestDelta becomes a known reference point',
        'Expansion occurs naturally as trust is established'
    ],

    investorSummary: 'We reach our first 20 customers through targeted enterprise sales, supported by credibility-led marketing that reduces buyer risk and accelerates adoption, not through volume-driven demand generation.',

    slideNavTitles: [
        'Thesis',
        'Targets',
        'Gig/Mktplace',
        'Screening',
        'Regulated',
        'Marketing Role',
        'Assets',
        'Triggers',
        'Why Scales'
    ]
};

export default CUSTOMER_ACCESS_TARGETING_CONFIG;
