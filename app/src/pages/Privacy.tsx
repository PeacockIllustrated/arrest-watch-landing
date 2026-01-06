import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
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
                    Privacy Policy
                </h1>
                <p style={{ color: '#8b9ab0', marginBottom: '48px' }}>
                    Last updated: 1 January 2026
                </p>

                <div style={{ lineHeight: 1.8, color: '#c0c8d4' }}>
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            1. Introduction
                        </h2>
                        <p>
                            ArrestDelta ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our arrest intelligence platform.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            2. Information We Collect
                        </h2>
                        <p>We may collect information about you in a variety of ways, including:</p>
                        <ul style={{ marginTop: '12px', paddingLeft: '24px' }}>
                            <li>Personal data you provide when registering</li>
                            <li>Usage data and analytics</li>
                            <li>Technical data such as IP address and browser type</li>
                            <li>Data from integrated third-party services</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            3. How We Use Your Information
                        </h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
                        </p>
                    </section>

                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0f2f5', marginBottom: '16px' }}>
                            4. Contact Us
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@arrestdelta.com" style={{ color: '#e40028' }}>
                                privacy@arrestdelta.com
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

export default Privacy;
