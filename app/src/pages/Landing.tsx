import React, { useEffect, useRef, useState } from 'react';
import logoMain from '../assets/logo_main.png';
import VerificationConsoleVisual from '../components/visuals/VerificationConsoleVisual';
import founder from '../assets/founder.png';
import cofounder from '../assets/co-founder.png';
import OnboardingModal from '../components/investor/_legacy/OnboardingModal';
import DashboardMockup from '../components/visuals/DashboardMockup';
import { supabase } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/landing.css';

const Landing: React.FC = () => {
    usePageTitle('Home');
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
                    <h1 className="text-huge reveal-text" style={{ transitionDelay: '0.2s' }}>From arrest<br />to alert...<br /><span className="text-red">Verified.</span></h1>
                    <p className="reveal-text" style={{ maxWidth: '600px', margin: '2rem auto 0', fontSize: '1.2rem', color: 'var(--color-text-muted)', transitionDelay: '0.3s' }}>
                        ArrestDelta provides verified, identity-certain change intelligence for enterprises making high-stakes trust decisions.
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
                            <h2 className="text-large">Static and refresh-based checks expire the moment they are completed.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}></p>
                        </div>
                        <div className="flex-col">
                            <div className="panel reveal-text">
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>IDENTITY RE-ENTRY</h3>
                                <p className="text-muted">Onboarded personnel may encounter law enforcement events after access is granted. Without continuous identity verification, systems cannot reliably detect or confirm post-access change.</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.1s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>REACTIVE DISCOVERY</h3>
                                <p className="text-muted">Arrests are often discovered after the fact, through third parties, delayed records, or public exposure, increasing both response cost and liability.</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.2s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>COST OF REACTION</h3>
                                <p className="text-muted">Incidents are significantly more expensive to manage than early intervention.</p>
                            </div>
                            <p className="text-muted" style={{ marginTop: '2rem', fontSize: '0.85rem', opacity: 0.7 }}>Modern risk systems require verified, identity-certain visibility between formal checks, not reactive discovery after the fact.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE SOLUTION (SIMULATION) */}
            <section className="section" id="solution">
                <div className="container">
                    <div className="grid-2">
                        <VerificationConsoleVisual />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span className="text-label">The Solution</span>
                            <h2 className="text-large">From arrest to verified action.</h2>
                            <ul style={{ listStyle: 'none', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="panel reveal-text">Verification before access: Identity-confirmed arrest history checks during onboarding or access requests.</li>
                                <li className="panel reveal-text">Monitoring after access: Continuous detection of new arrest events with identity resolution and state verification.</li>
                                <li className="panel reveal-text">Alert routing: Signals delivered to HR, Legal, PR, and Security teams.</li>
                                <li className="panel reveal-text">Operational workflow: From alert to case review and resolution.</li>
                            </ul>
                            <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7 }}>ArrestDelta verifies identity and state transitions before alerts are issued, ensuring only stable, high-confidence signals reach operational teams.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT CLARITY (NEW) */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Capability</span>
                    <h2 className="text-large" style={{ marginBottom: '1rem' }}>Dual Protection, Before and After Access</h2>
                    <div style={{ marginBottom: '2rem' }}>
                        <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Mode 1 - Pre-Access Verification: identity-confirmed arrest checks during onboarding or access requests</p>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Mode 2 - Post-Access Monitoring: continuous, verified detection of new arrest events after access is granted</p>
                    </div>
                    <div className="capability-pipeline">
                        {/* Pipeline Track */}
                        <div className="capability-track"></div>

                        {/* Data Packet Animation */}
                        <div className="capability-packet"></div>

                        {/* Nodes */}
                        {[
                            { title: 'PUBLIC RECORDS SOURCES', sub: 'Fragmented - Noisy - Identity-ambiguous' },
                            { title: 'ARRESTDELTA VERIFICATION LAYER', sub: 'Identity resolution - State verification - Confidence scoring' },
                            { title: 'CLIENT SYSTEMS', sub: 'Alerts only when confidence thresholds are met' }
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
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Reduce the gap between verified change and safe action.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.1s' }}>
                            <span className="metric-value" style={{ fontSize: '2.5rem' }}>ACTION WHEN CONFIRMED</span>
                            <span className="text-muted text-mono"></span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Decisions triggered only after verification thresholds are met.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.2s' }}>
                            <span className="metric-value" style={{ fontSize: '2.5rem' }}>PERSISTENT, VERIFIED VISIBILITY</span>
                            <span className="text-muted text-mono"></span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Nationwide coverage with identity certainty and suppression of noise.</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* SCALE INTENT */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Scale Intent</span>
                    <h2 className="text-large" style={{ marginBottom: '0.75rem' }}>Built for national magnitude</h2>
                    <p className="text-muted" style={{ marginBottom: '3rem', maxWidth: '700px' }}>
                        Our architecture is designed to expand nationwide coverage while enforcing verification before alerts at every stage.
                    </p>
                    <div className="grid-3">
                        <div className="panel" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>COVERAGE</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>NATIONWIDE-READY</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Designed to support thousands of local jurisdictions as coverage expands.</p>
                        </div>
                        <div className="panel" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>LOW-LATENCY VERIFICATION</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>ALERTS DELIVERED IN MINUTES, ONCE CONFIDENCE THRESHOLDS ARE MET</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Engineered for rapid state-change detection once identity and verification checks are complete.</p>
                        </div>
                        <div className="panel" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>CONFIDENCE</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>VERIFIED BEFORE SURFACED</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Biometric/identity resolution reduces ambiguity before an alert is created.</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* COMPARISON (WHY WE WIN) */}
            <section className="section">
                <div className="container">
                    <span className="text-label">The Advantage</span>
                    <h2 className="text-large" style={{ marginBottom: '2rem' }}>Decision-Grade Intelligence vs. Refreshed-Based Systems</h2>
                    <div className="grid-2">
                        <div className="panel" style={{ opacity: 0.6, border: '1px solid #333' }}>
                            <h3 className="text-mono text-muted" style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>STATIC & REFRESH-BASED SYSTEMS</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Event detection without state awareness</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Refresh-driven updates that surface noise</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Identity ambiguity and false matches</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Manual verification required after alerts</span></li>
                                <li className="text-muted" style={{ display: 'flex', gap: '1rem' }}><span>❌</span> <span>Blind spots between meaningful changes</span></li>
                            </ul>
                        </div>
                        <div className="panel" style={{ border: '1px solid var(--color-alert-red)', boxShadow: '0 0 20px rgba(228, 0, 40, 0.1)' }}>
                            <h3 className="text-mono text-red" style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-alert-red)', paddingBottom: '0.5rem' }}>ARRESTDELTA</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Continuous, state-aware change detection</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Verified updates - not refresh noise</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Biometric identity confirmation</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Confidence-weighted signals for action</span></li>
                                <li className="text-white" style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> <span>Full visibility between formal checks</span></li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-muted" style={{ marginTop: '2rem', textAlign: 'center', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', fontSize: '0.95rem' }}>
                        ArrestDelta resolves identity and verifies state transitions before alerts are surfaced, ensuring only stable, high-confidence changes reach Trust & Safety teams.
                    </p>
                </div>
            </section >

            {/* MARKET SCALE */}
            <section className="section">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">The Scope</span>
                            <h2 className="text-large">160M Workers.<br />Near-Zero Visibility Between Checks.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}>
                                The US workforce is massive, but the gap in safety intelligence is critical.
                                Trust-critical roles require more than a "hired" stamp.
                            </p>
                            <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                ArrestDelta focuses on the subset of roles where arrest-related changes create immediate operational, legal, or reputational risk.
                            </p>
                            <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.7 }}>
                                Most existing systems provide visibility only at the point of hiring, not throughout active access.
                            </p>
                        </div>
                        <div className="flex-col" style={{ justifyContent: 'center' }}>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <span className="text-mono">TOTAL U.S. WORKFORCE</span>
                                <span className="text-mono text-white">160M+</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <span className="text-mono">TRUST-CRITICAL ROLES</span>
                                <span className="text-mono text-red">50M+</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                                <span className="text-mono">EFFECTIVE POST-ACCESS VISIBILITY</span>
                                <span className="text-mono text-muted">Static only</span>
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
                    <span className="text-label">Scalable Pricing, Aligned to Risk</span>
                    <h2 className="text-large">Two Engines of Protection</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Simple, volume-based pricing for any scale.</p>

                    <div className="grid-2">
                        {/* TRANSACTIONAL */}
                        <div className="panel">
                            <div className="text-mono text-center" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-grid)' }}>
                                ON-DEMAND VERIFICATION
                            </div>
                            <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
                                For identity-confirmed verification at onboarding and access decision points.
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
                                POST-ACCESS VERIFIED MONITORING
                            </div>
                            <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
                                For active workforce and fleet monitoring, with identity resolution and confidence gating.
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

                    <p className="text-muted text-center" style={{ marginTop: '2rem', fontSize: '0.85rem', opacity: 0.7 }}>Pricing reflects verification depth and confidence thresholds, not raw alert volume.</p>

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
                                <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>COMMERCIAL & GTM</div>
                                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>michael@arrestdelta.com</div>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>+44 7963 520703</div>
                                </div>
                            </div>
                        </div>

                        {/* TOM PEACOCK */}
                        <div className="panel" style={{ display: 'flex', textAlign: 'left', gap: '1.5rem', alignItems: 'center' }}>
                            <img src={cofounder} alt="Tom Peacock" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid var(--color-grid)', filter: 'grayscale(100%)' }} />
                            <div>
                                <div className="text-mono" style={{ marginBottom: '0.2rem', fontSize: '1.1rem' }}>TOM PEACOCK</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>CO-FOUNDER & CTO</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>SYSTEMS & DATA INFRASTRUCTURE</div>
                                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono" style={{ fontSize: '0.8rem' }}>tom@arrestdelta.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PHILOSOPHICAL CLOSE */}
            <section className="section" id="contact" style={{ background: '#0a0a0a', overflow: 'hidden', position: 'relative', borderBottom: 'none', paddingTop: '6rem', paddingBottom: '7rem' }}>
                <div style={{
                    position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                    transform: 'skewX(-20deg)',
                    animation: 'scan-x 4s infinite linear'
                }}></div>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: '900px' }}>
                    <div className="text-mono text-red" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', letterSpacing: '3px' }}>// CORE PRINCIPLE</div>
                    <h2 className="text-huge" style={{ marginBottom: '1.5rem', lineHeight: '1.2' }}>
                        Speed without certainty<br />creates risk.
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        ArrestDelta is built to ensure decisions are based on <span className="text-white">verified change</span>, not noisy data.
                    </p>
                    <div className="flex-row" style={{ justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-cta" onClick={() => setIsModalOpen(true)}>REGISTER INTEREST</button>
                        <a href="/decks" className="btn btn-secondary" style={{ textDecoration: 'none' }}>VIEW DATA ROOM →</a>
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
            <footer style={{ background: '#000', borderTop: '2px solid var(--color-alert-red)', padding: '3rem 0 5rem 0' }}>
                <div className="container">
                    <div className="grid-4" style={{ marginBottom: '4rem' }}>
                        <div>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>ARRESTDELTA_</div>
                            <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                                Continuous criminal intelligence for the modern enterprise.
                            </div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>
                                <a href="mailto:info@arrestdelta.com" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '2px' }}>info@arrestdelta.com</a>
                                <span style={{ margin: '0 1rem', opacity: 0.3 }}>|</span>
                                © 2026 ArrestDelta
                            </div>
                        </div>
                        <div>
                            <div className="text-mono" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>RESOURCES</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <a href="/decks" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Data Room</a>
                                <a href="/privacy" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</a>
                                <a href="/terms" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</a>
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
                            <button
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                    window.location.href = '/gate';
                                }}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #333',
                                    color: '#666',
                                    padding: '0.25rem 0.75rem',
                                    fontFamily: 'inherit',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    marginLeft: '1rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#e40028';
                                    e.currentTarget.style.color = '#e40028';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#333';
                                    e.currentTarget.style.color = '#666';
                                }}
                            >
                                LOG OUT
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default Landing;
