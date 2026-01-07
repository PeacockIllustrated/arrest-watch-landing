import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import RadarNode from '../../components/investor/ui/RadarNode';
import OnboardingModal from '../../components/investor/_legacy/OnboardingModal';
import '../../styles/brand.css';

const SLIDE_TITLES = [
    "Intro", "Category", "Multiples", "ARR", "Incumbents", "Pricing", "Ownership", "Closing"
];

const ValuationRationale: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

                {/* ========== SLIDE 0: TITLE ========== */}
                <section className="brand-section" id="valuation-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.3 }}>
                        <RadarNode size="700px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>INVESTOR APPENDIX</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                VALUATION<br />
                                <span className="text-red text-glow">RATIONALE</span>
                            </h1>
                            <p className="text-mono text-muted" style={{ fontSize: '1.5rem', marginBottom: '4rem' }}>
                                Why a $15M Pre-Seed Is Rational
                            </p>
                            <p className="text-mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                                "We're priced as infrastructure, not services."
                            </p>
                            <Link to="/investor-delta" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                ← Back to Investor Pack
                            </Link>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%',
                        background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.15), transparent 70%)',
                        pointerEvents: 'none', zIndex: -1
                    }} />
                </section>

                {/* ========== SLIDE 1: CATEGORY POSITIONING ========== */}
                <section className="brand-section" id="valuation-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">01. CATEGORY POSITIONING</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>THIS IS NOT A <span className="text-red">BACKGROUND CHECK</span> COMPANY</h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                            {/* LEGACY SIDE */}
                            <div className="glass-panel animate-fade-in-up" style={{
                                height: '100%', padding: '2.5rem', display: 'flex', flexDirection: 'column',
                                opacity: 0.6, filter: 'grayscale(1)', border: '1px solid #333'
                            }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                                    BACKGROUND CHECK VENDORS
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        "Sell static reports",
                                        "Charge per lookup",
                                        "Compete on price",
                                        "Low switching costs",
                                        "Trade at lower multiples"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: '#666' }}>
                                            <span style={{ opacity: 0.5 }}>✕</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ARRESTDELTA SIDE */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                height: '110%', padding: '2.5rem', display: 'flex', flexDirection: 'column',
                                border: '1px solid var(--color-alert-red)',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                                zIndex: 2, boxShadow: '0 0 50px rgba(0,0,0,0.5)', animationDelay: '0.15s'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>ARRESTDELTA</span>
                                    <span className="pulse-active" style={{ width: '8px', height: '8px', background: 'var(--color-alert-red)', borderRadius: '50%' }}></span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        "Sells continuous risk intelligence",
                                        "Charges for monitoring, not reports",
                                        "Becomes embedded infrastructure",
                                        "High switching costs",
                                        "Trades on monitoring SaaS multiples"
                                    ].map((item, i) => (
                                        <li key={i} className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', color: 'white', animationDelay: `${0.2 + i * 0.08}s` }}>
                                            <span className="text-red">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-alert-red)' }}>
                                    <p className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>
                                        We are priced as infrastructure, not services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: PREMIUM MULTIPLES ========== */}
                <section className="brand-section" id="valuation-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="label">02. PREMIUM MULTIPLES</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>MONITORING SAAS COMMANDS <span className="text-red">8–15× ARR</span></h2>
                        </div>

                        {/* Investor Quote */}
                        <div className="animate-fade-in-up" style={{
                            borderLeft: '2px solid var(--color-grid)', padding: '1.5rem 2rem',
                            background: 'rgba(255,255,255,0.02)', marginBottom: '2.5rem', maxWidth: '700px'
                        }}>
                            <p className="text-muted" style={{ fontStyle: 'italic', fontSize: '1.1rem', margin: 0 }}>
                                "You're pre-revenue / early - this should be cheaper."
                            </p>
                        </div>

                        {/* Key Assertion */}
                        <div className="animate-fade-in-up" style={{
                            borderLeft: '3px solid var(--color-alert-red)', padding: '1rem 1.5rem',
                            background: 'rgba(228, 0, 40, 0.08)', marginBottom: '3rem', animationDelay: '0.1s'
                        }}>
                            <p className="text-white" style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
                                The correct anchor is what category this becomes, not current ARR.
                            </p>
                        </div>

                        {/* Comparable Cards */}
                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            {[
                                {
                                    title: "Security Monitoring", icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Fraud Detection", icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Credit Monitoring", icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <path d="M18 20V10M12 20V4M6 20v-6" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Compliance Alerting", icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                            <line x1="12" y1="9" x2="12" y2="13" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                    )
                                }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{
                                    padding: '1.5rem', textAlign: 'center', animationDelay: `${0.15 + i * 0.08}s`
                                }}>
                                    <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                    <div className="text-mono text-white" style={{ fontSize: '0.85rem' }}>{item.title}</div>
                                </div>
                            ))}
                        </div>

                        {/* Why They Trade High */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <p className="text-muted" style={{ marginBottom: '1rem' }}>These businesses trade at <span className="text-red text-mono">8–15× ARR</span> because:</p>
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                {["Revenue is recurring", "Churn is low", "Customers depend on alerts"].map((item, i) => (
                                    <span key={i} className="text-mono text-white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="text-red">•</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--color-grid)' }}>
                            <p className="text-mono text-white" style={{ fontSize: '1rem' }}>ArrestDelta fits this profile.</p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: ARR VISIBILITY ========== */}
                <section className="brand-section" id="valuation-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <span className="label">03. ARR VISIBILITY</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>HIGH VISIBILITY <span className="text-red">(EVEN AT PRE-SEED)</span></h2>
                        </div>

                        <p className="text-muted animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
                            A small number of platform customers unlock meaningful revenue:
                        </p>

                        {/* Metric Panel */}
                        <div className="glass-panel border-glow animate-fade-in-up" style={{
                            padding: '3rem', position: 'relative', overflow: 'hidden', animationDelay: '0.1s'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--color-alert-red), transparent)' }} />
                            <div className="text-mono text-muted" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                                SINGLE-CUSTOMER ARR MODEL
                            </div>

                            {/* Input Row */}
                            <div className="mobile-stack" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', textAlign: 'center', width: '100%' }}>
                                <div style={{ textAlign: 'center', padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>PLATFORMS</div>
                                    <div className="text-mono text-white" style={{ fontSize: '2rem', fontWeight: 700 }}>1</div>
                                </div>
                                <span className="text-mono text-muted" style={{ fontSize: '2rem' }}>×</span>
                                <div style={{ textAlign: 'center', padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>MONITORED WORKERS</div>
                                    <div className="text-mono text-white" style={{ fontSize: '2rem', fontWeight: 700 }}>200k</div>
                                </div>
                                <span className="text-mono text-muted" style={{ fontSize: '2rem' }}>×</span>
                                <div style={{ textAlign: 'center', padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>ARPU / MONTH</div>
                                    <div className="text-mono text-white" style={{ fontSize: '2rem', fontWeight: 700 }}>$6</div>
                                </div>
                            </div>

                            {/* Result */}
                            <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--color-grid)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                    <span className="text-mono text-red" style={{ fontSize: '2rem' }}>→</span>
                                    <span className="text-huge text-red text-glow" style={{ fontSize: '3.5rem' }}>$14.4M ARR</span>
                                </div>
                                <p className="text-mono text-muted" style={{ marginTop: '1rem' }}>from a single customer</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                            <p className="text-mono text-white" style={{ fontSize: '1rem' }}>
                                This is why valuation is driven by platform penetration, not logo count.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: INCUMBENT DYNAMICS ========== */}
                <section className="brand-section" id="valuation-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="label">04. INCUMBENT DYNAMICS</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>WHY COPYING IS <span className="text-red">HARD</span></h2>
                        </div>

                        {/* Investor Question */}
                        <div className="animate-fade-in-up" style={{
                            borderLeft: '2px solid var(--color-grid)', padding: '1.5rem 2rem',
                            background: 'rgba(255,255,255,0.02)', marginBottom: '3rem', maxWidth: '700px'
                        }}>
                            <p className="text-muted" style={{ fontStyle: 'italic', fontSize: '1.1rem', margin: 0 }}>
                                "Why won't Checkr or First Advantage just build this?"
                            </p>
                        </div>

                        {/* 4 Pillars */}
                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            {[
                                {
                                    icon: (
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <line x1="12" y1="1" x2="12" y2="23" />
                                            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                        </svg>
                                    ), title: "Revenue Cannibalization", desc: "Their revenue depends on re-running checks"
                                },
                                {
                                    icon: (
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                        </svg>
                                    ), title: "Batch-Based Systems", desc: "Their systems are batch-based, not event-driven"
                                },
                                {
                                    icon: (
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                                        </svg>
                                    ), title: "Core Business Conflict", desc: "Real-time alerts cannibalize their core business"
                                },
                                {
                                    icon: (
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-red)" strokeWidth="1.5">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0110 0v4" />
                                        </svg>
                                    ), title: "Gov Data Complexity", desc: "Government data ingestion at scale is non-trivial"
                                }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{
                                    padding: '1.5rem', textAlign: 'center', animationDelay: `${0.1 + i * 0.1}s`
                                }}>
                                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                    <div className="text-mono text-white" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>{item.title}</div>
                                    <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ paddingTop: '1.5rem', borderTop: '1px dashed var(--color-grid)' }}>
                            <p className="text-mono text-white" style={{ fontSize: '1.1rem' }}>
                                ArrestDelta is architected for this from day one.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: WHAT THIS PRICES IN ========== */}
                <section className="brand-section" id="valuation-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">05. WHAT $15M PRE PRICES IN</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}><span className="text-muted">(AND WHAT IT DOESN'T)</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Priced In */}
                            <div className="glass-panel animate-fade-in-up" style={{
                                padding: '2rem', background: 'rgba(136, 136, 136, 0.05)', borderStyle: 'dashed'
                            }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>PRICED IN</div>
                                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                                    {["Technical execution risk", "Early go-to-market risk"].map((item, i) => (
                                        <span key={i} className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                            <span style={{ opacity: 0.5 }}>•</span> {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Not Priced In */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2.5rem', background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                                border: '1px solid var(--color-alert-red)', animationDelay: '0.15s'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>NOT PRICED IN</span>
                                    <span className="pulse-active" style={{ width: '8px', height: '8px', background: 'var(--color-alert-red)', borderRadius: '50%' }}></span>
                                </div>
                                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                    {[
                                        "Platform-wide adoption",
                                        "Multi-year contracts",
                                        "International expansion",
                                        "Advanced analytics & upsells"
                                    ].map((item, i) => (
                                        <span key={i} className="text-white animate-fade-in-up" style={{
                                            display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.15rem',
                                            animationDelay: `${0.2 + i * 0.08}s`
                                        }}>
                                            <span className="text-red">✓</span> {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                            <p className="text-mono text-white" style={{ fontSize: '1rem' }}>
                                Those drive the next step-up, not this round.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: OWNERSHIP & DISCIPLINE ========== */}
                <section className="brand-section" id="valuation-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">06. OWNERSHIP & DISCIPLINE</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>CLEAN NEXT <span className="text-red">ROUND PATH</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch' }}>
                            {/* At $1M on $15M */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2.5rem', border: '1px solid var(--color-alert-red)',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>AT $1M ON $15M PRE</div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        "Founders retain proper ownership",
                                        "Enough capital to hit value-inflection milestones",
                                        "Clean step-up to a $30–40M Seed is realistic"
                                    ].map((item, i) => (
                                        <li key={i} className="animate-fade-in-up" style={{
                                            display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: 'white',
                                            animationDelay: `${0.15 + i * 0.1}s`
                                        }}>
                                            <span className="text-red" style={{ marginTop: '2px' }}>✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Lower Pricing Creates */}
                            <div className="glass-panel animate-fade-in-up" style={{
                                padding: '2.5rem', borderStyle: 'dashed', opacity: 0.7, animationDelay: '0.15s'
                            }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>LOWER PRICING WOULD CREATE</div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        "Misaligned incentives",
                                        "Artificial down-round pressure",
                                        "Weak signaling to enterprise buyers"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: '#888' }}>
                                            <span style={{ opacity: 0.5, marginTop: '2px' }}>✕</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: CLOSING POSITION ========== */}
                <section className="brand-section" id="valuation-slide-07">
                    <div className="grid-bg-overlay" />

                    {/* Multiple layered ambient effects */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.35 }}>
                        <RadarNode size="900px" type="radar" />
                    </div>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(ellipse at center, rgba(228, 0, 40, 0.08) 0%, transparent 60%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{
                        position: 'relative', zIndex: 2,
                        maxWidth: '1200px', margin: '0 auto',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        height: '100%', textAlign: 'center',
                        padding: '2rem'
                    }}>

                        {/* Giant Statement */}
                        <div className="animate-fade-in-up" style={{ marginBottom: '3rem' }}>
                            <h2 className="text-huge" style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                lineHeight: 1.1,
                                marginBottom: '0',
                                fontWeight: 800
                            }}>
                                NOT A BACKGROUND CHECK.<br />
                                <span className="text-red text-glow">A RISK MONITORING PLATFORM.</span>
                            </h2>
                        </div>

                        {/* The Quote */}
                        <div className="animate-fade-in-up" style={{
                            maxWidth: '800px',
                            padding: '2rem 3rem',
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid var(--color-grid)',
                            borderLeft: '4px solid var(--color-alert-red)',
                            textAlign: 'left',
                            marginBottom: '3rem',
                            animationDelay: '0.15s'
                        }}>
                            <p className="text-white" style={{
                                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                lineHeight: 1.8,
                                margin: 0,
                                fontStyle: 'italic'
                            }}>
                                "If this were a background check startup, this valuation wouldn't make sense.
                                <br /><br />
                                But this isn't. It's a real-time risk monitoring platform, and we're pricing it accordingly."
                            </p>
                        </div>

                        {/* Key Metrics Row */}
                        <div className="mobile-stack animate-fade-in-up" style={{
                            display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center',
                            animationDelay: '0.25s'
                        }}>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div className="text-mono text-red" style={{ fontSize: '1.8rem', fontWeight: 700 }}>$15M</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>PRE-SEED VALUATION</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div className="text-mono text-red" style={{ fontSize: '1.8rem', fontWeight: 700 }}>8–15×</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>CATEGORY MULTIPLES</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                                <div className="text-mono text-red" style={{ fontSize: '1.8rem', fontWeight: 700 }}>$14.4M</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>ARR / SINGLE PLATFORM</div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="animate-fade-in-up" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.35s' }}>
                            <Link to="/decks" className="btn btn-secondary" style={{
                                fontSize: '0.95rem',
                                padding: '1rem 2rem'
                            }}>
                                ← Back to Decks
                            </Link>
                            <Link to="/" className="btn btn-secondary" style={{
                                fontSize: '0.95rem',
                                padding: '1rem 2rem'
                            }}>
                                Visit Website
                            </Link>
                        </div>

                        <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                        {/* Footer tagline */}
                        <div className="animate-fade-in-up" style={{ marginTop: '4rem', animationDelay: '0.45s' }}>
                            <p className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                Priced as infrastructure. Built for scale. Ready for due diligence.
                            </p>
                        </div>
                    </div>

                    {/* Bottom scan line effect */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--color-alert-red), transparent)',
                        boxShadow: '0 0 20px var(--color-alert-red)',
                        opacity: 0.6
                    }} />
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

export default ValuationRationale;
