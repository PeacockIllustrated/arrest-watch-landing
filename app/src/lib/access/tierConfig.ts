/**
 * Tier Configuration - Role-based access control for RecordSearch
 *
 * Maps user roles to permissions for record access, pagination limits,
 * PII visibility, and export capabilities.
 */

import type { UserRole } from '../../components/portal/AuthProvider';

// =============================================================================
// PERMISSION TYPES
// =============================================================================

export type AccessTier = 'viewer' | 'analyst' | 'admin';

export interface TierPermissions {
  /** Human-readable tier name */
  tierName: string;
  /** Maximum records per page */
  pageSize: number;
  /** Maximum searches per minute (0 = unlimited) */
  searchRateLimit: number;
  /** Whether DOB is fully visible */
  canSeeDob: boolean;
  /** Whether physical description (height, weight, etc.) is visible */
  canSeePhysicalDescription: boolean;
  /** Whether mugshot images are visible */
  canSeeMugshot: boolean;
  /** Whether biometric data is visible */
  canSeeBiometric: boolean;
  /** Whether export to CSV is allowed */
  canExportCsv: boolean;
  /** Whether export to full data is allowed */
  canExportFull: boolean;
}

// =============================================================================
// TIER DEFINITIONS
// =============================================================================

export const TIER_PERMISSIONS: Record<AccessTier, TierPermissions> = {
  viewer: {
    tierName: 'Viewer',
    pageSize: 25,
    searchRateLimit: 30, // 30 searches per minute
    canSeeDob: false, // DOB masked
    canSeePhysicalDescription: false, // Restricted
    canSeeMugshot: true, // Mugshots visible
    canSeeBiometric: false, // Restricted
    canExportCsv: false,
    canExportFull: false,
  },
  analyst: {
    tierName: 'Analyst',
    pageSize: 50,
    searchRateLimit: 60, // 60 searches per minute
    canSeeDob: true, // Full DOB access
    canSeePhysicalDescription: true, // Full access
    canSeeMugshot: true,
    canSeeBiometric: true, // Full access
    canExportCsv: true, // CSV export allowed
    canExportFull: false,
  },
  admin: {
    tierName: 'Admin',
    pageSize: 100,
    searchRateLimit: 0, // Unlimited
    canSeeDob: true,
    canSeePhysicalDescription: true,
    canSeeMugshot: true,
    canSeeBiometric: true,
    canExportCsv: true,
    canExportFull: true, // Full export allowed
  },
};

// =============================================================================
// ROLE TO TIER MAPPING
// =============================================================================

/**
 * Map user roles to access tiers
 */
export function roleToTier(role: UserRole | null): AccessTier {
  switch (role) {
    case 'super_admin':
    case 'owner':
    case 'admin':
      return 'admin';
    case 'analyst':
      return 'analyst';
    case 'viewer':
    default:
      return 'viewer';
  }
}

/**
 * Get permissions for a user role
 */
export function getPermissionsForRole(role: UserRole | null): TierPermissions {
  const tier = roleToTier(role);
  return TIER_PERMISSIONS[tier];
}

// =============================================================================
// PERMISSION CHECK HELPERS
// =============================================================================

/**
 * Check if a role can access a specific field
 */
export function canAccessField(
  role: UserRole | null,
  field: 'dob' | 'physical' | 'mugshot' | 'biometric'
): boolean {
  const permissions = getPermissionsForRole(role);

  switch (field) {
    case 'dob':
      return permissions.canSeeDob;
    case 'physical':
      return permissions.canSeePhysicalDescription;
    case 'mugshot':
      return permissions.canSeeMugshot;
    case 'biometric':
      return permissions.canSeeBiometric;
    default:
      return false;
  }
}

/**
 * Get page size limit for a role
 */
export function getPageSizeForRole(role: UserRole | null): number {
  return getPermissionsForRole(role).pageSize;
}

/**
 * Check if a role can export data
 */
export function canExport(role: UserRole | null, exportType: 'csv' | 'full'): boolean {
  const permissions = getPermissionsForRole(role);
  return exportType === 'csv' ? permissions.canExportCsv : permissions.canExportFull;
}

// =============================================================================
// RESTRICTED FIELDS LIST
// =============================================================================

/**
 * List of fields that are restricted for viewer tier
 */
export const RESTRICTED_FIELDS = {
  viewer: ['dob', 'height_inches', 'weight_lbs', 'hair_color', 'eye_color', 'biometric_score'],
  analyst: [] as string[], // No restrictions
  admin: [] as string[], // No restrictions
} as const;

/**
 * Get list of restricted fields for a role
 */
export function getRestrictedFields(role: UserRole | null): readonly string[] {
  const tier = roleToTier(role);
  return RESTRICTED_FIELDS[tier];
}
