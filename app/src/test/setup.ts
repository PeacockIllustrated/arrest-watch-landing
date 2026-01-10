import '@testing-library/jest-dom';

// Global test setup
// This file runs before each test file

// Mock matchMedia for tests that use responsive design
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
});

// Mock scrollTo for tests
Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: () => { },
});
