// =============================================================================
// DEMO JURISDICTIONS - Florida counties for Uber demo
// =============================================================================

export interface DemoJurisdiction {
    jurisdictionId: string; // FIPS id matching DeepMapViz (e.g., "c12086")
    displayName: string;
    stateCode: string;
    defaultHealth: 'healthy' | 'degraded' | 'down';
}

/**
 * Demo jurisdictions - 8 Florida counties
 * IDs match the county_map.tsx FIPS format
 */
export const DEMO_JURISDICTIONS: DemoJurisdiction[] = [
    { jurisdictionId: 'c12086', displayName: 'Miami-Dade County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12011', displayName: 'Broward County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12099', displayName: 'Palm Beach County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12095', displayName: 'Orange County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12057', displayName: 'Hillsborough County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12031', displayName: 'Duval County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12103', displayName: 'Pinellas County', stateCode: 'FL', defaultHealth: 'healthy' },
    { jurisdictionId: 'c12071', displayName: 'Lee County', stateCode: 'FL', defaultHealth: 'healthy' },
];

/**
 * Lookup map for quick access
 */
export const JURISDICTION_MAP: Record<string, DemoJurisdiction> = Object.fromEntries(
    DEMO_JURISDICTIONS.map((j) => [j.jurisdictionId, j])
);
