import React, { useEffect } from 'react';
import logoMark from '../assets/logo-mark.png';
import iconWhite from '../assets/icon-white.png';
import founderImg from '../assets/founder.png';

const OnePager: React.FC = () => {
    // Force allow scrolling and height auto for this page specifically
    useEffect(() => {
        document.body.style.overflowY = 'auto'; // allow vertical scroll
        document.body.style.height = 'auto';

        return () => {
            document.body.style.overflowY = '';
            document.body.style.height = '';
        };
    }, []);

    return (
        <div className="one-pager-container" style={{ width: '100%', minHeight: '100vh', background: 'var(--color-void)', color: 'var(--color-signal-white)', overflowX: 'hidden' }}>

            {/* ==============================================
                SECTION 1: HERO + THREAT
               ============================================== */}
            <section className="brand-section one-pager-section" style={{ height: 'auto', minHeight: '100vh', padding: '4rem 2rem', borderBottom: '1px solid var(--color-grid)', display: 'block', position: 'relative', overflow: 'hidden' }}>
                <div className="grid-bg-overlay" />

                {/* Background Shield Logo */}
                <div style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50vw',
                    opacity: 0.05,
                    pointerEvents: 'none',
                    zIndex: 0
                }}>
                    <img src={iconWhite} alt="" style={{ width: '100%' }} />
                </div>

                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                    {/* Centered Hero Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '8rem', paddingTop: '4rem' }}>

                        {/* Logo Lockup - CONSTRUCTED NEW BRANDING (Icon Only) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                            <img src={logoMark} alt="ArrestDelta Logo" style={{ height: '300px', width: 'auto' }} />
                        </div>


                        {/* Label */}
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem', opacity: 0.6 }}>
                            ARRESTDELTA INTELLIGENCE LAYER
                        </div>

                        {/* Main Headline */}
                        <h2 className="text-huge" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: '0.85', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
                            FROM ARREST<br />
                            TO ALERT...<br />
                            <span className="text-red">INSTANTLY.</span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-muted" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.5', margin: '0 auto' }}>
                            ArrestDelta is the only platform connecting nationwide arrest
                            data, facial recognition, and HR systems into one continuous
                            safety layer.
                        </p>
                    </div>

                    {/* Threat Block */}
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span className="label text-muted" style={{ letterSpacing: '0.15em' }}>THE THREAT</span>
                            <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-head)', fontWeight: 800, lineHeight: 1, marginTop: '1rem', textTransform: 'uppercase' }}>
                                STATIC BACKGROUND CHECKS NO LONGER<br />
                                PROTECT MODERN WORKFORCES.
                            </h3>
                            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                                Real-time risk visibility is now essential.
                            </p>
                        </div>

                        <div className="grid-3-mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            {/* Box 1 */}
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>01. LITIGATION RISK</div>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
                                    Companies face multimillion-dollar lawsuits when employees
                                    with recent arrests cause harm while still on the job. <span className="text-mono text-red">(UBER $0.5B)</span>
                                </p>
                            </div>

                            {/* Box 2 */}
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>02. BRAND REPUTATION</div>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
                                    Headlines about employee misconduct spread faster than
                                    facts, costing customer trust and market value.
                                </p>
                            </div>

                            {/* Box 3 */}
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>03. BLIND SPOTS</div>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
                                    Without Real-Time monitoring, legal & PR teams are reacting
                                    too late.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* ==============================================
                SECTION 2: SOLUTION + METRICS + MARKET
               ============================================== */}
            <section className="brand-section one-pager-section" style={{ height: 'auto', minHeight: '100vh', padding: '6rem 2rem', borderBottom: '1px solid var(--color-grid)', display: 'block', background: 'rgba(26,26,26,0.2)' }}>
                {/* No overlay in 2nd section or subtle one */}
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }} className="mobile-stack">
                        {/* LEFT COLUMN: Solution */}
                        <div>
                            <span className="label">THE SOLUTION</span>
                            <h2 className="text-large" style={{ marginBottom: '3rem' }}>
                                FROM ARREST TO ALERT...<br />
                                <span className="text-red">INSTANTLY.</span>
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                                {[
                                    "Instant alerts to Executive, HR, Legal, and PR teams.",
                                    "Facial recognition integration to close identity gaps.",
                                    "API-ready → plugs directly into HR/security systems.",
                                    "Manage cases from alert through to resolution."
                                ].map((feature, i) => (
                                    <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                        <div style={{ width: '6px', height: '6px', background: 'var(--color-alert-red)', marginTop: '8px', flexShrink: 0 }} />
                                        <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>{feature}</p>
                                    </div>
                                ))}
                            </div>

                            {/* MOAT Box */}
                            <div className="glass-panel border-glow" style={{ padding: '2rem', background: 'rgba(228, 0, 40, 0.05)' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>MOAT</div>
                                <p className="text-large" style={{ fontSize: '1.4rem', lineHeight: '1.4' }}>
                                    Latency, not data, is the moat. In risk, the winner isn't who has the data, it's who acts first
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Metrics + Market */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                            {/* Impacts */}
                            <div>
                                <span className="label text-muted">IMPACT METRICS</span>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div className="text-huge text-red" style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>80%</div>
                                        <div>
                                            <div className="text-mono text-white">LITIGATION EXPOSURE</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Reduce exposure by up to 80% per incident.</div>
                                        </div>
                                    </div>
                                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div className="text-huge text-red" style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>5</div>
                                        <div>
                                            <div className="text-mono text-white">MINUTES</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Cut brand response time from days to minutes.</div>
                                        </div>
                                    </div>
                                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div className="text-huge text-white" style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>100%</div>
                                        <div>
                                            <div className="text-mono text-white">PREVENTION</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Intervene before harm occurs.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Market */}
                            <div>
                                <span className="label">MARKET OPPORTUNITY</span>
                                <h3 className="text-large" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>THE NEXT EVOLUTION.</h3>
                                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                                    The foundational background check market is ripe for transformation.
                                    Real-time monitoring carves out a massive new sub-segment.
                                </p>

                                <div className="glass-panel" style={{ padding: '0' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-grid)', padding: '1rem' }}>
                                        <span className="text-mono text-muted">WORKFORCE</span>
                                        <span className="text-mono text-white text-right">160M U.S. WORKERS</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-grid)', padding: '1rem' }}>
                                        <span className="text-mono text-muted">GIG ECONOMY</span>
                                        <span className="text-mono text-white text-right">56M WORKERS</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-grid)', padding: '1rem' }}>
                                        <span className="text-mono text-muted">SPEND</span>
                                        <span className="text-mono text-white text-right">$5B+ ANNUALLY</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '1rem' }}>
                                        <span className="text-mono text-muted">GROWTH</span>
                                        <span className="text-mono text-red text-right">39B BY 2032</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            {/* ==============================================
                SECTION 3: TRACTION + TECH + RAISE + FOOTER
               ============================================== */}
            <section className="brand-section one-pager-section" style={{ height: 'auto', minHeight: '100vh', padding: '6rem 2rem 4rem', borderBottom: 'none', display: 'block' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                    {/* Top Row: Traction & Tech */}
                    <div className="grid-2 mobile-stack" style={{ gap: '4rem', marginBottom: '6rem' }}>

                        {/* Traction */}
                        <div>
                            <span className="label">EARLY TRACTION</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-alert-red)' }}>
                                    In pilot-stage discussions with Uber.
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-alert-red)' }}>
                                    Brand identity & product vision established.
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-alert-red)' }}>
                                    Data acquisition underway.
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-alert-red)' }}>
                                    Currently scoping a paid pilot with a top-tier global mobility platform.
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <span className="label">TECH STACK</span>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div className="text-mono text-red">APIFY</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>DATA</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div className="text-mono text-red">SUPABASE</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>BACKEND</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', gridColumn: 'span 2' }}>
                                    <div className="text-mono text-red">AMAZON REKOGNITION</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>AI VISION</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RAISE SECTION */}
                    <div style={{ marginBottom: '6rem' }}>
                        <span className="label text-red">FUNDING REQUIREMENT</span>
                        <div className="glass-panel border-glow" style={{ padding: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h2 className="text-huge" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>RAISING $1M <span className="text-muted" style={{ fontSize: '2rem' }}>PRE-SEED</span></h2>
                                </div>
                                <div className="text-right">
                                    <div className="text-mono text-muted">TARGETING</div>
                                    <div className="text-large text-white">$15M PRE-MONEY VALUATION</div>
                                </div>
                            </div>

                            <p className="text-mono text-muted" style={{ borderTop: '1px solid var(--color-grid)', paddingTop: '1.5rem', marginBottom: '3rem' }}>
                                Pricing reflects category-defining real-time architecture and platform-scale revenue potential.
                            </p>

                            {/* Allocation Bar */}
                            <div style={{ width: '100%', height: '40px', display: 'flex', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                                <div style={{ width: '40%', background: 'var(--color-alert-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>40%</div>
                                <div style={{ width: '35%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>35%</div>
                                <div style={{ width: '20%', background: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>20%</div>
                                <div style={{ width: '5%', background: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }} className="mobile-wrap">
                                <span>TECH DEV</span>
                                <span>SALES & PARTNERSHIPS</span>
                                <span>OPS & GROWTH</span>
                                <span>LEGAL</span>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div style={{ borderTop: '1px solid var(--color-grid)', paddingTop: '4rem' }}>

                        {/* Centered Header */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>SECURE CHANNEL</div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                                BUILD THE NEW STANDARD IN WORKFORCE SAFETY.
                            </h2>
                        </div>

                        {/* Two Column: Contact Card + QR */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', alignItems: 'flex-start' }} className="mobile-stack">

                            {/* Contact Card */}
                            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                {/* Photo */}
                                <div style={{ width: '140px', height: '180px', background: '#333', overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={founderImg} alt="Michael King" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                {/* Info */}
                                <div>
                                    <div className="text-white" style={{ fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>MICHAEL KING</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>FOUNDER & CEO</div>
                                    <div className="text-mono text-white" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>mking@arrestdelta.io</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '1rem' }}>+44 7963 520703</div>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '180px', height: '180px', background: 'white', padding: '8px', marginBottom: '1rem' }}>
                                    {/* Placeholder QR - replace with actual QR image */}
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
                                        <img src={logoMark} alt="QR" style={{ width: '50px', height: '50px', opacity: 0.3 }} />
                                    </div>
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>arrest-delta.vercel.app</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default OnePager;
