import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../components/NavigationArrows';
import '../styles/brand.css';
import { usePageTitle } from '../hooks/usePageTitle';

const SLIDE_TITLES = [
    "Intro", "Objective", "Buying Center", "Coach & Cover", "Win Strategy", "Close Plan", "Final"
];

const UberClosePlan: React.FC = () => {
    usePageTitle('Uber Close Plan');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;

            setShowPrev(scrollLeft > 10);
            setShowNext(scrollLeft < maxScroll - 10);

            const currentProgress = (scrollLeft / maxScroll) * 100;
            setProgress(currentProgress);

            const width = window.innerWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    const scrollByAmount = (amount: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: amount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') scrollByAmount(window.innerWidth);
            if (e.key === 'ArrowLeft') scrollByAmount(-window.innerWidth);
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const scrollToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const width = window.innerWidth;
            scrollContainerRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: INTRO ========== */}
                <section className="brand-section" id="uber-close-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>UBER • ACCOUNT PLAN</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                UBER CLOSE<br />
                                <span className="text-red text-glow">PLAN</span>
                            </h1>
                            <p className="text-mono text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                Framework: Miller Heiman – Strategic Selling (Blue Sheet)
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                                <span className="badge outline">Account: Uber</span>
                                <span className="badge outline">Product: ArrestDelta</span>
                            </div>
                            <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                ← Back to Decks
                            </Link>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%',
                        background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.15), transparent 70%)',
                        pointerEvents: 'none', zIndex: -1
                    }} />
                </section>

                {/* ========== SLIDE 1: SINGLE SALES OBJECTIVE ========== */}
                <section className="brand-section" id="uber-close-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <span className="label">01. SINGLE SALES OBJECTIVE</span>
                        <h2 className="text-large" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                            THE <span className="text-red">GOAL</span>
                        </h2>

                        <div className="glass-panel border-glow animate-fade-in-up" style={{
                            padding: '3rem',
                            border: '1px solid var(--color-alert-red)',
                            background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)'
                        }}>
                            <p className="text-white" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', lineHeight: 1.6, margin: 0 }}>
                                Secure a paid <span className="text-red" style={{ fontWeight: 700 }}>90–120 day pilot</span> of ArrestDelta
                                with Uber Public Safety / Security, scoped to U.S. arrest-change monitoring, with success
                                metrics tied to:
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                                {["False-positive reduction", "Signal confidence", "Response time"].map((item, i) => (
                                    <span key={i} className="text-mono text-white animate-fade-in-up" style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem',
                                        animationDelay: `${0.2 + i * 0.1}s`
                                    }}>
                                        <span className="text-red">✓</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: BUYING CENTER ========== */}
                <section className="brand-section" id="uber-close-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <span className="label">02. BUYING CENTER (POWER MAP)</span>
                        <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                            WHO <span className="text-red">DECIDES</span>
                        </h2>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {/* Economic Buyer */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2rem', border: '1px solid var(--color-alert-red)',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>ECONOMIC BUYER (EB)</div>
                                <h3 className="text-white" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Nadelle Gazard</h3>
                                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    Senior Manager, Public Safety<br />
                                    Budget + operational decision-maker<br />
                                    <em>Chris reports into Nadelle</em>
                                </p>
                                <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>PERSONAL WINS</div>
                                <ul className="text-muted" style={{ fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Fewer wrongful actions against drivers</li>
                                    <li>Reduced ops noise</li>
                                    <li>Cleaner escalation path</li>
                                    <li>Measurable ops improvement she can own</li>
                                </ul>
                                <p className="text-white" style={{ fontSize: '0.85rem', fontStyle: 'italic', borderLeft: '2px solid var(--color-alert-red)', paddingLeft: '0.75rem' }}>
                                    She wants something that makes her org safer and quieter.
                                </p>
                            </div>

                            {/* Tech Buyer */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.1s' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>TECHNICAL / FUNCTIONAL BUYER</div>
                                <h3 className="text-white" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Chris Hanson</h3>
                                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    Security<br />
                                    Reports to: Nadelle
                                </p>
                                <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>PERSONAL WINS</div>
                                <ul className="text-muted" style={{ fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Higher signal confidence</li>
                                    <li>Less security escalation risk</li>
                                    <li>Better internal justification for actions</li>
                                </ul>
                                <p className="text-red" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                    ⚠ Chris is a validator, not the final approver. We win Nadelle through Chris.
                                </p>
                            </div>

                            {/* User Buyers */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.2s' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>🧩 USER BUYERS</div>
                                <ul className="text-muted" style={{ fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '0.75rem' }}>
                                    <li>Public Safety Ops</li>
                                    <li>Trust & Safety analysts</li>
                                    <li>Incident response teams</li>
                                </ul>
                                <p className="text-white" style={{ fontSize: '0.8rem' }}>Wins: Alerts only on real change. Less fatigue.</p>
                            </div>

                            {/* Technical Buyers */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.3s' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>🧱 TECHNICAL BUYER</div>
                                <ul className="text-muted" style={{ fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '0.75rem' }}>
                                    <li>Security engineering</li>
                                    <li>Platform / data</li>
                                    <li>Procurement security</li>
                                </ul>
                                <p className="text-white" style={{ fontSize: '0.8rem' }}>Wins: Event-based delivery. No scraping liability. Low integration risk.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: COACH & EXECUTIVE COVER ========== */}
                <section className="brand-section" id="uber-close-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <span className="label">03. COACH & EXECUTIVE COVER</span>
                        <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                            YOUR <span className="text-red">LEVERAGE</span>
                        </h2>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                            {/* Coach */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2.5rem', borderLeft: '4px solid #00ff00',
                                background: 'linear-gradient(135deg, rgba(0,255,0,0.03), transparent)'
                            }}>
                                <div className="text-mono" style={{ marginBottom: '1rem', fontSize: '0.75rem', color: '#00ff00' }}>COACH / POWER BROKER (MAJOR ADVANTAGE)</div>
                                <h3 className="text-white" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Mark Collins</h3>
                                <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    Head of Law Enforcement Partnerships (ArrestDelta)<br />
                                    Former commanding officer of both Nadelle and Chris<br />
                                    Promoted both · High-trust relationship
                                </p>
                                <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>BLUE SHEET STATUS</div>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                    {["Coach", "Access facilitator", "Risk reducer", "Credibility multiplier"].map((item, i) => (
                                        <span key={i} style={{ color: '#00ff00', fontSize: '0.85rem' }}>✔ {item}</span>
                                    ))}
                                </div>
                                <p className="text-white" style={{ fontSize: '1rem', fontStyle: 'italic', borderLeft: '2px solid #00ff00', paddingLeft: '0.75rem' }}>
                                    Mark's role is not to sell-it is to reassure Nadelle that this reduces risk, not adds it.
                                </p>
                            </div>

                            {/* Executive Air Cover */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.15s' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>EXECUTIVE AIR COVER (OPTIONAL)</div>
                                <h3 className="text-white" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Dara Khosrowshahi</h3>
                                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    Access Path: via Jon Hall
                                </p>
                                <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>PURPOSE</div>
                                <ul className="text-muted" style={{ fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Not approval</li>
                                    <li>Not pricing</li>
                                    <li>Not procurement</li>
                                </ul>
                                <p className="text-white" style={{ fontSize: '0.9rem' }}>
                                    <em>"Uber is piloting a system to reduce false positives in arrest-related public safety decisions."</em>
                                </p>
                                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
                                    This creates organizational safety for Nadelle to move.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: WIN STRATEGY ========== */}
                <section className="brand-section" id="uber-close-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <span className="label">04. WIN STRATEGY</span>
                        <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                            WHAT THEY MUST <span className="text-red">BELIEVE</span>
                        </h2>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            {/* Nadelle */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2rem', border: '1px solid var(--color-alert-red)',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>WHAT NADELLE MUST BELIEVE TO SAY "YES"</div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "This reduces risk",
                                        "This reduces ops noise",
                                        "This does not create new liability",
                                        "This is narrowly scoped and reversible"
                                    ].map((item, i) => (
                                        <li key={i} className="text-white animate-fade-in-up" style={{
                                            display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem',
                                            marginBottom: '0.75rem', animationDelay: `${0.1 + i * 0.08}s`
                                        }}>
                                            <span className="text-red">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Chris */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.15s' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>WHAT CHRIS MUST BELIEVE</div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "The signal is cleaner than what they have today",
                                        "He won't be blamed for introducing risk",
                                        "This helps him protect Nadelle's org"
                                    ].map((item, i) => (
                                        <li key={i} className="text-white" style={{
                                            display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1.05rem',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <span className="text-muted">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Competitive Reality */}
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.25s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>COMPETITIVE REALITY - PRIMARY COMPETITOR: STATUS QUO</div>
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {["Batch background checks", "Periodic updates", "Manual verification"].map((item, i) => (
                                    <span key={i} className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                                        <span style={{ opacity: 0.5 }}>✕</span> {item}
                                    </span>
                                ))}
                            </div>
                            <p className="text-white" style={{ fontSize: '1rem', fontStyle: 'italic', borderLeft: '2px solid var(--color-alert-red)', paddingLeft: '0.75rem' }}>
                                "ArrestDelta does not replace background checks. It detects and verifies changes between checks."
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>This keeps politics calm.</p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: CLOSE PLAN ========== */}
                <section className="brand-section" id="uber-close-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <span className="label">05. CLOSE PLAN</span>
                        <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                            THE <span className="text-red">STEPS</span>
                        </h2>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            {[
                                {
                                    step: "1", title: "PRODUCT REVIEW",
                                    sub: "Chris-led, Nadelle present",
                                    content: "Chris validates signal quality in front of Nadelle.",
                                    gold: '"This removes a lot of noise we deal with today." That sentence is gold.'
                                },
                                {
                                    step: "2", title: "OPS FRAMING",
                                    sub: "Nadelle-focused",
                                    content: "Show how this reduces: Manual review, Appeals, Reversals, Escalations",
                                    note: "No tech depth unless asked."
                                },
                                {
                                    step: "3", title: "PILOT LOCK",
                                    sub: "Written agreement",
                                    content: "Lock: Scope, Duration, Success metrics, Cost, Exit/expand criteria",
                                    warning: "If this isn't written, we don't have a deal."
                                },
                                {
                                    step: "4", title: "EXEC CONTEXT",
                                    sub: "Jon → Dara",
                                    content: "Short, controlled awareness.",
                                    note: "Purpose: Political air cover. Not involvement."
                                },
                                {
                                    step: "5", title: "PROCUREMENT",
                                    sub: "Parallel track",
                                    content: "Start early, but after Nadelle says yes.",
                                    note: "Legal runs in parallel."
                                }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{
                                    padding: '1.25rem', animationDelay: `${i * 0.08}s`,
                                    borderTop: '3px solid var(--color-alert-red)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <span className="text-red text-mono" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item.step}</span>
                                        <div>
                                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>{item.title}</div>
                                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{item.sub}</div>
                                        </div>
                                    </div>
                                    <p className="text-white" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{item.content}</p>
                                    {item.gold && <p style={{ color: '#00ff00', fontSize: '0.8rem', fontStyle: 'italic' }}>{item.gold}</p>}
                                    {item.note && <p className="text-muted" style={{ fontSize: '0.8rem' }}>{item.note}</p>}
                                    {item.warning && <p className="text-red" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.warning}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: FINAL ========== */}
                <section className="brand-section" id="uber-close-06">
                    <div className="grid-bg-overlay" />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(ellipse at center, rgba(228, 0, 40, 0.08) 0%, transparent 60%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
                        <span className="label">06. RISKS & CLOSE</span>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                            {/* Deal Killers */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>DEAL KILLERS TO WATCH</div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        "Nadelle disengages",
                                        "Chris is positive but non-committal",
                                        '"Let\'s revisit later"',
                                        "Pilot scope keeps expanding"
                                    ].map((item, i) => (
                                        <li key={i} style={{ color: 'var(--color-alert-red)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                            ❌ {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-white" style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '1rem' }}>
                                    If we see these, reset immediately.
                                </p>
                            </div>

                            {/* Value Prop */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2rem', animationDelay: '0.1s',
                                background: 'rgba(228, 0, 40, 0.1)',
                                border: '1px solid var(--color-alert-red)'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>ONE-SENTENCE VALUE PROP</div>
                                <p className="text-white" style={{ fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                                    "ArrestDelta tells Uber when arrest records <em>actually change</em>, not when data refreshes,
                                    so Public Safety can act quickly without increasing false positives or legal risk."
                                </p>
                            </div>
                        </div>

                        {/* Final Truth */}
                        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginTop: '2rem', animationDelay: '0.2s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>FINAL TRUTH</div>
                            <p className="text-white" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                                This deal is real. Our leverage is real. Our relationships are rare.
                            </p>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Our only enemy now is:</p>
                            <p className="text-red" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                Over-scoping · Over-talking · Letting the deal drift
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                ← Back to Decks
                            </Link>
                        </div>
                    </div>
                </section>

            </div>

            {/* Navigation Dots */}
            <div className="nav-indicators" style={{ display: 'flex', gap: '8px', zIndex: 99 }}>
                {SLIDE_TITLES.map((title, i) => (
                    <div key={i} className="nav-group" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button
                            className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => scrollToSlide(i)}
                            title={title}
                            style={{
                                width: i === activeIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                background: i === activeIndex ? 'var(--color-alert-red)' : 'rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: i === activeIndex ? '0 0 10px var(--color-alert-red)' : 'none'
                            }}
                        />
                        {i === activeIndex && (
                            <span className="text-mono text-red animate-fade-in-up" style={{ position: 'absolute', bottom: '20px', fontSize: '0.6rem', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                                {title}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <NavigationArrows
                onPrev={() => scrollByAmount(-window.innerWidth)}
                onNext={() => scrollByAmount(window.innerWidth)}
                showPrev={showPrev}
                showNext={showNext}
            />
        </>
    );
};

export default UberClosePlan;
