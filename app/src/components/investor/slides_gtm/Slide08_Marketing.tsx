import React from 'react';

const Slide08_Marketing: React.FC = () => {
    return (
        <section className="brand-section" id="gtm-slide-08">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <div style={{ marginBottom: '2.5rem' }} className="animate-fade-in-up">
                    <span className="label text-mono text-muted">08. MARKETING STRATEGY</span>
                    <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginTop: '1rem', lineHeight: 0.95 }}>
                        CREDIBILITY IS THE <span className="text-red text-glow">CHANNEL.</span>
                    </h2>
                </div>

                <div className="animate-fade-in-up" style={{ borderLeft: '4px solid var(--color-alert-red)', paddingLeft: '1.5rem', marginBottom: '2.5rem', animationDelay: '0.2s' }}>
                    <p className="text-white" style={{ fontSize: '1.2rem', lineHeight: 1.5 }}>
                        "Acting on stale or incorrect arrest data is now <span className="text-red">material enterprise risk.</span>"
                    </p>
                </div>

                <div className="text-mono text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>INBOUND PILLARS</div>

                <div className="grid-2 mobile-stack" style={{ gap: '1.25rem' }}>
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '1.75rem', animationDelay: '0.3s' }}>
                        <div className="text-mono text-red" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>01 AUTHORITY CONTENT</div>
                        <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>6-8 long-form articles:</div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['False positives in screening', 'Delta-based vs static monitoring', 'Legal risk of stale data'].map((t, i) => (
                                <li key={i} className="text-white" style={{ fontSize: '0.9rem' }}><span className="text-red">→</span> {t}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '1.75rem', animationDelay: '0.4s' }}>
                        <div className="text-mono text-red" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>02 EXECUTIVE ASSETS</div>
                        <div className="text-white" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>1 flagship whitepaper</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>"The Real-Time Imperative in Workforce Risk"</div>
                        <div className="text-white" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>2 executive briefs (≤5 pages)</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>CFO/CISO-ready</div>
                    </div>
                </div>

                <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '1.5rem', marginTop: '1.25rem', animationDelay: '0.5s', border: '1px solid var(--color-alert-red)' }}>
                    <div className="text-mono text-red" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>03 RELATIONSHIP-DRIVEN INBOUND</div>
                    <div className="mobile-stack" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        {['Private exec briefings', 'Trust & Safety roundtables', 'Law enforcement network intros'].map((item, i) => (
                            <div key={i} className="text-mono text-white" style={{ fontSize: '0.85rem' }}><span className="text-red">✓</span> {item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide08_Marketing;
