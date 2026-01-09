import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const Terms: React.FC = () => {
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
                    <h1 className="legal-title">Terms of Service</h1>
                    <p className="legal-date">Last updated: 1 January 2026</p>
                </header>

                {/* Content */}
                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using ArrestDelta's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Use Licence</h2>
                        <p>
                            Permission is granted to temporarily access the materials (information or software) on ArrestDelta's platform for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Disclaimer</h2>
                        <p>
                            The materials on ArrestDelta's platform are provided on an 'as is' basis. ArrestDelta makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Limitations</h2>
                        <p>
                            In no event shall ArrestDelta or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ArrestDelta's platform.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Contact Us</h2>
                        <p>
                            If you have questions about these Terms of Service, please contact us at{' '}
                            <a href="mailto:legal@arrestdelta.com" className="legal-link">
                                info@arrestdelta.com
                            </a>
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <footer className="legal-footer">
                    <p>© 2026 ArrestDelta. All rights reserved.</p>
                    <div className="legal-footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
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

export default Terms;
