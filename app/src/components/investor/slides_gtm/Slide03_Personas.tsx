import React from 'react';

const Slide03_Personas: React.FC = () => {
    const personas = [
        {
            role: 'TRUST & SAFETY OPS',
            priority: 'PRIMARY',
            focus: 'Real-time incident response, platform integrity'
        },
        {
            role: 'PUBLIC SAFETY OPS',
            priority: 'PRIMARY',
            focus: 'Law enforcement liaison, crisis management'
        },
        {
            role: 'SECURITY LEADERSHIP',
            priority: 'PRIMARY',
            focus: 'Risk mitigation, operational security'
        },
        {
            role: 'RISK & COMPLIANCE',
            priority: 'PRIMARY',
            focus: 'Regulatory adherence, audit readiness'
        },
        {
            role: 'LEGAL',
            priority: 'SECONDARY',
            focus: 'Liability management, policy review'
        },
    ];

    return (
        <section className="brand-section" id="gtm-slide-03">
            <div className="grid-bg-overlay" />

            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in-up">
                    <span className="label text-mono text-muted">03. BUYER PERSONAS</span>
                    <h2 className="text-large" style={{ fontSize: '3rem', marginTop: '1rem' }}>
                        WHO <span className="text-red">BUYS.</span>
                    </h2>
                </div>

                {/* Personas Grid */}
                <div className="mobile-stack" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {personas.slice(0, 3).map((p, i) => (
                        <div
                            key={i}
                            className="glass-panel animate-fade-in-up"
                            style={{
                                padding: '2rem',
                                animationDelay: `${0.2 + i * 0.1}s`,
                                border: '1px solid var(--color-grid)'
                            }}
                        >
                            <div className="text-mono text-red" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                {p.priority}
                            </div>
                            <h3 className="text-white" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                                {p.role}
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                                {p.focus}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Second Row */}
                <div className="mobile-stack" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                    marginBottom: '3rem'
                }}>
                    {personas.slice(3).map((p, i) => (
                        <div
                            key={i}
                            className="glass-panel animate-fade-in-up"
                            style={{
                                padding: '2rem',
                                animationDelay: `${0.5 + i * 0.1}s`,
                                border: p.priority === 'SECONDARY' ? '1px dashed var(--color-grid)' : '1px solid var(--color-grid)',
                                opacity: p.priority === 'SECONDARY' ? 0.7 : 1
                            }}
                        >
                            <div className="text-mono" style={{
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem',
                                color: p.priority === 'SECONDARY' ? 'var(--color-text-muted)' : 'var(--color-alert-red)'
                            }}>
                                {p.priority}
                            </div>
                            <h3 className="text-white" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                                {p.role}
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                                {p.focus}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <div className="animate-fade-in-up" style={{
                    textAlign: 'center',
                    animationDelay: '0.7s'
                }}>
                    <div style={{
                        borderTop: '1px solid var(--color-grid)',
                        paddingTop: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <p className="text-mono text-muted" style={{ fontSize: '1rem' }}>
                            "Focus and credibility are <span className="text-white">essential.</span>"
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Slide03_Personas;
