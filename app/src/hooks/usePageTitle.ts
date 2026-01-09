import { useEffect } from 'react';

/**
 * Custom hook to set the document title with ArrestDelta branding.
 * @param title - The page-specific title (e.g., "Decks", "Dashboard")
 */
export function usePageTitle(title: string) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title ? `ArrestDelta | ${title}` : 'ArrestDelta';

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
}

export default usePageTitle;
