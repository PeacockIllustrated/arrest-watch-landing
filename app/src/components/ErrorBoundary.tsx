import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Global Error Boundary for catching React render errors.
 * Shows a branded error screen and prevents full app crashes.
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error for debugging
        console.error('[ErrorBoundary] Caught error:', error);
        console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);

        // Call optional error handler
        this.props.onError?.(error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    handleReload = (): void => {
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default branded error screen
            return (
                <div style={{
                    minHeight: '100vh',
                    background: '#0a0a0a',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Roboto Mono', monospace",
                    color: '#fff',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    {/* Error Icon */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        border: '3px solid #e40028',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        fontSize: '2rem',
                        color: '#e40028'
                    }}>
                        ⚠
                    </div>

                    {/* Error Title */}
                    <h1 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        SYSTEM ERROR
                    </h1>

                    {/* Error Message */}
                    <p style={{
                        color: '#888',
                        maxWidth: '500px',
                        marginBottom: '2rem',
                        lineHeight: 1.6
                    }}>
                        An unexpected error occurred. Our team has been notified.
                    </p>

                    {/* Error Details (collapsible in prod) */}
                    {import.meta.env.DEV && this.state.error && (
                        <div style={{
                            background: 'rgba(228, 0, 40, 0.1)',
                            border: '1px solid #333',
                            padding: '1rem',
                            marginBottom: '2rem',
                            maxWidth: '600px',
                            overflow: 'auto',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            color: '#e40028'
                        }}>
                            <code>{this.state.error.message}</code>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={this.handleReset}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'transparent',
                                border: '1px solid #333',
                                color: '#fff',
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#e40028';
                                e.currentTarget.style.color = '#e40028';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#333';
                                e.currentTarget.style.color = '#fff';
                            }}
                        >
                            TRY AGAIN
                        </button>
                        <button
                            onClick={this.handleReload}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: '#e40028',
                                border: 'none',
                                color: '#fff',
                                fontFamily: 'inherit',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            RELOAD PAGE
                        </button>
                    </div>

                    {/* Support Link */}
                    <a
                        href="/"
                        style={{
                            marginTop: '2rem',
                            color: '#666',
                            fontSize: '0.8rem',
                            textDecoration: 'none'
                        }}
                    >
                        ← RETURN TO HOME
                    </a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
