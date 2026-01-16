import { useState, useCallback, useRef, useEffect } from 'react';
import type { SourceRef, Snapshot, ParsedRecord, Diff, ChangeEvent, CountyHealth } from '../lib/contracts/pipeline';
import { DEMO_JURISDICTIONS, JURISDICTION_MAP } from '../lib/demo/demoJurisdictions';
import { getRandomPersonFromJurisdiction, getRosterByJurisdiction } from '../lib/demo/demoRoster';

// =============================================================================
// DEMO SIMULATOR HOOK
// =============================================================================

const PARSER_VERSION = 'v4.2';
const MAX_EVENTS = 50;

// Charge pools for variety
const CHARGE_POOLS = {
    booking_created: [
        ['Driving Under Influence', 'Reckless Driving'],
        ['Possession - Controlled Substance'],
        ['Disorderly Conduct', 'Resisting Arrest'],
        ['Petit Theft'],
        ['Assault - Simple'],
        ['Trespassing'],
    ],
    charge_updated: [
        ['Aggravated Assault'],
        ['Grand Theft'],
        ['DUI - Second Offence'],
        ['Battery'],
    ],
};

// Generate unique IDs
function uid(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Generate a hash-like string
function fakeHash(): string {
    return Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 14);
}

// Format ISO timestamp
function nowISO(): string {
    return new Date().toISOString();
}

// Random integer in range
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick random from array
function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export interface DemoSimulatorState {
    isOn: boolean;
    events: ChangeEvent[];
    coverageByCounty: Array<{ jurisdictionId: string; monitoredCount: number; displayName: string }>;
    countyHealth: Record<string, CountyHealth>;
    activePulse: { jurisdictionId: string; atISO: string } | null;
}

export interface DemoSimulatorActions {
    start: () => void;
    stop: () => void;
    reset: () => void;
    pulse: (jurisdictionId: string) => void;
    markStatus: (eventId: string, status: 'new' | 'reviewed' | 'escalated') => void;
}

export type UseDemoSimulatorReturn = DemoSimulatorState & DemoSimulatorActions;

/**
 * Core demo simulator hook - emits evidence-backed ChangeEvents
 */
