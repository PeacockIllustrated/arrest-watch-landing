import React from 'react';
import SecureBadgeRow from '../ui/SecureBadgeRow';

const Slide13_Raise: React.FC = () => {
    return (
        <section className="brand-section" id="slide-13">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2" style={{ gap: '6rem' }}>

                    {/* LEFT: The Ask */}
                    <div className="animate-fade-in-up">
                        <span className="label">13. PRE-SEED RAISE</span>
                        <h2 className="text-huge" style={{ fontSize: '5rem', marginBottom: '4rem' }}>
                            THE <span className="text-red">ASK.</span>
                        </h2>

                        <div className="glass-panel border-glow" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)', background: 'linear-gradient(90deg, rgba(228,0,40,0.1), transparent)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>CURRENT ROUND TERMS</div>
                            <ul style={{ listStyle: 'none', padding: 0 }} className="text-mono">
                                <li style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem' }}>
                                    <span className="text-muted">RAISE AMOUNT</span>
                                    <span className="text-white">$1.0M</span>
                                </li>
                                <li style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem' }}>
                                    <span className="text-muted">POST-MONEY CAP</span>
                                    <span className="text-white">$16.0M</span>
                                </li>
                                <li style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem' }}>
                                    <span className="text-muted">EQUITY</span>
                                    <span className="text-white">~6.25%</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Rationale & Badges */}
                    <div className="flex-col animate-fade-in-up" style={{ gap: '2rem', justifyContent: 'center', animationDelay: '0.2s' }}>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>USE OF FUNDS</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="text-muted" style={{ fontSize: '0.9rem', padding: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                    NATIONAL DATA EXPANSION
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.9rem', padding: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                    LATENCY HARDENING
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.9rem', padding: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                    COMPLIANCE READINESS
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.9rem', padding: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                    KEY HIRES
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                                <a href="/investor-delta/appendix/use-of-funds" className="text-mono text-red hover-glow" style={{ fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    VIEW DETAILED MILESTONE PLAN →
                                </a>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
                                ALREADY SECURED:
                            </div>
                            <p className="text-mono text-muted" style={{ marginTop: '2rem', fontSize: '0.9rem', maxWidth: '600px' }}>
                                Pricing reflects category-defining real-time architecture and platform-scale revenue potential.
                            </p>
                            <SecureBadgeRow />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide13_Raise;
