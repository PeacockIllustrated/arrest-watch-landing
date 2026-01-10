/**
 * Data Room Plan - Single Source of Truth
 * 
 * This file defines the complete structure of the Data Room:
 * - 3 sections (Core Thesis, Execution Plan, Early Traction)
 * - 18 decks mapped to sections with ordering
 * - Verification helper to ensure registry consistency
 */

import { DECKS, type Deck } from './decks';

// ============================================================================
// SECTION DEFINITIONS
// ============================================================================

export interface DataRoomSection {
    id: string;
    title: string;
    description?: string;
    order: number;
    isGated?: boolean;
    gatedBadge?: string;
    gatedSubheader?: string;
    gatedFooter?: string;
}

export const DATA_ROOM_SECTIONS: DataRoomSection[] = [
    {
        id: 'core-thesis',
        title: 'CORE THESIS',
        description: 'Foundation materials covering problem, market, and solution architecture.',
        order: 1
    },
    {
        id: 'execution-plan',
        title: 'EXECUTION PLAN',
        description: 'Go-to-market strategy, financials, and operational roadmap.',
        order: 2
    },
    {
        id: 'early-traction',
        title: 'EARLY TRACTION AND STRATEGIC UPSIDE',
        order: 3,
        isGated: true,
        gatedBadge: 'Request access',
        gatedSubheader: 'Selected enterprise materials are available on request to keep the core diligence path clean.',
        gatedFooter: 'Questions welcome — we\'ll share full access to customer-specific materials on request.'
    }
];

// ============================================================================
// DECK PLAN (Expected deck titles with section assignments)
// ============================================================================

export interface DeckPlanEntry {
    /** Expected deck title (case-insensitive match) */
    title: string;
    /** Section ID this deck belongs to */
    sectionId: string;
    /** Order within the section (1-indexed) */
    orderWithinSection: number;
    /** Whether this deck requires special access */
    isLocked?: boolean;
}

/**
 * The canonical 18-deck plan.
 * Order here defines display order within each section.
 */
export const DATA_ROOM_DECK_PLAN: DeckPlanEntry[] = [
    // SECTION 1: CORE THESIS (8 decks)
    { title: 'Investor Deck', sectionId: 'core-thesis', orderWithinSection: 1 },
    { title: 'Why This Problem', sectionId: 'core-thesis', orderWithinSection: 2 },
    { title: 'Why Now', sectionId: 'core-thesis', orderWithinSection: 3 },
    { title: 'Market Sizing', sectionId: 'core-thesis', orderWithinSection: 4 },
    { title: 'Competitive Landscape', sectionId: 'core-thesis', orderWithinSection: 5 },
    { title: 'Technical Defensibility', sectionId: 'core-thesis', orderWithinSection: 6 },
    { title: 'Technical Appendix — System Logic', sectionId: 'core-thesis', orderWithinSection: 7 },
    { title: 'Operational Scenarios', sectionId: 'core-thesis', orderWithinSection: 8 },

    // SECTION 2: EXECUTION PLAN (7 decks)
    { title: 'GTM Plan', sectionId: 'execution-plan', orderWithinSection: 1 },
    { title: 'Customer Proof', sectionId: 'execution-plan', orderWithinSection: 2 },
    { title: '12-Month Revenue Model', sectionId: 'execution-plan', orderWithinSection: 3 },
    { title: 'Use of Funds', sectionId: 'execution-plan', orderWithinSection: 4 },
    { title: 'Kill Criteria', sectionId: 'execution-plan', orderWithinSection: 5 },
    { title: 'Founder–Investor Fit', sectionId: 'execution-plan', orderWithinSection: 6 },
    { title: 'Valuation Rationale', sectionId: 'execution-plan', orderWithinSection: 7 },

    // SECTION 3: EARLY TRACTION (3 gated decks)
    { title: 'Uber Overview', sectionId: 'early-traction', orderWithinSection: 1, isLocked: true },
    { title: 'Uber Economics', sectionId: 'early-traction', orderWithinSection: 2, isLocked: true },
    { title: 'Uber Close Plan', sectionId: 'early-traction', orderWithinSection: 3, isLocked: true }
];

// ============================================================================
// VERIFICATION HELPER
// ============================================================================

/**
 * Normalizes a title for comparison (lowercase, remove special chars, trim)
 */
function normalizeTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[—–-]/g, ' ')  // Normalize dashes
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')    // Collapse whitespace
        .trim();
}

export interface DeckCoverageResult {
    isValid: boolean;
    missingFromRegistry: string[];
    unexpectedInRegistry: string[];
    matchedCount: number;
    totalExpected: number;
}

/**
 * Verifies that the deck plan matches the actual registry.
 * Returns detailed results about any mismatches.
 */
