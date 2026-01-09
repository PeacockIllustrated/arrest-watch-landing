// Shared deck configuration for both DeckDashboard and admin
// Add new decks here - they'll automatically appear everywhere

export interface Deck {
    id: string;
    title: string;
    route: string;
    category: 'investor' | 'partner';
    description: string;
    status: 'LIVE' | 'DRAFT';
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
        id: 'why-now',
        title: 'WHY NOW',
        route: '/investor-delta/appendix/why-now',
        category: 'investor',
        description: 'Timing thesis: risk environment, regulatory shifts, and enterprise readiness',
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
