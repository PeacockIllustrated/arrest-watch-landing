/**
 * FIPS Code Mapping Utilities
 *
 * Converts between database county IDs, FIPS codes, and SVG FIPS codes.
 *
 * Database FIPS format: "12086" (5-digit, state + county)
 * SVG FIPS format: "c12086" (prefixed with 'c')
 */

import type { CountyModel } from '../types/viewModels';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Florida's state FIPS code */
export const FLORIDA_STATE_FIPS = '12';

/** Prefix used in SVG FIPS codes */
export const SVG_FIPS_PREFIX = 'c';

// =============================================================================
// CONVERSION FUNCTIONS
// =============================================================================

/**
 * Convert database FIPS to SVG FIPS format
 * @example "12086" -> "c12086"
 */
export function toSvgFips(databaseFips: string): string {
  return `${SVG_FIPS_PREFIX}${databaseFips}`;
}

/**
 * Convert SVG FIPS to database FIPS format
 * @example "c12086" -> "12086"
 */
export function fromSvgFips(svgFips: string): string {
  if (svgFips.startsWith(SVG_FIPS_PREFIX)) {
    return svgFips.slice(SVG_FIPS_PREFIX.length);
  }
  return svgFips;
}

/**
 * Check if an SVG FIPS code is for a Florida county
 * @example "c12086" -> true, "c01001" -> false
 */
export function isFloridaFips(svgFips: string): boolean {
  const fips = fromSvgFips(svgFips);
  return fips.startsWith(FLORIDA_STATE_FIPS);
}

// =============================================================================
// COUNTY ID <-> FIPS MAPPING
// =============================================================================

/**
 * Build a Map from county ID to SVG FIPS code
 */
export function buildCountyIdToFipsMap(
  counties: CountyModel[]
): Map<number, string> {
  const map = new Map<number, string>();
  for (const county of counties) {
    if (county.fips) {
      map.set(county.countyId, toSvgFips(county.fips));
    }
  }
  return map;
}

/**
 * Build a Map from SVG FIPS to county ID
 */
export function buildFipsToCountyIdMap(
  counties: CountyModel[]
): Map<string, number> {
  const map = new Map<string, number>();
  for (const county of counties) {
    if (county.fips) {
      map.set(toSvgFips(county.fips), county.countyId);
    }
  }
  return map;
}

/**
 * Build a Map from SVG FIPS to county name
 */
export function buildFipsToCountyNameMap(
  counties: CountyModel[]
): Map<string, string> {
  const map = new Map<string, string>();
  for (const county of counties) {
    if (county.fips) {
      map.set(toSvgFips(county.fips), county.name);
    }
  }
  return map;
}

// =============================================================================
// RECORD COUNT MAPPING
// =============================================================================

/**
 * Convert county-indexed record counts to SVG FIPS-indexed counts
 */
export function toSvgFipsRecordCounts(
  countyRecordCounts: Map<number, number>,
  counties: CountyModel[]
): Map<string, number> {
  const countyIdToFips = buildCountyIdToFipsMap(counties);
  const svgCounts = new Map<string, number>();

  for (const [countyId, count] of countyRecordCounts) {
    const svgFips = countyIdToFips.get(countyId);
    if (svgFips) {
      svgCounts.set(svgFips, count);
    }
  }

  return svgCounts;
}

// =============================================================================
// DEMO DATA FIPS CODES
// =============================================================================

/**
 * Demo FIPS codes for Florida counties with record counts
 * Format: SVG FIPS -> demo record count
 */
export const DEMO_COUNTY_RECORD_COUNTS: Map<string, number> = new Map([
  ['c12086', 2450], // Miami-Dade
  ['c12011', 1820], // Broward
  ['c12057', 1340], // Hillsborough
  ['c12095', 1150], // Orange
  ['c12099', 980], // Palm Beach
  ['c12031', 850], // Duval (Jacksonville)
  ['c12103', 720], // Pinellas
  ['c12071', 680], // Lee
  ['c12097', 540], // Osceola
  ['c12081', 490], // Manatee
  ['c12115', 420], // Sarasota
  ['c12001', 380], // Alachua
  ['c12009', 350], // Brevard
  ['c12069', 320], // Lake
  ['c12127', 290], // Volusia
  ['c12117', 260], // Seminole
  ['c12105', 230], // Polk
  ['c12083', 200], // Marion
  ['c12073', 180], // Leon
  ['c12033', 160], // Escambia
  ['c12111', 140], // St. Lucie
  ['c12019', 120], // Clay
  ['c12089', 100], // Nassau
  ['c12109', 95], // St. Johns
  ['c12015', 85], // Charlotte
  ['c12017', 75], // Citrus
  ['c12055', 70], // Highlands
  ['c12053', 65], // Hernando
  ['c12085', 60], // Martin
  ['c12061', 55], // Indian River
  ['c12005', 50], // Bay
  ['c12091', 45], // Okaloosa
  ['c12113', 40], // Santa Rosa
  ['c12107', 35], // Putnam
  ['c12027', 32], // DeSoto
  ['c12049', 28], // Hardee
  ['c12093', 25], // Okeechobee
  ['c12043', 22], // Glades
  ['c12051', 20], // Hendry
  ['c12039', 18], // Gadsden
  ['c12079', 15], // Madison
  ['c12123', 12], // Taylor
  ['c12121', 10], // Suwannee
  ['c12023', 8], // Columbia
  ['c12007', 6], // Bradford
  ['c12045', 5], // Gulf
  ['c12037', 4], // Franklin
  ['c12029', 3], // Dixie
  ['c12047', 2], // Hamilton
  ['c12041', 2], // Gilchrist
]);

/**
 * Counties without a digital source (show hatched pattern)
 * These are Florida counties where we can't scrape data yet
 */
export const UNAVAILABLE_COUNTY_FIPS: Set<string> = new Set([
  'c12003', // Baker
  'c12013', // Calhoun
  'c12035', // Flagler
  'c12059', // Holmes
  'c12063', // Jackson
  'c12065', // Jefferson
  'c12067', // Lafayette
  'c12075', // Levy
  'c12077', // Liberty
  'c12125', // Union
  'c12129', // Wakulla
  'c12131', // Walton
]);

/**
 * Get the county name for an SVG FIPS code from the demo data
 */
export function getDemoCountyName(svgFips: string): string {
  const names: Record<string, string> = {
    'c12086': 'Miami-Dade',
    'c12011': 'Broward',
    'c12057': 'Hillsborough',
    'c12095': 'Orange',
    'c12099': 'Palm Beach',
    'c12031': 'Duval',
    'c12103': 'Pinellas',
    'c12071': 'Lee',
    'c12097': 'Osceola',
    'c12081': 'Manatee',
    'c12115': 'Sarasota',
    'c12001': 'Alachua',
    'c12009': 'Brevard',
    'c12069': 'Lake',
    'c12127': 'Volusia',
    'c12117': 'Seminole',
    'c12105': 'Polk',
    'c12083': 'Marion',
    'c12073': 'Leon',
    'c12033': 'Escambia',
    'c12003': 'Baker',
    'c12013': 'Calhoun',
    'c12035': 'Flagler',
    'c12059': 'Holmes',
    'c12063': 'Jackson',
    'c12065': 'Jefferson',
    'c12067': 'Lafayette',
    'c12075': 'Levy',
    'c12077': 'Liberty',
    'c12125': 'Union',
    'c12129': 'Wakulla',
    'c12131': 'Walton',
  };
  return names[svgFips] || svgFips;
}