export function useDemoSimulator(): UseDemoSimulatorReturn {
    const [isOn, setIsOn] = useState(false);
    const [events, setEvents] = useState<ChangeEvent[]>([]);
    const [countyHealth, setCountyHealth] = useState<Record<string, CountyHealth>>(() => {
        const initial: Record<string, CountyHealth> = {};
        const now = nowISO();
        DEMO_JURISDICTIONS.forEach((j) => {
            initial[j.jurisdictionId] = {
                jurisdictionId: j.jurisdictionId,
                state: j.defaultHealth,
                lastSuccessfulScanAtISO: now,
                lastAttemptAtISO: now,
                latencyMs: randInt(80, 200),
                parserVersionLabel: `${PARSER_VERSION} (Verified)`,
            };
        });
        return initial;
    });
    const [activePulse, setActivePulse] = useState<{ jurisdictionId: string; atISO: string } | null>(null);

    const intervalRef = useRef<number | null>(null);
    const healthDriftRef = useRef<number | null>(null);

    // Coverage by county (static based on roster)
    const coverageByCounty = DEMO_JURISDICTIONS.map((j) => ({
        jurisdictionId: j.jurisdictionId,
        displayName: j.displayName,
        monitoredCount: getRosterByJurisdiction(j.jurisdictionId).length,
    }));

    // Weighted county selection based on health + roster size
    const selectWeightedCounty = useCallback((): string => {
        const weights: { id: string; weight: number }[] = [];
        DEMO_JURISDICTIONS.forEach((j) => {
            const health = countyHealth[j.jurisdictionId];
            let healthWeight = 1.0;
            if (health?.state === 'degraded') healthWeight = 0.5;
            if (health?.state === 'down') healthWeight = 0.0;
            const rosterSize = getRosterByJurisdiction(j.jurisdictionId).length;
            weights.push({ id: j.jurisdictionId, weight: rosterSize * healthWeight });
        });

        const total = weights.reduce((sum, w) => sum + w.weight, 0);
        if (total === 0) return DEMO_JURISDICTIONS[0].jurisdictionId;

        let r = Math.random() * total;
        for (const w of weights) {
            r -= w.weight;
            if (r <= 0) return w.id;
        }
        return weights[weights.length - 1].id;
    }, [countyHealth]);

    // Compute confidence based on deterministic factors
    const computeConfidence = useCallback((
        person: { displayName: string; dobYear: number },
        bookingRef: string,
        health: CountyHealth
    ): { confidence: number; reasons: string[] } => {
        let score = 0;
        const reasons: string[] = [];

        // +35 bookingRef present and stable
        if (bookingRef) {
            score += 35;
            reasons.push('Booking reference matched');
        }

        // +25 displayName match
        if (person.displayName) {
            score += 25;
            reasons.push('Full name matched');
        }

        // +15 dobYear match
        if (person.dobYear) {
            score += 15;
            reasons.push('Year of birth matched');
        }

        // Health penalties
        if (health.state === 'degraded') {
            score -= 20;
            reasons.push('Source degraded - reduced confidence');
        } else if (health.state === 'down') {
            score -= 40;
            reasons.push('Source down - significant uncertainty');
        }

        // Add some variance
        score += randInt(-5, 10);

        return {
            confidence: Math.max(0, Math.min(100, score)),
            reasons: reasons.slice(0, 3),
        };
    }, []);

    // Generate a ChangeEvent with full evidence bundle
    const generateEvent = useCallback((): ChangeEvent | null => {
        const jurisdictionId = selectWeightedCounty();
        const jurisdiction = JURISDICTION_MAP[jurisdictionId];
        if (!jurisdiction) return null;

        const person = getRandomPersonFromJurisdiction(jurisdictionId);
        if (!person) return null;

        const health = countyHealth[jurisdictionId];
        const now = nowISO();
        const bookingRef = `BK-${jurisdictionId.slice(1)}-${randInt(10000, 99999)}`;

        // Determine event type
        const eventTypes: ChangeEvent['eventType'][] = [
            'booking_created', 'booking_created', 'booking_created', // Weighted more
            'charge_updated',
            'custody_status_changed',
            'release_detected',
        ];
        const eventType = pick(eventTypes);

        // Create source reference
        const source: SourceRef = {
            sourceId: `SRC-${jurisdictionId}`,
            jurisdictionId,
            label: `${jurisdiction.displayName} Sheriff - Inmate Roster`,
            sourceType: 'html',
            canonicalUrl: `https://jail.${jurisdiction.displayName.toLowerCase().replace(/\s/g, '')}.gov/roster`,
        };

        // Create snapshots
        const snapshotBeforeId = `SNAP-${uid()}`;
        const snapshotAfterId = `SNAP-${uid()}`;

        const snapshotBefore: Snapshot = {
            snapshotId: snapshotBeforeId,
            source,
            capturedAtISO: new Date(Date.now() - randInt(60000, 300000)).toISOString(),
            contentType: 'text/html',
            fingerprintHash: fakeHash(),
            rawPreview: eventType === 'booking_created'
                ? `| Booking # | Name            | DOB  | Status     |\n|-----------|-----------------|------|------------|\n| (empty)   |                 |      |            |`
                : `| Booking # | Name            | DOB  | Status     |\n|-----------|-----------------|------|------------|\n| ${bookingRef} | ${person.displayName} | ${person.dobYear} | In Custody |`,
            parserVersion: PARSER_VERSION,
        };

        // Charges based on event type
        const chargesBefore = eventType === 'booking_created' ? [] : pick(CHARGE_POOLS.booking_created);
        const chargesAfter = eventType === 'charge_updated'
            ? [...chargesBefore, ...pick(CHARGE_POOLS.charge_updated)]
            : eventType === 'booking_created'
                ? pick(CHARGE_POOLS.booking_created)
                : chargesBefore;

        // Custody status changes
        const custodyBefore: ParsedRecord['custodyStatus'] = eventType === 'booking_created' ? 'unknown' : 'in_custody';
        const custodyAfter: ParsedRecord['custodyStatus'] = eventType === 'release_detected' ? 'released' : 'in_custody';

        const snapshotAfter: Snapshot = {
            snapshotId: snapshotAfterId,
            source,
            capturedAtISO: now,
            contentType: 'text/html',
            fingerprintHash: fakeHash(),
            rawPreview: eventType === 'release_detected'
                ? `| Booking # | Name            | DOB  | Status   |\n|-----------|-----------------|------|----------|\n| ${bookingRef} | ${person.displayName} | ${person.dobYear} | Released |`
                : `| Booking # | Name            | DOB  | Status     |\n|-----------|-----------------|------|------------|\n| ${bookingRef} | ${person.displayName} | ${person.dobYear} | In Custody |`,
            parserVersion: PARSER_VERSION,
        };

        // Create parsed records
        const { confidence, reasons } = computeConfidence(person, bookingRef, health);

        const recordBefore: ParsedRecord = {
            recordId: `REC-${uid()}`,
            snapshotId: snapshotBeforeId,
            jurisdictionId,
            observedAtISO: snapshotBefore.capturedAtISO,
            bookingRef: eventType === 'booking_created' ? '' : bookingRef,
            person: {
                personId: person.personId,
                displayName: person.displayName,
                dobYear: person.dobYear,
            },
            charges: chargesBefore,
            custodyStatus: custodyBefore,
            match: { matchConfidence: confidence, matchReasons: reasons },
        };

        const recordAfter: ParsedRecord = {
            recordId: `REC-${uid()}`,
            snapshotId: snapshotAfterId,
            jurisdictionId,
            observedAtISO: now,
            bookingRef,
            person: {
                personId: person.personId,
                displayName: person.displayName,
                dobYear: person.dobYear,
            },
            charges: chargesAfter,
            custodyStatus: custodyAfter,
            match: { matchConfidence: confidence, matchReasons: reasons },
        };

        // Create diff
        const changedFields: Diff['changedFields'] = [];
        let highlight = '';

        if (eventType === 'booking_created') {
            highlight = `New booking detected: ${bookingRef}`;
            changedFields.push({ field: 'bookingRef', before: '(none)', after: bookingRef });
            changedFields.push({ field: 'charges', before: '(none)', after: chargesAfter.join(', ') });
        } else if (eventType === 'charge_updated') {
            highlight = `Charges updated for ${bookingRef}`;
            changedFields.push({ field: 'charges', before: chargesBefore.join(', '), after: chargesAfter.join(', ') });
        } else if (eventType === 'custody_status_changed') {
            highlight = `Custody status changed for ${bookingRef}`;
            changedFields.push({ field: 'custodyStatus', before: 'in_custody', after: 'in_custody' });
        } else if (eventType === 'release_detected') {
            highlight = `Release detected for ${bookingRef}`;
            changedFields.push({ field: 'custodyStatus', before: 'in_custody', after: 'released' });
        }

        const diff: Diff = {
            diffId: `DIFF-${uid()}`,
            jurisdictionId,
            beforeSnapshotId: snapshotBeforeId,
            afterSnapshotId: snapshotAfterId,
            highlight,
            changedFields,
        };

        const event: ChangeEvent = {
            eventId: `EVT-${uid()}`,
            createdAtISO: now,
            jurisdictionId,
            eventType,
            personId: person.personId,
            confidence,
            confidenceReasons: reasons,
            evidence: {
                source,
                snapshotBefore,
                snapshotAfter,
                recordBefore,
                recordAfter,
                diff,
            },
            status: 'new',
        };

        return event;
    }, [selectWeightedCounty, countyHealth, computeConfidence]);

    // Emit event tick
    const tick = useCallback(() => {
        const event = generateEvent();
        if (event) {
            setEvents((prev) => [event, ...prev].slice(0, MAX_EVENTS));
            setActivePulse({ jurisdictionId: event.jurisdictionId, atISO: event.createdAtISO });

            // Update health - successful scan
            setCountyHealth((prev) => ({
                ...prev,
                [event.jurisdictionId]: {
                    ...prev[event.jurisdictionId],
                    lastSuccessfulScanAtISO: event.createdAtISO,
                    lastAttemptAtISO: event.createdAtISO,
                    latencyMs: randInt(50, 150),
                },
            }));
        }
    }, [generateEvent]);

    // Health drift - randomly degrade/heal counties
    const healthDrift = useCallback(() => {
        const jurisdictionId = pick(DEMO_JURISDICTIONS).jurisdictionId;
        const currentHealth = countyHealth[jurisdictionId];

        if (currentHealth.state === 'healthy') {
            // Small chance to degrade
            if (Math.random() < 0.3) {
                const newState = Math.random() < 0.7 ? 'degraded' : 'down';
                setCountyHealth((prev) => ({
                    ...prev,
                    [jurisdictionId]: {
                        ...prev[jurisdictionId],
                        state: newState as 'healthy' | 'degraded' | 'down',
                        latencyMs: newState === 'degraded' ? randInt(500, 1500) : randInt(2000, 5000),
                        lastAttemptAtISO: nowISO(),
                    },
                }));

                // Self-heal after delay
                setTimeout(() => {
                    setCountyHealth((prev) => ({
                        ...prev,
                        [jurisdictionId]: {
                            ...prev[jurisdictionId],
                            state: 'healthy',
                            latencyMs: randInt(80, 200),
                            lastSuccessfulScanAtISO: nowISO(),
                        },
                    }));
                }, randInt(10000, 25000));
            }
        }
    }, [countyHealth]);

    // Start simulator
    const start = useCallback(() => {
        if (isOn) return;
        setIsOn(true);

        // Event emission interval (3.5-6s randomised)
        const scheduleNext = () => {
            intervalRef.current = window.setTimeout(() => {
                tick();
                scheduleNext();
            }, randInt(3500, 6000));
        };
        scheduleNext();

        // Health drift interval (20-40s)
        const scheduleHealthDrift = () => {
            healthDriftRef.current = window.setTimeout(() => {
                healthDrift();
                scheduleHealthDrift();
            }, randInt(20000, 40000));
        };
        scheduleHealthDrift();
    }, [isOn, tick, healthDrift]);

    // Stop simulator
    const stop = useCallback(() => {
        setIsOn(false);
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
            intervalRef.current = null;
        }
        if (healthDriftRef.current) {
            clearTimeout(healthDriftRef.current);
            healthDriftRef.current = null;
        }
    }, []);

    // Reset simulator
    const reset = useCallback(() => {
        stop();
        setEvents([]);
        setActivePulse(null);
        const now = nowISO();
        const resetHealth: Record<string, CountyHealth> = {};
        DEMO_JURISDICTIONS.forEach((j) => {
            resetHealth[j.jurisdictionId] = {
                jurisdictionId: j.jurisdictionId,
                state: 'healthy',
                lastSuccessfulScanAtISO: now,
                lastAttemptAtISO: now,
                latencyMs: randInt(80, 200),
                parserVersionLabel: `${PARSER_VERSION} (Verified)`,
            };
        });
        setCountyHealth(resetHealth);
    }, [stop]);

    // Manual pulse trigger
    const pulse = useCallback((jurisdictionId: string) => {
        setActivePulse({ jurisdictionId, atISO: nowISO() });
    }, []);

    // Mark event status
    const markStatus = useCallback((eventId: string, status: 'new' | 'reviewed' | 'escalated') => {
        setEvents((prev) =>
            prev.map((e) => (e.eventId === eventId ? { ...e, status } : e))
        );
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
            if (healthDriftRef.current) clearTimeout(healthDriftRef.current);
        };
    }, []);

    return {
        isOn,
        events,
        coverageByCounty,
        countyHealth,
        activePulse,
        start,
        stop,
        reset,
        pulse,
        markStatus,
    };
}

export default useDemoSimulator;
