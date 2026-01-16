// =============================================================================
// TIME UTILITIES - Shared time formatting helpers
// =============================================================================

/**
 * Format an ISO timestamp to a human-readable relative time string.
 * Returns 'Unknown' for invalid or missing input.
 * No external dependencies - uses native Date APIs only.
 */
export function formatRelativeTime(isoString: string | null | undefined): string {
    if (!isoString) return 'Unknown';

    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return 'Unknown';

        const diff = Date.now() - date.getTime();
        const seconds = Math.floor(diff / 1000);

        if (seconds < 0) return 'Just now'; // Future timestamps
        if (seconds < 60) return 'Just now';

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;

        // Fallback to short date for older timestamps
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    } catch {
        return 'Unknown';
    }
}

/**
 * Format an ISO timestamp for display as absolute time.
 * Returns the full ISO string for tooltips/details.
 */
export function formatAbsoluteTime(isoString: string | null | undefined): string {
    if (!isoString) return 'Unknown';

    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return 'Unknown';

        return date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return 'Unknown';
    }
}
