// =============================================================================
// HASH UTILITY - Simple FNV-1a for audit chain integrity (no dependencies)
// =============================================================================

const FNV_PRIME = 0x01000193;
const FNV_OFFSET = 0x811c9dc5;

/**
 * FNV-1a 32-bit hash function
 * Simple, fast, deterministic hash suitable for demo integrity chains
 */
export function hashString(input: string): string {
    let hash = FNV_OFFSET;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, FNV_PRIME);
    }
    // Convert to unsigned 32-bit and then to hex
    return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Build a chain hash from previous hash and current payload
 * This creates the "tamper-evident" feel for the audit trail
 */
export function buildAuditChainHash(prevHash: string, payload: object): string {
    const serialised = JSON.stringify(payload, Object.keys(payload).sort());
    const combined = `${prevHash}:${serialised}`;
    return hashString(combined);
}
