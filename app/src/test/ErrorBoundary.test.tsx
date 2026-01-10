import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">Hello World</div>
            </ErrorBoundary>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
        const ThrowError = () => {
            throw new Error('Test error');
        };

        const customFallback = <div data-testid="custom-fallback">Custom Error</div>;

        // Suppress console.error for this test
        const originalError = console.error;
        console.error = () => { };

        render(
            <ErrorBoundary fallback={customFallback}>
                <ThrowError />
            </ErrorBoundary>
        );

        console.error = originalError;

        expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
});
