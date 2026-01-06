import React from 'react';

const Slide09_NotDoing: React.FC = () => {
    const exclusions = [
        { item: 'NO PAID SEARCH / PERFORMANCE MARKETING', why: 'Low intent, high CAC' },
        { item: 'NO HIGH-VOLUME SEO PROGRAMMES', why: 'Content farms destroy credibility' },
        { item: 'NO SDR COLD OUTREACH AT SCALE', why: 'Spray-and-pray undermines trust' },
    ];

    return (
        <section className="brand-section" id="gtm-slide-09">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted">09. WHAT WE WILL NOT DO</span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginTop: '1rem', lineHeight: 0.95 }}>
                            YEAR 1<br /><span className="text-red text-glow">EXCLUSIONS.</span>
                        </h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            In a credibility-first market, what you <span className="text-white">don't</span> do is as important as what you do.
                        </p>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-grid)', fontFamily: 'var(--font-mono)' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                                root@arrestdelta:~$ cat /etc/gtm/exclusions.conf
                            </div>
                            {exclusions.map((ex, i) => (
                                <div key={i} style={{ marginBottom: i < exclusions.length - 1 ? '1.5rem' : '0' }}>
                                    <div style={{ color: 'var(--color-alert-red)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                                        ✕ {ex.item}
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', paddingLeft: '1.5rem' }}>
                                        # {ex.why}
                                    </div>
                                </div>
                            ))}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '2rem 0 1.5rem 0' }} />
                            <div style={{ color: 'var(--color-alert-red)', fontSize: '0.9rem' }}>
                                REASON: Undermines credibility. Wastes capital.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide09_NotDoing;
