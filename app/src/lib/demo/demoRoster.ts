// =============================================================================
// DEMO ROSTER - Synthetic monitored individuals for Uber demo
// =============================================================================

export interface DemoRosterEntry {
    personId: string;
    displayName: string;
    dobYear: number;
    jurisdictionId: string; // Links to DEMO_JURISDICTIONS
}

// Synthetic first and last name pools
const FIRST_NAMES = [
    'James', 'Michael', 'Robert', 'David', 'William', 'John', 'Richard', 'Thomas',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Andrew',
    'Maria', 'Jennifer', 'Elizabeth', 'Linda', 'Patricia', 'Susan', 'Jessica',
    'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley',
];

const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
];

// Distribution weights per county (higher = more roster entries)
const COUNTY_WEIGHTS: Record<string, number> = {
    'c12086': 20, // Miami-Dade - largest
    'c12011': 15, // Broward
    'c12099': 12, // Palm Beach
    'c12095': 12, // Orange
    'c12057': 10, // Hillsborough
    'c12031': 8,  // Duval
    'c12103': 8,  // Pinellas
    'c12071': 5,  // Lee
};

/**
 * Generate deterministic roster entries
 */
function generateRoster(): DemoRosterEntry[] {
    const roster: DemoRosterEntry[] = [];
    let idCounter = 1;

    Object.entries(COUNTY_WEIGHTS).forEach(([jurisdictionId, count]) => {
        for (let i = 0; i < count; i++) {
            const firstName = FIRST_NAMES[(idCounter * 7) % FIRST_NAMES.length];
            const lastName = LAST_NAMES[(idCounter * 11) % LAST_NAMES.length];
            const dobYear = 1960 + (idCounter % 40); // Range: 1960-1999

            roster.push({
                personId: `PER-${String(idCounter).padStart(4, '0')}`,
                displayName: `${firstName} ${lastName}`,
                dobYear,
                jurisdictionId,
            });

            idCounter++;
        }
    });

    return roster;
}

/**
 * Full demo roster - 90 synthetic individuals
 */
export const DEMO_ROSTER: DemoRosterEntry[] = generateRoster();

/**
 * Get roster entries by jurisdiction
 */
export function getRosterByJurisdiction(jurisdictionId: string): DemoRosterEntry[] {
    return DEMO_ROSTER.filter((entry) => entry.jurisdictionId === jurisdictionId);
}

/**
 * Get a random person from a jurisdiction
 */
export function getRandomPersonFromJurisdiction(jurisdictionId: string): DemoRosterEntry | null {
    const entries = getRosterByJurisdiction(jurisdictionId);
    if (entries.length === 0) return null;
    return entries[Math.floor(Math.random() * entries.length)];
}
