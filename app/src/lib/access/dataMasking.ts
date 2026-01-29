/**
 * Data Masking Utilities - PII protection for restricted access tiers
 *
 * Provides functions to mask sensitive data based on user permissions.
 */

import type { UserRole } from '../../components/portal/AuthProvider';
import type { RecordDetailModel, RecordSearchResult } from '../types/viewModels';
import { getPermissionsForRole } from './tierConfig';

// =============================================================================
// MASKING CONSTANTS
// =============================================================================

/** Masked value placeholder */
export const MASKED_VALUE = '***';
export const MASKED_DATE = 'XX/XX/XXXX';
export const MASKED_NUMBER = '—';

// =============================================================================
// INDIVIDUAL FIELD MASKING
// =============================================================================

/**
 * Mask a date of birth - shows only the year (e.g., "XX/XX/1990")
 */
export function maskDob(dob: Date | string | null): string {
  if (!dob) return MASKED_DATE;

  const date = typeof dob === 'string' ? new Date(dob) : dob;
  if (isNaN(date.getTime())) return MASKED_DATE;

  // Show only the year
  return `XX/XX/${date.getFullYear()}`;
}

/**
 * Mask height value
 */
export function maskHeight(_heightInches: number | null): string {
  return MASKED_NUMBER;
}

/**
 * Mask weight value
 */
export function maskWeight(_weightLbs: number | null): string {
  return MASKED_NUMBER;
}

/**
 * Mask a generic string field
 */
export function maskString(_value: string | null): string {
  return MASKED_VALUE;
}

/**
 * Mask biometric score
 */
export function maskBiometricScore(_score: number | null): string {
  return MASKED_NUMBER;
}

// =============================================================================
// RECORD MASKING
// =============================================================================

/**
 * Apply masking to a RecordDetailModel based on user role
 */
export function maskRecordDetail(
  record: RecordDetailModel,
  role: UserRole | null
): RecordDetailModel {
  const permissions = getPermissionsForRole(role);

  // Clone the record to avoid mutation
  const masked = { ...record };

  // Mask DOB if not permitted
  if (!permissions.canSeeDob && record.dob) {
    masked.dob = null; // Clear the Date object
    masked.formattedAge = record.age ? `${record.age}` : null; // Age is OK
  }

  // Mask physical description if not permitted
  if (!permissions.canSeePhysicalDescription) {
    masked.heightInches = null;
    masked.weightLbs = null;
    masked.hairColor = null;
    masked.eyeColor = null;
    masked.formattedHeight = null;
  }

  // Mask biometric data if not permitted
  if (!permissions.canSeeBiometric) {
    masked.biometricScore = null;
  }

  return masked;
}

/**
 * Apply masking to a RecordSearchResult based on user role
 * (Search results have less sensitive data, but we still need to control display)
 */
export function maskSearchResult(
  result: RecordSearchResult,
  role: UserRole | null
): RecordSearchResult {
  // Currently search results don't include highly sensitive fields
  // This is a placeholder for future expansion
  return result;
}

/**
 * Apply masking to an array of search results
 */
export function maskSearchResults(
  results: RecordSearchResult[],
  role: UserRole | null
): RecordSearchResult[] {
  return results.map((r) => maskSearchResult(r, role));
}

// =============================================================================
// DISPLAY HELPERS
// =============================================================================

/**
 * Get a masked or real value based on permission
 */
export function conditionalValue<T>(
  value: T,
  canAccess: boolean,
  maskedValue: string = MASKED_VALUE
): T | string {
  return canAccess ? value : maskedValue;
}

/**
 * Get DOB display string based on permission
 */
export function getDobDisplay(
  dob: Date | string | null,
  role: UserRole | null
): string {
  const permissions = getPermissionsForRole(role);

  if (!dob) return 'Unknown';

  if (!permissions.canSeeDob) {
    return maskDob(dob);
  }

  const date = typeof dob === 'string' ? new Date(dob) : dob;
  if (isNaN(date.getTime())) return 'Unknown';

  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

/**
 * Get height display string based on permission
 */
export function getHeightDisplay(
  heightInches: number | null,
  role: UserRole | null
): string {
  const permissions = getPermissionsForRole(role);

  if (heightInches === null) return 'Unknown';

  if (!permissions.canSeePhysicalDescription) {
    return MASKED_NUMBER;
  }

  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  return `${feet}'${inches}"`;
}

/**
 * Get weight display string based on permission
 */
export function getWeightDisplay(
  weightLbs: number | null,
  role: UserRole | null
): string {
  const permissions = getPermissionsForRole(role);

  if (weightLbs === null) return 'Unknown';

  if (!permissions.canSeePhysicalDescription) {
    return MASKED_NUMBER;
  }

  return `${weightLbs} lbs`;
}

/**
 * Get biometric score display based on permission
 */
export function getBiometricDisplay(
  score: number | null,
  role: UserRole | null
): string {
  const permissions = getPermissionsForRole(role);

  if (score === null) return 'N/A';

  if (!permissions.canSeeBiometric) {
    return MASKED_NUMBER;
  }

  return `${(score * 100).toFixed(0)}%`;
}

// =============================================================================
// FIELD RESTRICTION INDICATORS
// =============================================================================

/**
 * Check if a field should show a "restricted" indicator
 */
export function isFieldRestricted(
  field: 'dob' | 'physical' | 'biometric',
  role: UserRole | null
): boolean {
  const permissions = getPermissionsForRole(role);

  switch (field) {
    case 'dob':
      return !permissions.canSeeDob;
    case 'physical':
      return !permissions.canSeePhysicalDescription;
    case 'biometric':
      return !permissions.canSeeBiometric;
    default:
      return false;
  }
}
