import React, { useState } from 'react';
import '../styles/landing.css';
import '../styles/brand.css';
import founder from '../assets/founder.png';

const ComponentsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('heroes');

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveCategory(id);
        }
    };

    return (
        <div className="components-page bg-void text-white font-body" style={{ display: 'flex' }}>

            {/* COMPONENT SIDEBAR */}
            <nav style={{
                width: '250px',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                borderRight: '1px solid var(--color-grid)',
                background: '#050505',
                padding: '2rem',
                zIndex: 100
            }}>
                <h1 className="text-mono text-red" style={{ fontSize: '1rem', marginBottom: '2rem' }}>COMPONENT DB</h1>

                <div className="flex-col" style={{ gap: '0.5rem' }}>
                    {['Heroes', 'Features', 'Data UI', 'Trust', 'Process', 'Stats', 'Team', 'Content', 'CTAs', 'Footers'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => scrollToCategory(cat.toLowerCase().replace(' ', '-'))}
                            className="text-mono"
                            style={{
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                color: activeCategory === cat.toLowerCase().replace(' ', '-') ? 'var(--color-alert-red)' : 'var(--color-text-muted)',
                                padding: '0.5rem 0',
                                cursor: 'pointer',
                                borderLeft: activeCategory === cat.toLowerCase().replace(' ', '-') ? '2px solid var(--color-alert-red)' : '2px solid transparent',
                                paddingLeft: activeCategory === cat.toLowerCase().replace(' ', '-') ? '1rem' : '0',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.toUpperCase()} //
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-grid)', fontSize: '0.7rem', color: '#555' }}>
                    ARRESTDELTA DESIGN <br />
                    SYSTEM V2.0 <br />
                    STATUS: LIVE
                </div>
            </nav>

            {/* MAIN CONTENT AREA */}
            <main style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '0', height: '100vh', overflowY: 'auto' }}>

                {/* HEROES CATEGORY */}
                <div id="heroes" style={{ padding: '0' }}>

                    {/* 1. SPLIT HERO COMPONENT */}
                    <div className="section-label" style={labelStyle}>LAYOUT_01: SPLIT HERO GLITCH</div>
                    <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                        <div className="container grid-2" style={{ alignItems: 'center' }}>
                            <div>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>SYSTEM STATUS: CRITICAL_MONITORING</div>
                                <h1 className="text-huge">
                                    THE GAP IS <br />
                                    <span className="text-stroke" style={{ WebkitTextStroke: '1px var(--color-signal-white)', color: 'transparent' }}>CLOSING.</span>
                                </h1>
                                <p className="text-muted" style={{ maxWidth: '400px', marginBottom: '2rem' }}>
                                    Standard verifications fail silently. We monitor the noise to find the signal before it impacts your enterprise.
                                </p>
                                <div className="flex-row">
                                    <button className="btn">INITIALIZE SCAN</button>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>// SECURE CONNECTION</span>
                                </div>
                            </div>
                            <div className="panel" style={{ height: '400px', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-grid)' }}>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 3px)',
                                    zIndex: 2, pointerEvents: 'none'
                                }}></div>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    fontSize: '8rem', opacity: 0.1, fontWeight: 'bold'
                                }}>
                                    ERR_00
                                </div>
                                <div className="scan-line" style={{ display: 'block', top: '30%' }}></div>
                            </div>
                        </div>
                    </section>

                    {/* 2. CENTERED IMPACT HERO */}
                    <div className="section-label" style={labelStyle}>LAYOUT_02: CENTERED RADAR</div>
                    <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        {/* Radar BG Effect */}
                        <div style={{ position: 'absolute', width: '100vw', height: '100vw', border: '1px solid #111', borderRadius: '50%', opacity: 0.1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                        <div style={{ position: 'absolute', width: '60vw', height: '60vw', border: '1px solid #222', borderRadius: '50%', opacity: 0.2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                        <div style={{ position: 'absolute', width: '30vw', height: '30vw', border: '1px dashed #333', borderRadius: '50%', opacity: 0.3, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>

                        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid var(--color-grid)', borderRadius: '100px', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                                <span className="text-red" style={{ marginRight: '0.5rem' }}>●</span> LIVE INTELLIGENCE FEED
                            </div>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                                VISIBILITY BEYOND <br /> THE BACKGROUND CHECK
                            </h1>
                            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                                ArrestDelta is the continuous intelligence layer for the modern trust economy.
                                Stop relying on expired data. Start watching the real-time stream.
                            </p>
                            <button className="btn btn-cta" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem' }}>REQUEST ACCESS</button>
                        </div>
                    </section>

                    {/* 3. MINIMAL HEADER */}
                    <div className="section-label" style={labelStyle}>LAYOUT_03: MINIMAL TERMINAL</div>
                    <section className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', padding: '4rem' }}>
                        <div style={{ borderBottom: '1px solid var(--color-grid)', paddingBottom: '2rem', marginBottom: 'auto' }}>
                            <span className="text-mono" style={{ letterSpacing: '2px', fontSize: '1.5rem' }}>ARRESTDELTA_</span>
                        </div>

                        <div style={{ maxWidth: '800px' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>/ root / intelligence / manifesto.md</div>
                            <h1 className="text-large" style={{ lineHeight: '1.4' }}>
                                "TRUST IS NOT A STATIC STATE. <br />
                                <span style={{ background: 'var(--color-alert-red)', color: 'black', padding: '0 0.5rem' }}>IT IS A CONTINUOUS PROCESS."</span>
                            </h1>
                        </div>
                    </section>
                </div>

                {/* FEATURES CATEGORY */}
                <div id="features">

                    {/* 4. BENTO GRID */}
                    <div className="section-label" style={labelStyle}>LAYOUT_04: BENTO GRID</div>
                    <section className="section">
                        <div className="container">
                            <h2 className="text-large" style={{ marginBottom: '3rem' }}>Operational Capabilities</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 250px)', gap: '1.5rem' }}>

                                {/* Large Box */}
                                <div className="panel bento-hover" style={{ gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                    <div style={{ marginBottom: 'auto', width: '40px', height: '40px', border: '1px solid var(--color-alert-red)', display: 'grid', placeItems: 'center' }}>⚡</div>
                                    <h3 className="text-large">Real-Time Ingestion</h3>
                                    <p className="text-muted">Direct pipes into 3,000+ county and municipal booking systems. No aggregators. No latency.</p>
                                </div>

                                {/* Tall Box */}
                                <div className="panel bento-hover" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
                                    <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>COVERAGE MAP</div>
                                    <div style={{ height: '70%', background: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/USA_Counties_with_FIPS_and_names.svg/2560px-USA_Counties_with_FIPS_and_names.svg.png") center/cover', opacity: 0.2, filter: 'invert(1)' }}></div>
                                    <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>92% US POPULATION</p>
                                </div>

                                {/* Wide Box */}
                                <div className="panel bento-hover" style={{ gridColumn: 'span 1' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>API First</h3>
                                    <div className="text-code text-muted" style={{ fontSize: '0.7rem' }}>GET /v1/alerts?active=true</div>
                                </div>

                                {/* Small Box */}
                                <div className="panel bento-hover" style={{ gridColumn: 'span 1', background: 'rgba(228, 0, 40, 0.05)', border: '1px solid var(--color-alert-red)' }}>
                                    <h3 className="text-red" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zero False Positives</h3>
                                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>Human-in-the-loop review.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. ICON CLUSTER */}
                    <div className="section-label" style={labelStyle}>LAYOUT_05: ICON CLUSTER</div>
                    <section className="section">
                        <div className="container grid-3">
                            {[
                                { title: "PRE-EMPLOYMENT", icon: "INSPECT", desc: "Deeper than a background check. Verified arrest history in minutes." },
                                { title: "CONTINUOUS", icon: "WATCH", desc: "Post-hire monitoring. Know immediately if an employee enters the system." },
                                { title: "FLEET SAFETY", icon: "TRACK", desc: "DUI and traffic booking alerts for drivers on the road." }
                            ].map((item, i) => (
                                <div key={i} className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                                    <div style={{
                                        width: '80px', height: '80px', margin: '0 auto 2rem auto',
                                        border: '1px solid var(--color-grid)', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.8rem', letterSpacing: '2px'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ marginBottom: '1rem' }}>{item.title}</h3>
                                    <p className="text-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. COMPARISON DECK */}
                    <div className="section-label" style={labelStyle}>LAYOUT_06: CARD STACK COMPARISON</div>
                    <section className="section">
                        <div className="container grid-2">
                            <div style={{ paddingRight: '2rem' }}>
                                <span className="text-label">THE DEFICIT</span>
                                <h2 className="text-large">Why "Clean" Records <br /> Are Dangerous.</h2>
                                <p className="text-muted" style={{ marginTop: '1rem' }}>
                                    A background check is a snapshot of the past. It expires the moment it is printed.
                                    ArrestDelta is a live feed of the present.
                                </p>
                            </div>
                            <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Back Card (Legacy / Bad) */}
                                <div className="panel" style={{
                                    position: 'absolute', top: '20px', right: '20px', width: '320px', height: '220px',
                                    background: '#151515', zIndex: 1, border: '1px dashed #444',
                                    display: 'flex', flexDirection: 'column', opacity: 0.6
                                }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px dashed #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>TRADITIONAL CHECK</span>
                                        <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666' }}>EXPIRED</span>
                                    </div>
                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ width: '60%', height: '8px', background: '#333', borderRadius: '4px' }}></div>
                                        <div style={{ width: '40%', height: '8px', background: '#333', borderRadius: '4px' }}></div>
                                        <div style={{ width: '80%', height: '8px', background: '#333', borderRadius: '4px', marginTop: '1rem' }}></div>
                                        <div className="text-mono" style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#555' }}>LAST SYNC: 30 DAYS AGO</div>
                                    </div>
                                </div>

                                {/* Front Card (ArrestDelta / Good) */}
                                <div className="panel" style={{
                                    position: 'absolute', top: '60px', right: '60px', width: '320px', height: '220px',
                                    background: '#050505', zIndex: 2, border: '1px solid var(--color-alert-red)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                    display: 'flex', flexDirection: 'column'
                                }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-grid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="text-mono text-white" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE MONITORING</span>
                                        <div className="flex-row">
                                            <div className="pulse-active" style={{ width: '6px', height: '6px', background: 'var(--color-alert-red)', borderRadius: '50%' }}></div>
                                            <span className="text-mono text-red" style={{ fontSize: '0.7rem' }}>ACTIVE</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem', flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span className="text-muted">Subject ID</span>
                                            <span className="text-mono">JD-8842-X</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <span className="text-muted">Status</span>
                                            <span className="text-white">CLEAR</span>
                                        </div>
                                        <div className="text-mono text-red" style={{ fontSize: '0.75rem', border: '1px solid rgba(228, 0, 40, 0.2)', padding: '0.5rem', display: 'inline-block', background: 'rgba(228, 0, 40, 0.05)' }}>
                                            &gt;&gt; REAL-TIME SYNC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* DATA UI CATEGORY */}
                <div id="data-ui">

                    {/* 7. TERMINAL WINDOW */}
                    <div className="section-label" style={labelStyle}>LAYOUT_07: TERMINAL TRACE</div>
                    <section className="section">
                        <div className="container" style={{ maxWidth: '800px' }}>
                            <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
                                <div className="flex-row" style={{ background: '#222', padding: '0.5rem 1rem', gap: '0.5rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                                    <div className="text-mono text-muted" style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>aw_cli_v2.4</div>
                                </div>
                                <div style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#ccc', minHeight: '300px' }}>
                                    <div>$ aw monitor --target="F500_FLEET"</div>
                                    <div style={{ color: 'var(--color-alert-red)', margin: '1rem 0' }}>[!] ALERT: MATCH FOUND IN MIAMI-DADE COUNTY (BOOKING #99281)</div>
                                    <div>&gt; Analysis: DUI CHARGE DETECTED</div>
                                    <div>&gt; Confidence: 99.8% (Biometric Confirmation)</div>
                                    <div>&gt; Routing: HR_DIRECTOR (Email), SAFETY_OPS (Slack)</div>
                                    <div style={{ marginTop: '1rem' }}>$ _<span className="pulse-active" style={{ display: 'inline-block', width: '8px', height: '14px', background: 'white' }}></span></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 8. METRIC CLUSTER */}
                    <div className="section-label" style={labelStyle}>LAYOUT_08: CONNECTED METRICS</div>
                    <section className="section">
                        <div className="container">
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative' }}>
                                {/* Connecting Line */}
                                <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: 'var(--color-grid)', zIndex: 0 }}></div>

                                <div style={{ zIndex: 1, background: 'var(--color-void)', padding: '1rem', textAlign: 'center' }}>
                                    <div className="text-huge text-white" style={{ marginBottom: '0.5rem' }}>150M</div>
                                    <div className="text-label">RECORDS INDEXED</div>
                                </div>
                                <div style={{ zIndex: 1, background: 'var(--color-void)', padding: '1rem', textAlign: 'center' }}>
                                    <div className="text-huge text-red" style={{ marginBottom: '0.5rem' }}>&lt; 5m</div>
                                    <div className="text-label">ALERT LATENCY</div>
                                </div>
                                <div style={{ zIndex: 1, background: 'var(--color-void)', padding: '1rem', textAlign: 'center' }}>
                                    <div className="text-huge text-white" style={{ marginBottom: '0.5rem' }}>50+</div>
                                    <div className="text-label">ENTERPRISE CLIENTS</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 9. LIVE LOG TIMELINE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_09: SYSTEM LOG</div>
                    <section className="section">
                        <div className="container grid-2">
                            <div>
                                <h2 className="text-large">Audit Trail</h2>
                                <p className="text-muted">Every action is logged, stamped, and immutable. Full compliance visibility.</p>
                            </div>
                            <div className="panel" style={{ padding: '0' }}>
                                {[
                                    { time: "10:42:05", event: "SYSTEM_CHECK", status: "OK", color: "green" },
                                    { time: "10:43:12", event: "NEW_HIRE_ADDED", status: "PENDING", color: "yellow" },
                                    { time: "10:45:00", event: "MONITORING_ACTIVE", status: "ACTIVE", color: "green" },
                                    { time: "11:01:22", event: "BOOKING_DETECTED", status: "ALERT", color: "red" }
                                ].map((log, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: '1rem', padding: '1rem',
                                        borderBottom: '1px solid var(--color-grid)',
                                        fontFamily: 'monospace', fontSize: '0.8rem'
                                    }}>
                                        <span className="text-muted">{log.time}</span>
                                        <span style={{ flex: 1 }}>{log.event}</span>
                                        <span style={{ color: log.color === 'red' ? 'var(--color-alert-red)' : log.color === 'green' ? '#4CAF50' : '#FFC107' }}>
                                            [{log.status}]
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* TRUST & COMPLIANCE CATEGORY */}
                <div id="trust">
                    {/* 16. COMPLIANCE MAINFRAME */}
                    <div className="section-label" style={labelStyle}>LAYOUT_16: COMPLIANCE MAINFRAME</div>
                    <section className="section">
                        <div className="container" style={{ textAlign: 'center' }}>
                            <h2 className="text-large" style={{ marginBottom: '3rem' }}>ACTIVE PROTOCOLS</h2>
                            <div className="grid-3">
                                {['SOC2 TYPE II', 'FCRA COMPLIANT', 'ISO 27001', 'AES-256 ENCRYPTED', 'GDPR READY', 'CCPA READY'].map((proto, i) => (
                                    <div key={i} className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                                        <div className="text-mono" style={{ fontSize: '1.1rem' }}>{proto}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div className="pulse-active" style={{ width: '6px', height: '6px', background: '#4CAF50', borderRadius: '50%' }}></div>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>ACTIVE</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* PROCESS & FLOW CATEGORY */}
                <div id="process">
                    {/* 17. INGESTION PIPELINE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_17: INGESTION PIPELINE</div>
                    <section className="section" style={{ overflow: 'hidden' }}>
                        <div className="container">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '4rem 0' }}>
                                {/* Pipeline Track */}
                                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'var(--color-grid)', zIndex: 0 }}></div>

                                {/* Data Packet Animation */}
                                <div style={{
                                    position: 'absolute', top: '50%', left: 0, width: '100px', height: '4px',
                                    background: 'var(--color-alert-red)', transform: 'translateY(-50%)',
                                    boxShadow: '0 0 10px var(--color-alert-red)',
                                    animation: 'data-flow 3s infinite linear'
                                }}></div>

                                {/* Nodes */}
                                {[
                                    { title: 'COUNTY SOURCE', sub: 'RAW DATA' },
                                    { title: 'ARRESTDELTA', sub: 'PROCESSING' },
                                    { title: 'CLIENT SYSTEM', sub: 'ALERT' }
                                ].map((node, i) => (
                                    <div key={i} className="panel" style={{ width: '200px', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', zIndex: 1, background: '#050505' }}>
                                        <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>0{i + 1}</div>
                                        <div style={{ fontWeight: 'bold' }}>{node.title}</div>
                                        <div className="text-muted text-mono" style={{ fontSize: '0.7rem', marginTop: 'auto' }}>{node.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <style>{`
                            @keyframes data-flow {
                                0% { left: 0; opacity: 0; }
                                20% { opacity: 1; }
                                80% { opacity: 1; }
                                100% { left: 100%; opacity: 0; }
                            }
                        `}</style>
                    </section>

                    {/* 18. DATA LAYER REVEAL */}
                    <div className="section-label" style={labelStyle}>LAYOUT_18: DATA LAYER REVEAL</div>
                    <section className="section">
                        <div className="container grid-2">
                            <div>
                                <h2 className="text-large">See The Unseen</h2>
                                <p className="text-muted">Hover over the personnel file to reveal the hidden arrest data layer.</p>
                            </div>
                            <div className="panel layer-card-container" style={{ height: '300px', position: 'relative', overflow: 'hidden', padding: 0 }}>
                                {/* Top Layer (Clean) */}
                                <div className="layer-top" style={{ position: 'absolute', inset: 0, background: '#111', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'clip-path 0.3s' }}>
                                    <div className="text-label">EMPLOYEE FILE</div>
                                    <h3 style={{ fontSize: '2rem' }}>JOHN DOE</h3>
                                    <div className="text-muted">Department: Logistics</div>
                                    <div className="text-muted">Status: Active</div>
                                    <div style={{ marginTop: 'auto', padding: '1rem', background: '#222', textAlign: 'center' }} className="text-mono">NO RECORDS FOUND</div>
                                </div>

                                {/* Bottom Layer (Arrest Data) */}
                                <div className="layer-bottom" style={{ position: 'absolute', inset: 0, background: 'var(--color-alert-red)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'black' }}>
                                    <div className="text-label" style={{ color: 'rgba(0,0,0,0.6)' }}>ARREST RECORD FOUND</div>
                                    <h3 style={{ fontSize: '2rem' }}>JOHN DOE</h3>
                                    <div style={{ fontWeight: 'bold' }}>BOOKING #: 994821</div>
                                    <div style={{ fontWeight: 'bold' }}>CHARGE: FELONY ASSAULT</div>
                                    <div style={{ marginTop: 'auto', padding: '1rem', background: 'black', color: 'var(--color-alert-red)', textAlign: 'center' }} className="text-mono">ALERT TRIGGERED</div>
                                </div>
                            </div>
                        </div>
                        <style>{`
                            .layer-card-container:hover .layer-top {
                                clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
                            }
                            .layer-bottom {
                                z-index: 0;
                            }
                            .layer-top {
                                z-index: 1;
                                background: #111;
                            }
                        `}</style>
                    </section>

                </div>

                {/* STATS CATEGORY */}
                <div id="stats">
                    {/* 19. THREAT RADAR HERO */}
                    <div className="section-label" style={labelStyle}>LAYOUT_19: THREAT RADAR HERO</div>
                    <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(228, 0, 40, 0.1) 60deg, transparent 60deg)',
                            animation: 'radar-spin 4s linear infinite',
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                        }}></div>
                        <div style={{
                            position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                            border: '1px dashed var(--color-grid)',
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                        }}></div>

                        <div className="container" style={{ textAlign: 'center', zIndex: 2 }}>
                            <h1 className="text-huge">SCANNING...</h1>
                            <p className="text-mono text-red">THREAT_LEVEL: ELEVATED</p>
                        </div>
                        <style>{`
                            @keyframes radar-spin {
                                from { transform: translate(-50%, -50%) rotate(0deg); }
                                to { transform: translate(-50%, -50%) rotate(360deg); }
                            }
                        `}</style>
                    </section>

                    {/* 20. LIVE TICKER STATS */}
                    <div className="section-label" style={labelStyle}>LAYOUT_20: LIVE TICKER STATS</div>
                    <section className="section">
                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {[
                                { label: 'TOTAL CHECKS', val: '8,492,103' },
                                { label: 'ALERTS ISSUED', val: '14,201' },
                                { label: 'ACTIVE WATCH', val: '158,000' }
                            ].map((stat, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div className="text-huge text-mono" style={{ fontSize: '3rem', letterSpacing: '-2px' }}>{stat.val}</div>
                                    <div className="text-label text-red">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 21. ENTERPRISE SLA CALCULATOR */}
                    <div className="section-label" style={labelStyle}>LAYOUT_21: RISK CALCULATOR</div>
                    <section className="section">
                        <div className="container grid-2" style={{ alignItems: 'center' }}>
                            <div>
                                <h2 className="text-large">Calculate Your Exposure</h2>
                                <p className="text-muted">Estimate the silent risk in your workforce based on national arrest statistics.</p>
                            </div>
                            <div className="panel">
                                <div style={{ marginBottom: '2rem' }}>
                                    <label className="text-label">WORKFORCE SIZE: 5,000</label>
                                    <input type="range" min="100" max="10000" style={{ width: '100%', accentColor: 'var(--color-alert-red)' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-grid)', paddingTop: '1rem' }}>
                                    <div className="text-muted">Est. Annual Arrests</div>
                                    <div className="text-mono text-white">~150</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <div className="text-muted">Risk Exposure</div>
                                    <div className="text-mono text-red">CRITICAL</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* TEAM CATEGORY */}
                <div id="team">
                    {/* 22. OPERATIVE GRID */}
                    <div className="section-label" style={labelStyle}>LAYOUT_22: OPERATIVE GRID</div>
                    <section className="section">
                        <div className="container grid-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="panel" style={{ padding: '0', overflow: 'hidden', borderTop: '2px solid var(--color-alert-red)' }}>
                                    <div style={{ height: '200px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '4rem' }}>?</span>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div className="text-label">OPERATIVE 0{i}</div>
                                        <h3 style={{ fontSize: '1.2rem' }}>REDACTED NAME</h3>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Former Intelligence Officer / Data Analyst</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div id="content">

                    {/* 23. CASE FILE TESTIMONIAL */}
                    <div className="section-label" style={labelStyle}>LAYOUT_23: CASE FILE TESTIMONIAL</div>
                    <section className="section">
                        <div className="container">
                            <div className="panel" style={{ position: 'relative', marginTop: '2rem' }}>
                                <div style={{
                                    position: 'absolute', top: '-30px', left: '0',
                                    background: 'var(--color-alert-red)', color: 'black',
                                    padding: '0.5rem 1rem', fontFamily: 'monospace', fontWeight: 'bold'
                                }}>
                                    INCIDENT REPORT #8812
                                </div>
                                <h3 style={{ marginBottom: '1rem', marginTop: '1rem' }}>"We detected a driver with a suspended license within 4 hours."</h3>
                                <p className="text-muted">Actual feedback from a Fortune 500 Logistics Partner.</p>
                                <div style={{ marginTop: '2rem', borderTop: '1px dashed var(--color-grid)', paddingTop: '1rem', fontSize: '0.8rem' }} className="text-mono text-muted">
                                    STATUS: VERIFIED // REGION: NORTH AMERICA
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 24. KNOWLEDGE BASE CLI */}
                    <div className="section-label" style={labelStyle}>LAYOUT_24: KNOWLEDGE BASE CLI</div>
                    <section className="section">
                        <div className="container" style={{ maxWidth: '800px' }}>
                            {['WHAT DATASOURCES ARE CONNECTED?', 'HOW FAST IS THE ALERTING?', 'IS THIS FCRA COMPLIANT?'].map((q, i) => (
                                <div key={i} style={{ marginBottom: '1rem' }}>
                                    <div className="text-mono text-white" style={{ cursor: 'pointer', padding: '1rem', background: '#111', border: '1px solid var(--color-grid)' }}>
                                        <span className="text-red" style={{ marginRight: '1rem' }}>&gt;</span>
                                        {q}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 10. REDACTED QUOTE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_10: REDACTED TESTIMONIAL</div>
                    <section className="section" style={{ textAlign: 'center' }}>
                        <div className="container" style={{ maxWidth: '900px' }}>
                            <blockquote style={{ fontSize: '2rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '2rem' }}>
                                "ArrestDelta identified a <span style={{ background: 'white', color: 'black', padding: '0 0.5rem' }}>violent felony</span> within 12 minutes of booking. Our legacy provider missed it for <span style={{ textDecoration: 'line-through', color: 'var(--color-alert-red)' }}>two weeks</span>."
                            </blockquote>
                            <div className="text-mono">
                                - DIRECTOR OF SECURITY, <span style={{ background: '#333', color: 'transparent', borderRadius: '2px' }}>FORTUNE 500 LOGISTICS</span>
                            </div>
                        </div>
                    </section>

                    {/* 11. ID CARD PROFILE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_11: ID BADGE</div>
                    <section className="section">
                        <div className="container">
                            <div className="panel" style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center', borderTop: '4px solid var(--color-alert-red)' }}>
                                <img src={founder} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid var(--color-grid)' }} />
                                <div>
                                    <div className="text-label" style={{ marginBottom: '0.2rem' }}>OFFICER / FOUNDER</div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>MICHAEL KING</h3>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>ID: MK-001-ADMIN</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>LVL: CLEARANCE_TOP</div>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <div style={{ writingMode: 'vertical-rl', fontFamily: 'monospace', fontSize: '0.6rem', color: '#555' }}>ARRESTDELTA {'>>'} AUTH</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 12. DATA TABLE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_12: SPEC SHEET</div>
                    <section className="section">
                        <div className="container">
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-signal-white)', color: 'white' }}>FEATURE</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-signal-white)', color: 'white' }}>SPECIFICATION</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-signal-white)', color: 'white' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Update Frequency', 'Every 15 Minutes', 'LIVE'],
                                        ['Coverage Area', '3,143 Counties', 'EXPANDING'],
                                        ['Data Retention', 'FCRA Compliant (7 Years)', 'AUDITED'],
                                        ['API Latency', '< 200ms', 'OPTIMIZED']
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-grid)', color: 'var(--color-text-muted)' }}>{row[0]}</td>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-grid)' }}>{row[1]}</td>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-grid)', color: 'var(--color-alert-red)' }}>{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* CTAS CATEGORY */}
                <div id="ctas">

                    {/* 13. SCANLINE CTA */}
                    <div className="section-label" style={labelStyle}>LAYOUT_13: SCANLINE CTA</div>
                    <section className="section" style={{ background: '#0a0a0a', overflow: 'hidden', position: 'relative' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                            transform: 'skewX(-20deg)',
                            animation: 'scan-x 3s infinite linear'
                        }}></div>
                        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                            <h2 className="text-huge" style={{ marginBottom: '2rem' }}>READY TO DEPLOY?</h2>
                            <div className="flex-row" style={{ justifyContent: 'center', gap: '2rem' }}>
                                <button className="btn btn-cta">START PILOT</button>
                                <button className="btn">VIEW API DOCS</button>
                            </div>
                        </div>
                    </section>
                    <style>{`
                        @keyframes scan-x {
                            0% { left: -50%; }
                            100% { left: 150%; }
                        }
                    `}</style>

                    {/* 14. TICKER TAPE */}
                    <div className="section-label" style={labelStyle}>LAYOUT_14: TICKER TAPE</div>
                    <div style={{ background: 'var(--color-alert-red)', color: 'white', padding: '0.5rem 0', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
                        <div style={{ animation: 'ticker 20s linear infinite', display: 'flex', gap: '4rem' }}>
                            {Array(10).fill("BREAKING: NEW JURISDICTIONS ADDED IN CA, TX, FL // SYSTEM UPDATE V2.1 LIVE //").map((text, i) => (
                                <span key={i} className="text-mono" style={{ fontWeight: 'bold' }}>{text}</span>
                            ))}
                        </div>
                    </div>
                    <style>{`
                        @keyframes ticker {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                    `}</style>
                </div>

                {/* FOOTERS CATEGORY */}
                <div id="footers">

                    {/* 25. COMMAND CENTER FOOTER */}
                    <div className="section-label" style={labelStyle}>LAYOUT_25: COMMAND CENTER FOOTER</div>
                    <footer style={{ background: '#000', borderTop: '2px solid var(--color-alert-red)', padding: '5rem 0' }}>
                        <div className="container">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                <div>
                                    <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>ARRESTDELTA_</div>
                                    <div className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                                        Continuous criminal intelligence for the modern enterprise.
                                    </div>
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <div key={i}>
                                        <div className="text-label">COLUMN 0{i}</div>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: '2' }}>
                                            <li>Link Item 01</li>
                                            <li>Link Item 02</li>
                                            <li>Link Item 03</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.7rem', color: '#444' }}>
                                <div>
                                    SERVER_TIME: {new Date().toISOString()}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <span>LATENCY: 12ms</span>
                                    <span>UPSTREAM: OK</span>
                                    <span style={{ color: '#4CAF50' }}>ALL SYSTEMS NORMAL</span>
                                </div>
                            </div>
                        </div>
                    </footer>

                    {/* 15. SYSTEM FOOTER */}
                    <div className="section-label" style={labelStyle}>LAYOUT_15: SYSTEM FOOTER</div>
                    <footer style={{ borderTop: '1px solid var(--color-grid)', padding: '4rem 2rem', background: '#050505' }}>
                        <div className="container grid-3">
                            <div>
                                <div className="text-mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>ARRESTDELTA_</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    © 2026 ANTI-GRAVITY S.A.S<br />
                                    ALL RIGHTS RESERVED.<br />
                                    FCRA COMPLIANT DATA.
                                </div>
                            </div>
                            <div>
                                <div className="text-label">LINKS</div>
                                <ul className="text-muted" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>Technology</li>
                                    <li>Coverage</li>
                                    <li>Compliance</li>
                                    <li>Login</li>
                                </ul>
                            </div>
                            <div>
                                <div className="text-label">SYSTEM STATUS</div>
                                <div className="flex-row">
                                    <div style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%' }}></div>
                                    <span className="text-mono text-white">OPERATIONAL</span>
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Latency: 42ms</div>
                            </div>
                        </div>
                    </footer>
                </div>

            </main>
        </div>
    );
};

const labelStyle = {
    background: '#111',
    color: '#666',
    padding: '1rem 2rem',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    borderBottom: '1px solid #222',
    marginTop: '4rem'
};

export default ComponentsPage;
