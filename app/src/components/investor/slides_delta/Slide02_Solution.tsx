import React from 'react';

const Slide02_Solution: React.FC = () => {
    return (
        <section className="brand-section" id="slide-02">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>

                    {/* LEFT: Heading */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>02. THE ENTERPRISE RISK</span>
                        <h2 className="text-huge" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                            DISCOVERY TAKES MONTHS.<br />
                            <span className="text-red">LIABILITY IS INSTANT.</span>
                        </h2>

                        <p className="text-mono text-muted" style={{ marginTop: '1.5rem', maxWidth: '550px', fontSize: '0.95rem', lineHeight: 1.5 }}>
                            Most enterprise systems are refresh-based, not state-aware — they cannot tell when something meaningful has actually changed.
                        </p>

                        <p className="text-muted" style={{ marginTop: '2rem', maxWidth: '500px', fontSize: '1.2rem', lineHeight: 1.6 }}>
                            If a worker's legal risk profile changes while active on a platform, discovery often takes months. During that window, companies continue operating without awareness, exposing themselves to preventable liability. ArrestDelta closes that gap by surfacing verified state changes in minutes.
                        </p>
                    </div>

                    {/* RIGHT: Risk Boxes */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Box 1 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">LITIGATION RISK</span>
                                <span className="text-mono text-red">ESCALATING</span>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Companies operating large distributed workforces face massive settlements when safety gaps are exposed.
                            </p>
                        </div>

                        {/* Box 2 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">BRAND REPUTATION</span>
                                <span className="text-mono text-red">CRITICAL</span>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Public safety exposure destroys trust. Proactive safety notifications enable immediate suspension and regulatory defensibility.
                            </p>
                        </div>

                        {/* Box 3 - Quote */}
                        <div style={{ padding: '1.5rem', border: '1px solid var(--color-alert-red)', background: 'rgba(228, 0, 40, 0.05)' }}>
                            <p className="text-white" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                "For a platform with millions of contractors, one avoided lawsuit more than pays for the product."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide02_Solution;
