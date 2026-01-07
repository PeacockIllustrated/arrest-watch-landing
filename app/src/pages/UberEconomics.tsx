import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../components/NavigationArrows';
import RadarNode from '../components/investor/ui/RadarNode';
import '../styles/brand.css';

const SLIDE_TITLES = [
    "Intro", "Baseline", "Pilot", "Cost/Risk", "Rounding Error", "Why Us", "Expansion", "Closing"
];

const UberEconomics: React.FC = () => {
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

                {/* ========== SLIDE 0: TITLE ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.3 }}>
                        <RadarNode size="700px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>APPENDIX</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                UBER PILOT<br />
                                <span className="text-red text-glow">ECONOMICS</span>
                            </h1>
                            <p className="text-mono text-muted" style={{ fontSize: '1.5rem', marginBottom: '4rem' }}>
                                Why ArrestDelta Pays for Itself Immediately
                            </p>
                            <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                ← Back to Decks
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: BASELINE ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">01. BASELINE</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>UBER'S <span className="text-red">REALITY</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                            {/* Facts */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2.5rem' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>CURRENT STATE</div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        "Millions of active drivers globally",
                                        "Continuous churn and re-onboarding",
                                        "Bad actors re-enter using new/falsified identity data",
                                        "Arrests occur post-onboarding, detected weeks later"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: 'white' }}>
                                            <span style={{ opacity: 0.5, marginTop: '4px' }}>•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Consequences */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2.5rem', border: '1px solid var(--color-alert-red)',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                                animationDelay: '0.1s'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>THE COST OF DELAYED SIGNALS</div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {["Legal liability", "Regulatory scrutiny", "Brand damage", "Platform trust erosion"].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'white' }}>
                                            <span className="text-red">⚠</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-alert-red)' }}>
                                    <p className="text-muted" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                                        "Uber already spends heavily on trust & safety, but with delayed signals."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: PILOT STRUCTURE ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">02. PILOT STRUCTURE</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>PROPOSED <span className="text-red">PILOT</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Phase 1 */}
                            <div className="glass-panel animate-fade-in-up" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>PHASE 1</div>
                                <h3 className="text-white" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Verification Search <br /><span className="text-muted" style={{ fontSize: '1.2rem' }}>(Onboarding Gate)</span></h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }}>
                                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>VOLUME</div>
                                        <div className="text-white" style={{ fontSize: '1.2rem', fontWeight: 600 }}>1,000,000</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }}>
                                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>PRICE</div>
                                        <div className="text-white" style={{ fontSize: '1.2rem', fontWeight: 600 }}>$3 / search</div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <div className="text-mono text-red" style={{ fontSize: '2rem', fontWeight: 700 }}>$3.0M</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>ANNUALIZED COST</div>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                    <div className="text-mono text-white" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>OUTCOME:</div>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Detect prior arrests missed by identity reuse. Reduce bad actors before they go live.</p>
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div className="glass-panel border-glow animate-fade-in-up" style={{
                                padding: '2.5rem', display: 'flex', flexDirection: 'column',
                                background: 'linear-gradient(135deg, rgba(228,0,40,0.08), transparent)',
                                border: '1px solid var(--color-alert-red)',
                                animationDelay: '0.1s'
                            }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>PHASE 2</div>
                                <h3 className="text-white" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Real-Time Monitoring <br /><span className="text-muted" style={{ fontSize: '1.2rem' }}>(Post-Onboarding)</span></h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ background: 'rgba(228,0,40,0.1)', padding: '1rem' }}>
                                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>DRIVERS</div>
                                        <div className="text-white" style={{ fontSize: '1.2rem', fontWeight: 600 }}>200,000</div>
                                    </div>
                                    <div style={{ background: 'rgba(228,0,40,0.1)', padding: '1rem' }}>
                                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>PRICE</div>
                                        <div className="text-white" style={{ fontSize: '1.2rem', fontWeight: 600 }}>$6 / mo</div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <div className="text-mono text-red text-glow" style={{ fontSize: '2rem', fontWeight: 700 }}>$14.4M</div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>ANNUAL COST</div>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-alert-red)' }}>
                                    <div className="text-mono text-white" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>OUTCOME:</div>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Alerts within minutes. Immediate suspension. Eliminates "unknown risk window".</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: COST VS RISK ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">03. INVESTMENT</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>COST VS <span className="text-red">RISK EXPOSURE</span></h2>
                        </div>

                        <div className="glass-panel animate-fade-in-up" style={{ padding: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '1rem' }}>
                                <span className="text-mono text-muted">ITEM</span>
                                <span className="text-mono text-muted">AMOUNT</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <span className="text-white" style={{ fontSize: '1.2rem' }}>Verification Searches</span>
                                <span className="text-white" style={{ fontSize: '1.2rem' }}>$3.0M</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <span className="text-white" style={{ fontSize: '1.2rem' }}>Live Monitoring</span>
                                <span className="text-white" style={{ fontSize: '1.2rem' }}>$14.4M</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '2px solid var(--color-alert-red)' }}>
                                <span className="text-mono text-red" style={{ fontSize: '1.5rem', fontWeight: 700 }}>TOTAL ANNUAL COST</span>
                                <span className="text-mono text-white" style={{ fontSize: '2rem', fontWeight: 700 }}>$17.4M</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: ROUNDING ERROR ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span className="label">04. CONTEXT</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>WHY THIS IS A <span className="text-red">ROUNDING ERROR</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', textAlign: 'center', width: '100%' }}>
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <div className="text-mono text-green" style={{ fontSize: '3rem', fontWeight: 700 }}>$17.4M</div>
                                <div className="text-mono text-muted">PILOT COST</div>
                            </div>

                            <div style={{ fontSize: '2rem', color: '#666', textAlign: 'center', width: '100%' }}>vs</div>

                            <div style={{ textAlign: 'center', position: 'relative', width: '100%' }}>
                                <div className="text-mono text-red text-glow" style={{ fontSize: '4rem', fontWeight: 700 }}>$100M+</div>
                                <div className="text-mono text-muted">SINGLE TRUST INCIDENT</div>
                                <div style={{ position: 'absolute', top: '-10%', right: '20%', fontSize: '3rem', opacity: 0.2 }}>⚠</div>
                            </div>
                        </div>

                        <div className="glass-panel animate-fade-in-up" style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', maxWidth: '800px', marginInline: 'auto' }}>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                                    <span className="text-red">•</span> Regulatory settlements
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                                    <span className="text-red">•</span> Brand trust impact
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                                    <span className="text-red">•</span> Market cap erosion
                                </li>
                            </ul>
                            <p className="text-mono text-white" style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
                                Preventing one major incident pays for ArrestDelta for years.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: WHY NOT INTERNAL ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="label">05. BUILD VS BUY</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>WHY UBER CAN'T SOLVE THIS <span className="text-red">INTERNALLY</span></h2>
                        </div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                            {[
                                { title: "Fragmented Data", desc: "Data is fragmented across thousands of jurisdictions." },
                                { title: "Constant Ingestion", desc: "Requires constant ingestion, normalization, and alerting." },
                                { title: "Auditability", desc: "Needs independent auditability and verification." }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: `${i * 0.1}s` }}>
                                    <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>0{i + 1}.</div>
                                    <h3 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{item.title}</h3>
                                    <p className="text-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center' }} className="animate-fade-in-up">
                            <div style={{ display: 'inline-block', border: '1px solid var(--color-alert-red)', padding: '1rem 2rem', background: 'rgba(228,0,40,0.1)' }}>
                                <p className="text-mono text-white" style={{ margin: 0 }}>
                                    Internal build = Multi-year effort + Ongoing maintenance. <br />
                                    <span className="text-red">ArrestDelta is purpose-built for this.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: EXPANSION ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span className="label">06. THE FUTURE</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>EXPANSION <span className="text-red">PATH</span></h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                            {/* Line connecting items */}
                            <div style={{ position: 'absolute', top: '0', bottom: '0', left: '25px', width: '2px', background: 'var(--color-alert-red)', zIndex: 0 }} />

                            {[
                                "Expand to additional regions",
                                "Increase monitored population",
                                "Add enhanced matching & analytics",
                                "Multi-year enterprise contract"
                            ].map((item, i) => (
                                <div key={i} className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 1, animationDelay: `${i * 0.1}s` }}>
                                    <div style={{ width: '50px', height: '50px', background: '#111', border: '2px solid var(--color-alert-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {i + 1}
                                    </div>
                                    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                                        <span className="text-white" style={{ fontSize: '1.2rem' }}>{item}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <p className="text-mono text-muted">This becomes core trust infrastructure, not a vendor tool.</p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: CLOSING ========== */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.3 }}>
                        <RadarNode size="900px" type="radar" />
                    </div>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                        <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
                            <h2 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.2, marginBottom: '3rem', fontStyle: 'italic' }}>
                                "This pilot doesn’t add cost,<br />
                                it replaces <span className="text-red text-glow">blind spots</span>."
                            </h2>
                            <p className="text-white" style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                And blind spots are where Uber’s real risk lives.
                            </p>

                            <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
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

export default UberEconomics;
