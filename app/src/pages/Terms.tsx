import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#0a0c10',
                color: '#f0f2f5',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                padding: '64px 24px',
            }}
        >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#8b9ab0',
                        textDecoration: 'none',
                        marginBottom: '32px',
                        fontSize: '0.875rem',
                    }}
                >
                    ← Back to Home
                </Link>

                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>
                    Terms of Service
                </h1>
                <p style={{ color: '#8b9ab0', marginBottom: '48px' }}>
                    Last updated: 1 January 2026
                </p>

                <div style={{ lineHeight: 1.8, color: '#c0c8d4' }}>
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using ArrestDelta's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            2. Use Licence
                        </h2>
                        <p>
                            Permission is granted to temporarily access the materials (information or software) on ArrestDelta's platform for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            3. Disclaimer
                        </h2>
                        <p>
                            The materials on ArrestDelta's platform are provided on an 'as is' basis. ArrestDelta makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            4. Limitations
                        </h2>
                        <p>
                            In no event shall ArrestDelta or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ArrestDelta's platform.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            5. Contact Us
                        </h2>
                        <p>
                            If you have questions about these Terms of Service, please contact us at{' '}
                            <a href="mailto:legal@arrestdelta.com" style={{ color: '#e40028' }}>
                                legal@arrestdelta.com
                            </a>
                        </p>
                    </section>
                </div>

                <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid #1e2433', color: '#4a5568', fontSize: '0.8rem' }}>
                    <p>© 2026 ArrestDelta. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
