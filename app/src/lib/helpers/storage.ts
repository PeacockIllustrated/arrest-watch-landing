// =============================================================================
// STORAGE HELPER - Signed URL management and forensic verification
// =============================================================================
// INVARIANT: All binary asset access MUST go through this helper.
// =============================================================================

import { supabase } from '../supabase';

// =============================================================================
// SIGNED URL CACHE
// Per-session cache to avoid re-signing loops.
// =============================================================================

interface SignedUrlCacheEntry {
    url: string;
    expiresAt: number; // Unix timestamp (ms)
}

const signedUrlCache = new Map<string, SignedUrlCacheEntry>();

/**
 * Generate a cache key for a storage path
 */
function cacheKey(bucket: string, storagePath: string): string {
    return `${bucket}:${storagePath}`;
}

/**
 * Get a signed URL for a private storage object.
 * Caches signed URLs per session to avoid re-signing loops.
 * 
 * @param bucket - The Supabase storage bucket ('mugshots' or 'evidence')
 * @param storagePath - The relative path within the bucket
 * @param expiresInSeconds - URL validity duration (default: 5 minutes)
 * @returns Signed URL string or null if error
 */
export async function getSignedUrl(
    bucket: 'mugshots' | 'evidence',
    storagePath: string,
    expiresInSeconds: number = 300
): Promise<string | null> {
    const key = cacheKey(bucket, storagePath);
    const now = Date.now();

    // Check cache
    const cached = signedUrlCache.get(key);
    if (cached && cached.expiresAt > now + 30000) {
        // Still valid with 30s buffer
        return cached.url;
    }

    // Fetch new signed URL
    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(storagePath, expiresInSeconds);

    if (error || !data?.signedUrl) {
        console.error('[storage] Failed to get signed URL:', error?.message);
        return null;
    }

    // Cache it
    signedUrlCache.set(key, {
        url: data.signedUrl,
        expiresAt: now + expiresInSeconds * 1000,
    });

    return data.signedUrl;
}

/**
 * Clear the signed URL cache (for logout/session reset)
 */
export function clearSignedUrlCache(): void {
    signedUrlCache.clear();
}

// =============================================================================
// FORENSIC VERIFICATION
// Uses Web Crypto to compute SHA-256 and compare with stored hash.
// =============================================================================

export interface VerificationResult {
    status: 'pass' | 'fail' | 'error';
    computedHash: string | null;
    expectedHash: string;
    verifiedAt: string; // ISO timestamp
    errorMessage?: string;
}

// Per-session verification result cache (not persisted)
const verificationCache = new Map<string, VerificationResult>();

/**
 * Verify the integrity of an evidence artifact by comparing SHA-256 hashes.
 * 
 * Process:
 * 1. Fetch the signed URL as a Blob
 * 2. Compute SHA-256 using Web Crypto
 * 3. Compare against the expected hash
 * 
 * @param signedUrl - The signed URL to the blob
 * @param expectedSha256 - The expected SHA-256 hash from evidence_snapshots
 * @param artifactId - Unique identifier for caching
 * @returns VerificationResult with pass/fail status
 */
export async function verifyIntegrity(
    signedUrl: string,
    expectedSha256: string,
    artifactId: string
): Promise<VerificationResult> {
    // Check cache
    const cached = verificationCache.get(artifactId);
    if (cached) {
        return cached;
    }

    const verifiedAt = new Date().toISOString();

    try {
        // Fetch blob
        const response = await fetch(signedUrl);
        if (!response.ok) {
            const result: VerificationResult = {
                status: 'error',
                computedHash: null,
                expectedHash: expectedSha256,
                verifiedAt,
                errorMessage: `Fetch failed: ${response.status} ${response.statusText}`,
            };
            verificationCache.set(artifactId, result);
            return result;
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Compute SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const computedHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

        // Compare
        const normalizedExpected = expectedSha256.toLowerCase();
        const normalizedComputed = computedHash.toLowerCase();

        const result: VerificationResult = {
            status: normalizedExpected === normalizedComputed ? 'pass' : 'fail',
            computedHash,
            expectedHash: expectedSha256,
            verifiedAt,
        };

        // Cache result
        verificationCache.set(artifactId, result);

        return result;
    } catch (error) {
        const result: VerificationResult = {
            status: 'error',
            computedHash: null,
            expectedHash: expectedSha256,
            verifiedAt,
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
        };
        verificationCache.set(artifactId, result);
        return result;
    }
}

/**
 * Get cached verification result (if available)
 */
export function getCachedVerification(artifactId: string): VerificationResult | null {
    return verificationCache.get(artifactId) || null;
}

/**
 * Clear verification cache (for session reset)
 */
export function clearVerificationCache(): void {
    verificationCache.clear();
}
