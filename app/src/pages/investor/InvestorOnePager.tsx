import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';
import '../../styles/brand.css';
import '../../styles/landing.css';
import founder from '../../assets/founder.png';
import cofounder from '../../assets/co-founder.png';
import mark from '../../assets/mark.png';
import logoMain from '../../assets/logo_main.png';

// Visual Components
import RadarBackground from '../../components/visuals/RadarBackground';
import VerificationConsoleVisual from '../../components/visuals/VerificationConsoleVisual';
import CapabilityPipeline from '../../components/visuals/CapabilityPipeline';
import DashboardMockup from '../../components/visuals/DashboardMockup';
import USAMapViz from '../../components/visuals/USAMapViz';

import InteractiveSideNav from '../../components/visuals/InteractiveSideNav';

const InvestorOnePager: React.FC = () => {
    usePageTitle('Home');
    const observerRef = useRef<IntersectionObserver | null>(null);

    const SECTIONS = [
        { id: 'about', label: 'Summary' },
        { id: 'problem', label: 'Problem' },
        { id: 'solution', label: 'Solution' },
        { id: 'whynow', label: 'Why Now' },
        { id: 'whobuys', label: 'Who Buys' },
        { id: 'market', label: 'Market' },
        { id: 'traction', label: 'Traction' },
        { id: 'team', label: 'Team' },
        { id: 'raise', label: 'Raise' }
    ];

    // Force scrollable alignment with other scrolling pages
    useEffect(() => {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.body.classList.add('landing-page'); // Reuse landing page base styles

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

        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.classList.remove('landing-page');
            observerRef.current?.disconnect();
        };
    }, []);

    return (
        <div className="landing-container" style={{
            minHeight: '100vh',
            background: 'var(--color-void)',
            color: 'var(--color-signal-white)',
            fontFamily: 'var(--font-sans)',
            overflowX: 'hidden',
            position: 'relative'
        }}>

            {/* INTERACTIVE NAVIGATION */}
            <InteractiveSideNav sections={SECTIONS} />

            {/* HERO / HEADER SECTION */}
            <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 2rem' }}>
                <RadarBackground />
                <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <img src={logoMain} alt="ArrestDelta" className="hero-logo reveal-text" />
                    <span className="text-label reveal-text" style={{ transitionDelay: '0.1s' }}>ArrestDelta Intelligence Layer</span>
                    <h1 className="text-huge reveal-text" style={{ transitionDelay: '0.2s' }}>From arrest<br />to alert...<br /><span className="text-red">Verified.</span></h1>
                    <p className="text-muted reveal-text" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.5, transitionDelay: '0.3s' }}>
                        Enterprise infrastructure for verified arrest intelligence, replacing false positives and litigation risk with confidence-first decisioning.
                    </p>
                </div>
            </section>

            {/* 1. Summary (Merged visually into Hero flow but keeping accessible) */}
            <section id="about" className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>SUMMARY</h2>
                    <div className="glass-panel reveal-text" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)', transitionDelay: '0.1s' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                            ArrestDelta is enterprise infrastructure for verified arrest intelligence, replacing false positives and litigation risk with confidence-first decisioning.
                        </p>
                        <div style={{ marginTop: '3rem', height: '400px', width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--color-grid)' }}>
                            <USAMapViz isScanning={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Problem with Dashboard Background */}
            <section id="problem" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Faded Dashboard Mockup background */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
                    <DashboardMockup isScanning={false} />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>PROBLEM</h2>
                            <p className="text-muted reveal-text" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Arrest data is fragmented, jurisdiction-specific, and constantly changing. Enterprises that rely on it face false positives, broken workflows, and real litigation exposure as automated decisions scale.
                            </p>
                            <p className="text-muted reveal-text" style={{ lineHeight: 1.6, transitionDelay: '0.1s' }}>
                                Legacy background check and monitoring providers optimize for coverage and speed, not correctness under change. As a result, errors propagate downstream and become expensive, irreversible failures.
                            </p>
                        </div>
                        <div className="glass-panel reveal-text" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', transitionDelay: '0.2s', background: 'rgba(0,0,0,0.8)' }}>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>CRITICAL FAILURE</div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#fff' }}>
                                "Errors propagate downstream and become expensive, irreversible failures."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Solution with Verification Console */}
            <section id="solution" className="section">
                <div className="container grid-2">
                    <div className="reveal-text">
                        <h2 className="text-large" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>SOLUTION</h2>
                        <div className="glass-panel reveal-text" style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                ArrestDelta provides state-aware, continuously verified arrest change detection.
                            </p>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                We model how each county system actually updates, resolve identity ambiguity, verify state transitions over time, and only surface confidence-scored changes that enterprises can safely act on.
                            </p>
                            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-grid)' }}>
                                <p className="text-mono" style={{ color: 'var(--color-alert-red)', fontSize: '1.1rem' }}>
                                    This is not a background check.<br />
                                    It is decision-grade arrest intelligence infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="reveal-text" style={{ transitionDelay: '0.2s', minHeight: '400px' }}>
                        <VerificationConsoleVisual />
                    </div>
                </div>
            </section>

            {/* 4. Why Now */}
            <section id="whynow" className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>WHY NOW</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <div className="glass-panel reveal-text" style={{ padding: '1.5rem' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>01</div>
                            <p style={{ lineHeight: 1.4 }}>Enterprises are making real-time, trust-sensitive decisions at scale</p>
                        </div>
                        <div className="glass-panel reveal-text" style={{ padding: '1.5rem', transitionDelay: '0.1s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>02</div>
                            <p style={{ lineHeight: 1.4 }}>Litigation and regulatory scrutiny around automated decisions is increasing</p>
                        </div>
                        <div className="glass-panel reveal-text" style={{ padding: '1.5rem', transitionDelay: '0.2s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>03</div>
                            <p style={{ lineHeight: 1.4 }}>Existing providers cannot adapt to jurisdictional complexity or change dynamics</p>
                        </div>
                        <div className="glass-panel reveal-text" style={{ padding: '1.5rem', border: '1px solid var(--color-alert-red)', transitionDelay: '0.3s' }}>
                            <div className="text-mono text-red" style={{ marginBottom: '0.5rem' }}>RESULT</div>
                            <p style={{ lineHeight: 1.4, color: '#fff' }}>Accuracy is no longer optional, it is existential.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Who Buys */}
            <section id="whobuys" className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>WHO BUYS</h2>
                            <p className="text-muted reveal-text" style={{ marginBottom: '1rem' }}>Initial buyers include:</p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="glass-panel reveal-text" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--color-alert-red)' }}>›</span> Gig and logistics platforms
                                </li>
                                <li className="glass-panel reveal-text" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transitionDelay: '0.1s' }}>
                                    <span style={{ color: 'var(--color-alert-red)' }}>›</span> Marketplaces
                                </li>
                                <li className="glass-panel reveal-text" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transitionDelay: '0.2s' }}>
                                    <span style={{ color: 'var(--color-alert-red)' }}>›</span> Regulated enterprises with operational exposure to arrest events
                                </li>
                            </ul>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="glass-panel reveal-text" style={{ width: '100%', padding: '2rem', textAlign: 'center', transitionDelay: '0.3s' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>GEOGRAPHY</div>
                                <div className="text-huge" style={{ fontSize: '2rem' }}>US-FIRST</div>
                                <div className="text-muted" style={{ marginTop: '0.5rem' }}>County-level coverage</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Market */}
            <section id="market" className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>MARKET</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div className="glass-panel metric-card reveal-text" style={{ padding: '2rem' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>TAM</div>
                            <div className="metric-value text-white" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>Multi-$B</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Enterprise trust and compliance decision infrastructure</p>
                        </div>
                        <div className="glass-panel metric-card reveal-text" style={{ padding: '2rem', border: '1px solid var(--color-alert-red)', transitionDelay: '0.1s' }}>
                            <div className="text-mono text-red" style={{ marginBottom: '0.5rem' }}>SAM</div>
                            <div className="metric-value text-white" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>~$10.5B</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Serviceable Market (SAM)</p>
                        </div>
                        <div className="glass-panel metric-card reveal-text" style={{ padding: '2rem', transitionDelay: '0.2s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>SOM</div>
                            <div className="metric-value text-white" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>~$360M</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Target Serviceable Obtainable Market</p>
                        </div>
                    </div>
                    <p className="text-muted reveal-text" style={{ marginTop: '1.5rem', fontStyle: 'italic', transitionDelay: '0.3s' }}>
                        We start narrow by design. Accuracy compounds with embedding, and expansion unlocks once trust is established.
                    </p>
                </div>
            </section>

            {/* 7. Business Model */}
            <section className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>BUSINESS MODEL</h2>
                    <div className="glass-panel reveal-text" style={{ padding: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> Enterprise contracts</li>
                                    <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> Pilot -{'>'} production pricing</li>
                                    <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">✓</span> ACV expands with coverage depth, alert volume, and workflow integration</li>
                                </ul>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>TARGET ACV AT SCALE</div>
                                <div className="text-huge text-white" style={{ fontSize: '2.5rem' }}>~$300k+</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem' }}>with lower-friction pilots early</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Traction */}
            <section id="traction" className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>TRACTION</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {['Product live', 'Active enterprise conversations', 'Early pilots / design partners', 'Strong inbound from compliance-driven use cases'].map((item, i) => (
                            <div key={i} className="glass-panel reveal-text" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-alert-red)', transitionDelay: `${i * 0.1}s` }}>
                                <p style={{ lineHeight: 1.4 }}>{item}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted reveal-text" style={{ marginTop: '1.5rem', fontStyle: 'italic', transitionDelay: '0.4s' }}>
                        Pre-revenue by design. This round converts pilots into contracts once verification accuracy is proven.
                    </p>
                </div>
            </section>

            {/* 9. Why We Win with Pipeline Visual */}
            <section className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>WHY WE WIN</h2>

                    {/* Pipeline Visual Integrated Here */}
                    <div className="reveal-text" style={{ marginBottom: '3rem' }}>
                        <CapabilityPipeline />
                    </div>

                    <div className="glass-panel reveal-text" style={{ padding: '2rem', transitionDelay: '0.2s' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">+</span> Built for change detection, not static lookups</li>
                                <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">+</span> Jurisdiction-aware verification logic</li>
                                <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">+</span> Identity resolution before alerts</li>
                            </ul>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">+</span> Compounding accuracy over time</li>
                                <li style={{ display: 'flex', gap: '1rem' }}><span className="text-red">+</span> Litigation-aware by default</li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-grid)', textAlign: 'center' }}>
                            <p className="text-muted" style={{ fontStyle: 'italic' }}>
                                Incumbents cannot retrofit this without breaking their core model.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Team */}
            <section id="team" className="section">
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>TEAM</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Michael */}
                        <div className="glass-panel bio-scan reveal-text" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                                    <img src={founder} alt="Michael King" style={{ width: '80px', height: '80px', objectFit: 'cover', filter: 'grayscale(100%)', border: '1px solid var(--color-grid)' }} />
                                    <div className="scan-overlay" />
                                </div>
                                <div>
                                    <div className="text-mono text-white" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>MICHAEL KING</div>
                                    <div className="text-mono text-red" style={{ fontSize: '0.8rem' }}>FOUNDER & CEO</div>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                                Enterprise GTM and sales execution, with a focus on selling complex, trust-sensitive infrastructure into regulated and risk-averse organizations.
                            </p>
                        </div>

                        {/* Tom */}
                        <div className="glass-panel bio-scan reveal-text" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', transitionDelay: '0.1s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                                    <img src={cofounder} alt="Tom Peacock" style={{ width: '80px', height: '80px', objectFit: 'cover', filter: 'grayscale(100%)', border: '1px solid var(--color-grid)' }} />
                                    <div className="scan-overlay" />
                                </div>
                                <div>
                                    <div className="text-mono text-white" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>TOM PEACOCK</div>
                                    <div className="text-mono text-red" style={{ fontSize: '0.8rem' }}>CO-FOUNDER & CTO</div>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                                Systems-first engineer building correctness- and verification-led data infrastructure designed to operate under real-world variability and high cost-of-error conditions.
                            </p>
                        </div>

                        {/* Mark */}
                        <div className="glass-panel bio-scan reveal-text" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', transitionDelay: '0.2s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                                    <img src={mark} alt="Mark Collins" style={{ width: '80px', height: '80px', objectFit: 'cover', filter: 'grayscale(100%)', border: '1px solid var(--color-grid)' }} />
                                    <div className="scan-overlay" />
                                </div>
                                <div>
                                    <div className="text-mono text-white" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>MARK COLLINS</div>
                                    <div className="text-mono text-red" style={{ fontSize: '0.8rem' }}>HEAD OF LAW ENFORCEMENT PARTNERSHIPS</div>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                                Former senior police leader with decades of command-level experience. Brings direct access to law enforcement leadership and enables ArrestDelta’s strategy to secure higher-fidelity data through direct agency partnerships and data-sharing agreements.
                            </p>
                        </div>
                    </div>
                    <div className="glass-panel reveal-text" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', transitionDelay: '0.3s' }}>
                        <p className="text-muted" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '0.95rem' }}>
                            Together, the team combines enterprise go-to-market execution, technical discipline, and institutional trust, reducing the core risks in building litigation-safe arrest intelligence infrastructure.
                        </p>
                    </div>
                </div>
            </section>

            {/* 11. Raise */}
            <section id="raise" className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <h2 className="text-large reveal-text" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>RAISE</h2>
                    <div className="glass-panel border-glow reveal-text" style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '2rem' }}>
                            <div>
                                <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>PRE-SEED</div>
                                <div className="text-huge" style={{ fontSize: '3rem', lineHeight: 1 }}>$1m</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>PRE-MONEY VALUATION</div>
                                <div className="text-huge text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>$15m</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>USE OF FUNDS</div>
                            <p className="text-white" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Expand coverage, harden verification and auditability, and support multiple enterprise pilots
                            </p>
                            <p className="text-muted" style={{ lineHeight: 1.5 }}>
                                Given the litigation-sensitive nature of the problem, this round is intentionally sized to fund correctness, verification depth, and multiple enterprise pilots without forcing premature commercialization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div style={{
                maxWidth: '1400px',
                marginInline: 'auto',
                marginBottom: '4rem',
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'linear-gradient(180deg, rgba(228, 0, 40, 0.05) 0%, transparent 100%)',
                borderTop: '1px solid rgba(228, 0, 40, 0.2)',
                borderBottom: '1px solid rgba(228, 0, 40, 0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Diagonal Scan Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(228, 0, 40, 0.02) 10px, rgba(228, 0, 40, 0.02) 20px)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 className="text-large reveal-text" style={{ marginBottom: '2rem' }}>
                        Ready for Decision-Grade <span className="text-red">Intelligence?</span>
                    </h2>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <Link to="/decks" className="btn btn-secondary">VIEW DATA ROOM</Link>
                        <a href="mailto:info@arrestdelta.com" className="btn btn-primary">CONTACT</a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ textAlign: 'center', paddingBottom: '4rem' }}>
                <div style={{ color: '#333', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    © 2026 ARRESTDELTA
                </div>
            </footer>

            {/* Local Styles for Interaction Effects */}
            <style>{`
                /* Bio Scan Effect */
                .bio-scan .scan-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(180deg, transparent, rgba(228, 0, 40, 0.4), transparent);
                    transform: translateY(-100%);
                    transition: transform 0.5s;
                    pointer-events: none;
                    opacity: 0;
                }
                .bio-scan:hover .scan-overlay {
                    opacity: 1;
                    transform: translateY(100%);
                    transition: transform 1.5s linear;
                }
                .bio-scan:hover img {
                    filter: grayscale(0%) contrast(1.1) !important;
                    border-color: var(--color-alert-red) !important;
                    transition: all 0.3s;
                }
            `}</style>
        </div>
    );
};

export default InvestorOnePager;
