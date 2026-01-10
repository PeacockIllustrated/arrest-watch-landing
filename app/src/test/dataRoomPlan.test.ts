import { describe, it, expect } from 'vitest';
import {
    DATA_ROOM_SECTIONS,
    DATA_ROOM_DECK_PLAN,
    assertDeckPlanCoverage,
    getDecksGroupedBySection
} from '../lib/dataRoomPlan';

describe('dataRoomPlan', () => {
    describe('DATA_ROOM_SECTIONS', () => {
        it('has exactly 3 sections', () => {
            expect(DATA_ROOM_SECTIONS).toHaveLength(3);
        });

        it('sections are in correct order', () => {
            const titles = DATA_ROOM_SECTIONS
                .sort((a, b) => a.order - b.order)
                .map(s => s.id);
            expect(titles).toEqual(['core-thesis', 'execution-plan', 'early-traction']);
        });

        it('early-traction section is marked as gated', () => {
            const earlyTraction = DATA_ROOM_SECTIONS.find(s => s.id === 'early-traction');
            expect(earlyTraction?.isGated).toBe(true);
            expect(earlyTraction?.gatedBadge).toBe('Request access');
        });
    });

    describe('DATA_ROOM_DECK_PLAN', () => {
        it('has exactly 18 decks', () => {
            expect(DATA_ROOM_DECK_PLAN).toHaveLength(18);
        });

        it('Core Thesis has 8 decks', () => {
            const coreThesis = DATA_ROOM_DECK_PLAN.filter(d => d.sectionId === 'core-thesis');
            expect(coreThesis).toHaveLength(8);
        });

        it('Execution Plan has 7 decks', () => {
            const executionPlan = DATA_ROOM_DECK_PLAN.filter(d => d.sectionId === 'execution-plan');
            expect(executionPlan).toHaveLength(7);
        });

        it('Early Traction has 3 gated decks', () => {
            const earlyTraction = DATA_ROOM_DECK_PLAN.filter(d => d.sectionId === 'early-traction');
            expect(earlyTraction).toHaveLength(3);
            expect(earlyTraction.every(d => d.isLocked)).toBe(true);
        });
    });

    describe('assertDeckPlanCoverage', () => {
        it('validates all 18 decks exist in registry', () => {
            const result = assertDeckPlanCoverage();

            expect(result.totalExpected).toBe(18);
            expect(result.isValid).toBe(true);
            expect(result.missingFromRegistry).toEqual([]);
            expect(result.unexpectedInRegistry).toEqual([]);
            expect(result.matchedCount).toBe(18);
        });
    });

    describe('getDecksGroupedBySection', () => {
        it('returns decks organized by section', () => {
            const grouped = getDecksGroupedBySection();

            expect(grouped.size).toBe(3);

            // Verify each section has correct deck count
            const entries = Array.from(grouped.entries());
            const coreThesis = entries.find(([s]) => s.id === 'core-thesis');
            const executionPlan = entries.find(([s]) => s.id === 'execution-plan');
            const earlyTraction = entries.find(([s]) => s.id === 'early-traction');

            expect(coreThesis?.[1]).toHaveLength(8);
            expect(executionPlan?.[1]).toHaveLength(7);
            expect(earlyTraction?.[1]).toHaveLength(3);
        });
    });
});
