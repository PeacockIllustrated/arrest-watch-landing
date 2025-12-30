import React, { useEffect, useRef, useState } from 'react';
import logoMain from '../assets/logo_main.png';
import mugshot from '../assets/mugshot.jpg';
import founder from '../assets/founder.png';
import OnboardingModal from '../components/investor/_legacy/OnboardingModal';
import DashboardMockup from '../components/visuals/DashboardMockup';
import '../styles/landing.css';

const Landing: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Add landing-page class to body for scoped styles
        document.body.classList.add('landing-page');

        // Reveal Text Animation
        const revealElements = document.querySelectorAll('.reveal-text');

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observerRef.current?.observe(el));

        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    metricObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const metricSection = document.querySelector('.grid-3');
        if (metricSection) metricObserver.observe(metricSection);

        return () => {
            document.body.classList.remove('landing-page');
            observerRef.current?.disconnect();
            metricObserver.disconnect();
        };
    }, []);

    const handleScanClick = () => {
        setIsScanning(true);
    };

    return (
        <div className="landing-container">
            {/* HERO (UPGRADED) */}
            <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(228, 0, 40, 0.1) 60deg, transparent 60deg)',
                    animation: 'radar-spin 4s linear infinite',
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                    border: '1px dashed var(--color-grid)',
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 0
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <img src={logoMain} alt="ArrestDelta" className="hero-logo reveal-text" />
                    <span className="text-label reveal-text" style={{ transitionDelay: '0.1s' }}>ArrestDelta Intelligence Layer</span>
                    <h1 className="text-huge reveal-text" style={{ transitionDelay: '0.2s' }}>From arrest<br />to alert...<br /><span className="text-red">Instantly.</span></h1>
                    <p className="reveal-text" style={{ maxWidth: '600px', margin: '2rem auto 0', fontSize: '1.2rem', color: 'var(--color-text-muted)', transitionDelay: '0.3s' }}>
                        ArrestDelta is a continuous arrest intelligence layer. It operates before and after access is granted, preventing risk in real-time.
                    </p>
                </div>
                <style>{`
                    @keyframes radar-spin {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                `}</style>
            </section>

            {/* SPLIT HERO GAP SECTION (REPLACES NARRATIVE) */}
            {/* SPLIT HERO GAP SECTION (REPLACES NARRATIVE) */}
            <section className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>SYSTEM STATUS: CRITICAL_MONITORING</div>
                    <h1 className="text-huge">
                        THE GAP IS <br />
                        <span className="text-stroke" style={{ WebkitTextStroke: '1px var(--color-signal-white)', color: 'transparent' }}>CLOSING.</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                        Standard verifications fail silently. We monitor the noise to find the signal before it impacts your enterprise.
                    </p>
                    <div className="flex-row">
                        <button className="btn" onClick={handleScanClick}>INITIALIZE SCAN</button>
                        <span className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>// SECURE CONNECTION</span>
                    </div>
                </div>
                <div className="container no-padding-mobile" style={{ width: '100%' }}>
                    <div className="panel dashboard-panel" style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--color-grid)', padding: 0 }}>
                        <DashboardMockup isScanning={isScanning} />
                    </div>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="section" id="problem">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">The Threat</span>
                            <h2 className="text-large">Static background checks expire the moment they are completed.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}></p>
                        </div>
                        <div className="flex-col">
                            <div className="panel reveal-text">
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>IDENTITY RE-ENTRY</h3>
                                <p className="text-muted">Onboarded personnel may encounter law enforcement events after hiring. Static checks do not provide post-access visibility.</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.1s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>REACTIVE DISCOVERY</h3>
                                <p className="text-muted">Arrests are often discovered after the fact — sometimes via third parties or the press.</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.2s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>COST OF REACTION</h3>
                                <p className="text-muted">Incidents are significantly more expensive to manage than early intervention.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE SOLUTION (SIMULATION) */}
            <section className="section" id="solution">
                <div className="container">
                    <div className="grid-2">
                        <div className="face-container" id="face-demo">
                            <img src={mugshot} className="face-img" alt="Subject" />
                            <div className="face-overlay"></div>
                            <div className="scan-line"></div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                                <div id="scan-status">SCANNING...</div>
                                <div id="scan-id" className="text-muted">ID: 884-29-1X</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span className="text-label">The Solution</span>
                            <h2 className="text-large">From arrest to alert... instantly.</h2>
                            <ul style={{ listStyle: 'none', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="panel reveal-text">Verification before access: Fast arrest history checks during onboarding or access requests.</li>
                                <li className="panel reveal-text">Monitoring after access: Continuous monitoring for new arrest events.</li>
                                <li className="panel reveal-text">Alert routing: Signals delivered to HR, Legal, PR, and Security teams.</li>
                                <li className="panel reveal-text">Operational workflow: From alert to case review and resolution.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT CLARITY (NEW) */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Capability</span>
                    <h2 className="text-large" style={{ marginBottom: '2rem' }}>Two Modes of Protection</h2>
                    <div className="capability-pipeline">
                        {/* Pipeline Track */}
                        <div className="capability-track"></div>

                        {/* Data Packet Animation */}
                        <div className="capability-packet"></div>

                        {/* Nodes */}
                        {[
                            { title: 'COUNTY SOURCE', sub: 'RAW DATA' },
                            { title: 'ARRESTDELTA', sub: 'PROCESSING' },
                            { title: 'CLIENT SYSTEM', sub: 'ALERT' }
                        ].map((node, i) => (
                            <div key={i} className="panel capability-node">
                                <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>0{i + 1}</div>
                                <div style={{ fontWeight: 'bold' }}>{node.title}</div>
                                <div className="text-muted text-mono" style={{ fontSize: '0.7rem', marginTop: 'auto' }}>{node.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE VALUE */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Impact Metrics</span>
                    <div className="grid-3" style={{ marginTop: '2rem' }}>
                        <div className="metric-card reveal-text">
                            <span className="metric-value text-red" style={{ fontSize: '2.5rem' }}>REDUCED EXPOSURE</span>
                            <span className="text-muted text-mono"></span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Reduce the gap between arrest and action.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.1s' }}>
                            <span className="metric-value" style={{ fontSize: '2.5rem' }}>MINUTES, NOT DAYS</span>
                            <span className="text-muted text-mono"></span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Drastically reduce response time.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.2s' }}>
                            <span className="metric-value" style={{ fontSize: '2.5rem' }}>CONTINUOUS VISIBILITY</span>
                            <span className="text-muted text-mono"></span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Nationwide coverage (expanding).</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* REAL INFO / COVERAGE (REPLACES POLICIES) */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Operational Reality</span>
                    <h2 className="text-large" style={{ marginBottom: '3rem' }}>Coverage Magnitude.</h2>
                    <div className="grid-3">
                        <div className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <div className="text-huge text-red" style={{ marginBottom: '0.5rem', fontSize: '3.5rem' }}>3,124</div>
                            <div className="text-mono text-muted" style={{ letterSpacing: '2px' }}>JURISDICTIONS</div>
                        </div>
                        <div className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <div className="text-huge text-white" style={{ marginBottom: '0.5rem', fontSize: '3.5rem' }}>&lt;15m</div>
                            <div className="text-mono text-muted" style={{ letterSpacing: '2px' }}>MEAN TIME TO ALERT</div>
                        </div>
                        <div className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <div className="text-huge text-white" style={{ marginBottom: '0.5rem', fontSize: '3.5rem' }}>99.9%</div>
                            <div className="text-mono text-muted" style={{ letterSpacing: '2px' }}>DATA ACCURACY</div>
                        </div>
                    </div>
                </div>
            </section >

            {/* COMPARISON (WHY WE WIN) */}
            <section className="section">
                <div className="container">
                    <span className="text-label">The Advantage</span>
                    <h2 className="text-large" style={{ marginBottom: '2rem' }}>Continuous Intelligence vs. Static Reports</h2>
                    <div className="grid-2">
                        <div className="panel" style={{ opacity: 0.6, border: '1px solid #333' }}>
                            <h3 className="text-mono text-muted" style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>LEGACY CHECKS</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Static, one-time snapshots</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Batch processing (days)</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Expensive manual re-checks</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Blind spots between screens</span></li>
                            </ul>
                        </div>
                        <div className="panel" style={{ border: '1px solid var(--color-alert-red)', boxShadow: '0 0 20px rgba(228, 0, 40, 0.1)' }}>
                            <h3 className="text-mono text-red" style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-alert-red)', paddingBottom: '0.5rem' }}>ARRESTDELTA</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Continuous, event-driven monitoring</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Real-time alerts (minutes)</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Automated, low-cost persistence</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>100% Post-access visibility</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* MARKET SCALE */}
            <section className="section">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">The Scope</span>
                            <h2 className="text-large">160M Workers.<br />Zero Visibility.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}>
                                The US workforce is massive, but the gap in safety intelligence is critical.
                                Trust-critical roles require more than a "hired" stamp.
                            </p>
                        </div>
                        <div className="flex-col" style={{ justifyContent: 'center' }}>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <span className="text-mono">TOTAL WORKFORCE</span>
                                <span className="text-mono text-white">160M+</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <span className="text-mono">TRUST-CRITICAL ROLES</span>
                                <span className="text-mono text-red">50M+</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                                <span className="text-mono">CURRENT VISIBILITY</span>
                                <span className="text-mono text-muted">STATIC ONLY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* TARGET INDUSTRIES */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Industries</span>
                    <h2 className="text-large" style={{ marginBottom: '2rem' }}>Trust-Critical Infrastructure</h2>
                    <div className="grid-3">
                        <div className="panel" style={{ borderTop: '2px solid var(--color-signal-white)' }}>
                            <h3 className="text-mono" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-signal-white)' }}>HIGH-VOLUME PLATFORMS</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Gig Economy, Marketplaces, Contractor Networks.</p>
                        </div>
                        <div className="panel" style={{ borderTop: '2px solid var(--color-signal-white)' }}>
                            <h3 className="text-mono" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-signal-white)' }}>ENTERPRISE & CARE</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Healthcare, Education, Hospitality, Field Services.</p>
                        </div>
                        <div className="panel" style={{ borderTop: '2px solid var(--color-signal-white)' }}>
                            <h3 className="text-mono" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--color-signal-white)' }}>INSTITUTIONS</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Government, Municipal Agencies, Non-profits.</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* PRICING */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Transparent Pricing</span>
                    <h2 className="text-large">Two Engines of Protection</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Simple, volume-based pricing for any scale.</p>

                    <div className="grid-2">
                        {/* TRANSACTIONAL */}
                        <div className="panel">
                            <div className="text-mono text-center" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-grid)' }}>
                                TRANSACTIONAL SEARCH
                            </div>
                            <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
                                For pre-hire verification and access gates.
                            </p>
                            <div className="text-center">
                                <span className="text-large">$2.00 - $5.00</span>
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block' }}>EST. PER SEARCH*</span>
                            </div>
                            <div className="text-center" style={{ marginTop: '1.5rem' }}>
                                <span className="text-large">$6.00+</span>
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block' }}>ENHANCED / FUZZY MATCH*</span>
                            </div>
                        </div>

                        {/* SUBSCRIPTION */}
                        <div className="panel" style={{ border: '1px solid var(--color-alert-red)', background: 'rgba(228,0,40,0.05)' }}>
                            <div className="text-mono text-center" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-alert-red)', color: 'var(--color-alert-red)' }}>
                                CONTINUOUS MONITORING
                            </div>
                            <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
                                For active workforce and fleet monitoring.
                            </p>
                            <div className="text-center">
                                <span className="text-large">$3.00 - $5.00</span>
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block' }}>PER PERSON / MO (STARTER)*</span>
                            </div>
                            <div className="text-center" style={{ marginTop: '1.5rem' }}>
                                <span className="text-large">$7.00 - $10.00</span>
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block' }}>PER PERSON / MO (PRO)*</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-muted" style={{ marginTop: '2rem', fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.6 }}>
                        * Indicative pricing for enterprise planning purposes only. Final rates depend on volume, API usage, and specific contract terms.
                        Enterprise minimums and volume discounts apply.
                    </div>
                </div>
            </section >

            {/* FOUNDER SECTION */}
            <section className="section" id="founder">
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="text-label">Secure Channel</span>
                    <h2 className="text-large" style={{ marginBottom: '3rem' }}>Build the new standard in workforce safety.</h2>

                    <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', gap: '2rem' }}>
                        {/* MICHAEL KING */}
                        <div className="panel" style={{ display: 'flex', textAlign: 'left', gap: '1.5rem', alignItems: 'center' }}>
                            <img src={founder} alt="Michael King" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid var(--color-grid)', filter: 'grayscale(100%)' }} />
                            <div>
                                <div className="text-mono" style={{ marginBottom: '0.2rem', fontSize: '1.1rem' }}>MICHAEL KING</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>FOUNDER & CEO</div>
                                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>mking@arrestwatch.io</div>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>+44 7963 520703</div>
                                </div>
                            </div>
                        </div>

                        {/* TOM PEACOCK */}
                        <div className="panel" style={{ display: 'flex', textAlign: 'left', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', background: '#111', border: '1px dashed var(--color-grid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="text-muted" style={{ fontSize: '0.8rem' }}>IMG</span>
                            </div>
                            <div>
                                <div className="text-mono" style={{ marginBottom: '0.2rem', fontSize: '1.1rem' }}>TOM PEACOCK</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>CO-FOUNDER & CTO</div>
                                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>tom@arrestwatch.io</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA (UPGRADED) */}
            < section className="section" id="contact" style={{ background: '#0a0a0a', overflow: 'hidden', position: 'relative', borderBottom: 'none' }}>
                <div style={{
                    position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                    transform: 'skewX(-20deg)',
                    animation: 'scan-x 3s infinite linear'
                }}></div>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <h2 className="text-huge" style={{ marginBottom: '2rem' }}>SECURE YOUR ACCESS</h2>
                    <div className="flex-row" style={{ justifyContent: 'center', gap: '2rem' }}>
                        <button className="btn btn-cta" onClick={() => setIsModalOpen(true)}>REGISTER INTEREST</button>
                    </div>
                </div>
                <style>{`
                    @keyframes scan-x {
                        0% { left: -50%; }
                        100% { left: 150%; }
                    }
                `}</style>
            </section>

            {/* MODAL */}
            <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* FOOTER (NEW) */}
            <footer style={{ background: '#000', borderTop: '2px solid var(--color-alert-red)', padding: '5rem 0' }}>
                <div className="container">
                    <div className="grid-4" style={{ marginBottom: '4rem' }}>
                        <div>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>ARRESTDELTA_</div>
                            <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                                Continuous criminal intelligence for the modern enterprise.
                            </div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>
                                <a href="mailto:investors@arrestdelta.com" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '2px' }}>investors@arrestdelta.com</a>
                                <span style={{ margin: '0 1rem', opacity: 0.3 }}>|</span>
                                © 2025 ArrestDelta
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
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
        </div >
    );
};

export default Landing;
