import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/landing.css';

const Privacy: React.FC = () => {
    usePageTitle('Privacy Policy');
    useEffect(() => {
        document.body.classList.add('landing-page');
        return () => {
            document.body.classList.remove('landing-page');
        };
    }, []);

    return (
        <div className="legal-page">
            {/* Background Grid */}
            <div className="bg-grid" />

            <div className="legal-container">
                {/* Back Link */}
                <Link to="/" className="legal-back-link">
                    <span className="back-arrow">←</span>
                    Back to Home
                </Link>

                {/* Header */}
                <header className="legal-header">
                    <span className="text-label">Legal</span>
                    <h1 className="legal-title">Privacy Policy</h1>
                    <p className="legal-date">Last updated: 1 January 2026</p>
                </header>

                {/* Content */}
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Introduction</h2>
                        <p>
                            ArrestDelta ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our arrest intelligence platform.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways, including:</p>
                        <ul className="legal-list">
                            <li>Personal data you provide when registering</li>
                            <li>Usage data and analytics</li>
                            <li>Technical data such as IP address and browser type</li>
                            <li>Data from integrated third-party services</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@arrestdelta.com" className="legal-link">
                                privacy@arrestdelta.com
                            </a>
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <footer className="legal-footer">
                    <p>© 2026 ArrestDelta. All rights reserved.</p>
                    <div className="legal-footer-links">
                        <Link to="/terms">Terms of Service</Link>
                        <span className="divider">·</span>
                        <Link to="/">Home</Link>
                    </div>
                </footer>
            </div>

            <style>{`
                .legal-page {
                    min-height: 100vh;
                    background: var(--color-void);
                    color: var(--color-signal-white);
                    font-family: var(--font-body);
                    position: relative;
                    padding: 80px 24px;
                }

                .legal-container {
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .legal-back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--color-text-muted);
                    text-decoration: none;
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 48px;
                    padding: 10px 16px;
                    border: 1px solid transparent;
                    transition: all 0.2s var(--ease-snap);
                }

                .legal-back-link:hover {
                    color: var(--color-signal-white);
                    border-color: var(--color-grid);
                    background: rgba(255, 255, 255, 0.02);
                }

                .back-arrow {
                    font-size: 1.2rem;
                }

                .legal-header {
                    margin-bottom: 64px;
                    padding-bottom: 40px;
                    border-bottom: 1px solid var(--color-grid);
                }

                .legal-title {
                    font-family: var(--font-head);
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: -0.02em;
                    margin-bottom: 12px;
                    background: linear-gradient(180deg, var(--color-signal-white) 0%, rgba(255,255,255,0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .legal-date {
                    color: var(--color-text-muted);
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                }

                .legal-content {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .legal-section {
                    padding: 32px;
                    background: rgba(26, 26, 26, 0.4);
                    border: 1px solid var(--color-grid);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s var(--ease-snap);
                }

                .legal-section:hover {
                    border-color: rgba(255, 255, 255, 0.15);
                    background: rgba(26, 26, 26, 0.6);
                }

                .legal-section h2 {
                    font-family: var(--font-head);
                    font-size: 1.1rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                    color: var(--color-signal-white);
                    margin-bottom: 16px;
                    padding-left: 16px;
                    border-left: 2px solid var(--color-alert-red);
                }

                .legal-section p {
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.8;
                    font-size: 0.95rem;
                }

                .legal-list {
                    margin-top: 16px;
                    padding-left: 24px;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 2;
                }

                .legal-list li {
                    position: relative;
                }

                .legal-list li::marker {
                    color: var(--color-alert-red);
                }

                .legal-link {
                    color: var(--color-alert-red);
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .legal-link:hover {
                    text-shadow: 0 0 10px rgba(228, 0, 40, 0.5);
                }

                .legal-footer {
                    margin-top: 80px;
                    padding-top: 32px;
                    border-top: 1px solid var(--color-grid);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--color-text-muted);
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                }

                .legal-footer-links {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .legal-footer-links a {
                    color: var(--color-text-muted);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .legal-footer-links a:hover {
                    color: var(--color-signal-white);
                }

                .legal-footer-links .divider {
                    color: var(--color-grid);
                }

                @media (max-width: 768px) {
                    .legal-page {
                        padding: 60px 16px;
                    }

                    .legal-section {
                        padding: 24px;
                    }

                    .legal-footer {
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default Privacy;