export function assertDeckPlanCoverage(): DeckCoverageResult {
    const planTitles = DATA_ROOM_DECK_PLAN.map(d => normalizeTitle(d.title));
    const registryTitles = DECKS.map(d => normalizeTitle(d.title));

    const missingFromRegistry: string[] = [];
    const unexpectedInRegistry: string[] = [];
    let matchedCount = 0;

    // Check each planned deck exists in registry
    DATA_ROOM_DECK_PLAN.forEach(planDeck => {
        const normalized = normalizeTitle(planDeck.title);
        if (!registryTitles.includes(normalized)) {
            missingFromRegistry.push(planDeck.title);
        } else {
            matchedCount++;
        }
    });

    // Check for unexpected decks in registry
    DECKS.forEach(regDeck => {
        const normalized = normalizeTitle(regDeck.title);
        if (!planTitles.includes(normalized)) {
            unexpectedInRegistry.push(regDeck.title);
        }
    });

    const isValid = missingFromRegistry.length === 0 && unexpectedInRegistry.length === 0;

    return {
        isValid,
        missingFromRegistry,
        unexpectedInRegistry,
        matchedCount,
        totalExpected: DATA_ROOM_DECK_PLAN.length
    };
}

/**
 * Logs verification results to console.
 * Call this on module load in development.
 */
export function logDeckPlanVerification(): void {
    const result = assertDeckPlanCoverage();

    if (result.isValid) {
        console.log(
            `%c✓ Data Room Plan: All ${result.totalExpected} decks verified`,
            'color: #4CAF50; font-weight: bold;'
        );
    } else {
        console.error(
            `%c✗ Data Room Plan MISMATCH`,
            'color: #e40028; font-weight: bold; font-size: 14px;'
        );
        if (result.missingFromRegistry.length > 0) {
            console.error('  Missing from registry:', result.missingFromRegistry);
        }
        if (result.unexpectedInRegistry.length > 0) {
            console.error('  Unexpected in registry:', result.unexpectedInRegistry);
        }
        console.error(`  Matched: ${result.matchedCount}/${result.totalExpected}`);
    }
}

// ============================================================================
// HELPERS FOR UI CONSUMPTION
// ============================================================================

/**
 * Returns decks organized by section for rendering.
 */
export function getDecksGroupedBySection(): Map<DataRoomSection, Deck[]> {
    const result = new Map<DataRoomSection, Deck[]>();

    // Initialize sections in order
    DATA_ROOM_SECTIONS.forEach(section => {
        result.set(section, []);
    });

    // Get plan entries sorted by section order then deck order
    const sortedPlan = [...DATA_ROOM_DECK_PLAN].sort((a, b) => {
        const sectionA = DATA_ROOM_SECTIONS.find(s => s.id === a.sectionId);
        const sectionB = DATA_ROOM_SECTIONS.find(s => s.id === b.sectionId);
        if (!sectionA || !sectionB) return 0;
        if (sectionA.order !== sectionB.order) {
            return sectionA.order - sectionB.order;
        }
        return a.orderWithinSection - b.orderWithinSection;
    });

    // Match plan entries to actual decks
    sortedPlan.forEach(planEntry => {
        const normalizedPlan = normalizeTitle(planEntry.title);
        const deck = DECKS.find(d => normalizeTitle(d.title) === normalizedPlan);
        const section = DATA_ROOM_SECTIONS.find(s => s.id === planEntry.sectionId);

        if (deck && section) {
            result.get(section)?.push(deck);
        }
    });

    return result;
}

/**
 * Gets the section for a given deck ID.
 */
export function getSectionForDeck(deckId: string): DataRoomSection | undefined {
    const deck = DECKS.find(d => d.id === deckId);
    if (!deck) return undefined;

    const normalizedDeckTitle = normalizeTitle(deck.title);
    const planEntry = DATA_ROOM_DECK_PLAN.find(
        p => normalizeTitle(p.title) === normalizedDeckTitle
    );

    if (!planEntry) return undefined;
    return DATA_ROOM_SECTIONS.find(s => s.id === planEntry.sectionId);
}

/**
 * Checks if a deck should be locked based on plan.
 */
export function isDeckGatedByPlan(deckId: string): boolean {
    const deck = DECKS.find(d => d.id === deckId);
    if (!deck) return false;

    const normalizedDeckTitle = normalizeTitle(deck.title);
    const planEntry = DATA_ROOM_DECK_PLAN.find(
        p => normalizeTitle(p.title) === normalizedDeckTitle
    );

    return planEntry?.isLocked ?? false;
}

// Run verification in development
if (import.meta.env.DEV) {
    logDeckPlanVerification();
}
