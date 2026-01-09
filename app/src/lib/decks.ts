// Shared deck configuration for both DeckDashboard and admin
// Add new decks here - they'll automatically appear everywhere

export interface Deck {
    id: string;
    title: string;
    route: string;
    category: 'investor' | 'partner';
    description: string;
    status: 'LIVE' | 'DRAFT';
    sourceDocPath?: string | string[];
    changelogPath?: string;
    selfcheckPath?: string;
    tags?: string[];
}

export const DECKS: Deck[] = [
    // Investor Materials
    {
        id: 'investor-deck',
        title: 'INVESTOR DECK',
        route: '/investor-delta',
        category: 'investor',
        description: 'Full pitch deck with problem, solution, market, and traction',
        status: 'LIVE'
    },
    {
        id: 'valuation',
        title: 'VALUATION RATIONALE',
        route: '/investor-delta/appendix/valuation',
        category: 'investor',
        description: 'Appendix: Multiples, ARR projections, and comparable analysis',
        status: 'LIVE'
    },
    {
        id: 'why-problem',
        title: 'WHY THIS PROBLEM',
        route: '/investor-delta/why',
        category: 'investor',
        description: 'Deep dive into market friction and timing tailwinds',
        status: 'LIVE'
    },
    {
        id: 'market-sizing',
        title: 'MARKET SIZING',
        route: '/investor-delta/appendix/market-sizing',
        category: 'investor',
        description: 'Serviceable market analysis: SAM, SOM, and expansion levers',
        status: 'LIVE'
    },
    {
        id: 'use-of-funds',
        title: 'USE OF FUNDS',
        route: '/investor-delta/appendix/use-of-funds',
        category: 'investor',
        description: 'Milestone-based capital allocation and de-risking strategy',
        status: 'LIVE'
    },
    {
        id: 'why-now',
        title: 'WHY NOW',
        route: '/investor-delta/appendix/why-now',
        category: 'investor',
        description: 'Timing thesis: risk environment, regulatory shifts, and enterprise readiness',
        status: 'LIVE'
    },
    {
        id: 'competitive-landscape',
        title: 'COMPETITIVE LANDSCAPE',
        route: '/investor-delta/appendix/competitive-landscape',
        category: 'investor',
        description: 'Ecosystem analysis: timeliness vs. decision confidence and defensive moat',
        status: 'LIVE'
    },
    {
        id: 'technical-defensibility',
        title: 'TECHNICAL DEFENSIBILITY',
        route: '/investor-delta/appendix/technical-defensibility',
        category: 'investor',
        description: 'Deep technical moat: verification logic, compounding learning, and execution complexity',
        status: 'LIVE'
    },
    {
        id: 'kill-criteria',
        title: 'KILL CRITERIA',
        route: '/investor-delta/appendix/kill-criteria',
        category: 'investor',
        description: 'Downside discipline: failure conditions, capital triggers, and scale guardrails',
        status: 'LIVE'
    },
    {
        id: 'product-flow',
        title: 'PRODUCT FLOW',
        route: '/investor-delta/product-flow',
        category: 'investor',
        description: 'Infrastructure flow: Unverified signals -> Verification Gate -> Actionable Alerts',
        status: 'LIVE'
    },
    {
        id: 'founder-investor-fit',
        title: 'FOUNDER–INVESTOR FIT',
        route: '/investor-delta/appendix/founder-investor-fit',
        category: 'investor',
        description: 'Values and operating system alignment for long-term partnership',
        status: 'LIVE'
    },
    {
        id: 'customer-proof',
        title: 'CUSTOMER PROOF',
        route: '/investor-delta/appendix/customer-proof',
        category: 'investor',
        description: 'Early validation: enterprise signals, solution alignment, and engagement depth',
        status: 'LIVE'
    },
    {
        id: 'gtm-plan',
        title: 'GTM PLAN',
        route: '/gtm',
        category: 'investor',
        description: 'Go-to-market strategy: ICP, pricing, sales motion, and capital allocation',
        status: 'LIVE'
    },
    {
        id: 'revenue-model',
        title: '12-MONTH REVENUE MODEL',
        route: '/revenue-model',
        category: 'investor',
        description: 'Conservative revenue projections: 6 enterprise accounts, $1.025M ARR',
        status: 'LIVE'
    },
    {
        id: 'operational-scenarios',
        title: 'OPERATIONAL SCENARIOS',
        route: '/investor-delta/operational-scenarios',
        category: 'investor',
        description: 'Before/After scenarios: Risk profile changes and decision logic',
        status: 'LIVE',
        sourceDocPath: [
            '/supporting-docs/Customer Risk Scenario Example.md',
            '/supporting-docs/Example Decision Scenario.md'
        ],
        changelogPath: '/supporting-docs/operational-scenarios.changelog.md',
        selfcheckPath: '/supporting-docs/operational-scenarios.selfcheck.md',
        tags: ['scenarios', 'before-after', 'risk']
    },
    {
        id: 'technical-appendix-system-logic',
        title: 'TECHNICAL APPENDIX — SYSTEM LOGIC',
        route: '/investor-delta/appendix/technical-appendix-system-logic',
        category: 'investor',
        description: 'System logic deep dive: detection, identity, verification, and routing architecture.',
        status: 'LIVE',
        sourceDocPath: [
            '/supporting-docs/ArrestDelta - Product flow.md',
            '/supporting-docs/Technical Appendix (System Overview).md',
            '/supporting-docs/Technical Breakdown by Flow Step.md'
        ],
        changelogPath: '/supporting-docs/technical-appendix-system-logic.changelog.md',
        selfcheckPath: '/supporting-docs/technical-appendix-system-logic.selfcheck.md',
        tags: ['appendix', 'architecture', 'verification-first']
    },

    // Partner Materials
    {
        id: 'uber-overview',
        title: 'UBER OVERVIEW',
        route: '/uber',
        category: 'partner',
        description: 'Platform partnership pitch for trust infrastructure',
        status: 'LIVE'
    },
    {
        id: 'uber-close',
        title: 'UBER CLOSE PLAN',
        route: '/uber-close',
        category: 'partner',
        description: 'Pilot structure, rollout timeline, and deal terms',
        status: 'LIVE'
    },
    {
        id: 'uber-economics',
        title: 'UBER ECONOMICS',
        route: '/uber-economics',
        category: 'partner',
        description: 'ROI analysis: why the pilot pays for itself immediately',
        status: 'LIVE'
    },
];

export const getDeckById = (id: string): Deck | undefined => DECKS.find(d => d.id === id);
export const getInvestorDecks = (): Deck[] => DECKS.filter(d => d.category === 'investor');
export const getPartnerDecks = (): Deck[] => DECKS.filter(d => d.category === 'partner');
