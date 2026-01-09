import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import RadarNode from '../../components/investor/ui/RadarNode';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';

const SLIDE_TITLES = [
    "Why", "Friction", "Pain", "Failed", "Insight", "Solvable", "Tailwinds", "Close"
];

const InvestorQuestions: React.FC = () => {
    usePageTitle('Why ArrestDelta');
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

                {/* ========== SLIDE 0: OPENING ========== */}
                <section className="brand-section" id="why-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.3 }}>
                        <RadarNode size="700px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>INVESTOR INSIGHT</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.95, marginBottom: '3rem' }}>
                                WHY<br />
                                <span className="text-red text-glow">ARRESTDELTA</span>
                            </h1>

                            {/* Opening Quote */}
                            <div style={{
                                maxWidth: '800px',
                                margin: '0 auto 3rem',
                                padding: '2rem 3rem',
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid var(--color-grid)',
                                borderLeft: '4px solid var(--color-alert-red)',
                                textAlign: 'left'
                            }}>
                                <p className="text-white" style={{
                                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                                    lineHeight: 1.7,
                                    margin: 0,
                                    fontStyle: 'italic'
                                }}>
                                    "ArrestDelta exists because enterprises don't need more arrest data, they need to know when something actually changed, and they need to trust it."
                                </p>
                            </div>

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

                {/* ========== SLIDE 1: FRICTION - TODAY'S PROBLEMS ========== */}
                <section className="brand-section" id="why-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span className="label">01. THE FRICTION</span>
                            <h2 className="text-large" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                                WHAT FRICTION HAVE WE <span className="text-red">IDENTIFIED?</span>
                            </h2>
                        </div>

                        {/* Key Assertion */}
                        <div className="animate-fade-in-up" style={{
                            borderLeft: '3px solid var(--color-alert-red)', padding: '0.75rem 1.25rem',
                            background: 'rgba(228, 0, 40, 0.08)', marginBottom: '1.5rem'
                        }}>
                            <p className="text-white" style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                                The friction is not "lack of arrest data."<br />
                                The friction is lack of trustworthy change detection in arrest data.
                            </p>
                        </div>

                        {/* Today's Problems */}
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.1s' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>TODAY:</div>
                            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                {[
                                    "Arrest and booking data is fragmented across thousands of county systems",
                                    "Records update asynchronously, silently, and inconsistently",
                                    "Enterprises don't know what changed, when, or whether it's real",
                                    "False positives are common",
                                    "Verification is manual, slow, and expensive"
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: '#888' }}>
                                        <span style={{ opacity: 0.5 }}>•</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: FRICTION - THE REAL PAIN ========== */}
                <section className="brand-section" id="why-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span className="label">01. THE FRICTION (CONTINUED)</span>
                            <h2 className="text-large" style={{ fontSize: '2.2rem', marginBottom: '0' }}>
                                THE REAL <span className="text-red">PAIN</span>
                            </h2>
                        </div>

                        <div className="glass-panel border-glow animate-fade-in-up" style={{
                            padding: '2rem', border: '1px solid var(--color-alert-red)',
                            background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)'
                        }}>
                            <p className="text-white" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                                Teams don't need more data. They need to know when something meaningful has changed — with confidence.
                            </p>
                            <p className="text-muted" style={{ marginBottom: '1rem' }}>That uncertainty creates:</p>
                            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {[
                                    "Compliance risk",
                                    "Missed alerts",
                                    "Over-notification",
                                    "Manual review workflows",
                                    "Legal exposure"
                                ].map((item, i) => (
                                    <span key={i} className="text-white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                                        <span className="text-red">✕</span> {item}
                                    </span>
                                ))}
                            </div>
                            <div style={{ paddingTop: '1.5rem', borderTop: '1px dashed var(--color-grid)' }}>
                                <p className="text-mono text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    This is operational friction, not informational scarcity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: FAILED APPROACHES ========== */}
                <section className="brand-section" id="why-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="label">02. FAILED APPROACHES</span>
                            <h2 className="text-large" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                                HOW HAVE PEOPLE TRIED TO <span className="text-red">SOLVE THIS?</span>
                            </h2>
                            <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>
                                Three legacy approaches, all broken in different ways:
                            </p>
                        </div>

                        {/* Three Approaches in a row */}
                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {[
                                {
                                    title: "1. BULK DATA AGGREGATORS",
                                    items: ["Pull periodic dumps", "Refresh slowly", "No \"state change\" concept", "Treat records as static"],
                                    result: "Stale data, noisy alerts, missed events"
                                },
                                {
                                    title: "2. SCRAPERS + CRON JOBS",
                                    items: ["Re-scrape everything", "Compare raw HTML/CSVs", "Extremely brittle", "Break under site changes"],
                                    result: "High false positives, unreliable alerts"
                                },
                                {
                                    title: "3. MANUAL MONITORING",
                                    items: ["Humans checking portals", "Call-center verification", "Expensive and slow", "Non-scalable"],
                                    result: "Doesn't scale past small volumes"
                                }
                            ].map((approach, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{ padding: '1.25rem', borderStyle: 'dashed', opacity: 0.85, animationDelay: `${i * 0.1}s` }}>
                                    <div className="text-mono text-muted" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>{approach.title}</div>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                                        {approach.items.map((item, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
                                                <span style={{ opacity: 0.5 }}>•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-grid)' }}>
                                        <span className="text-red">❌</span>
                                        <span className="text-muted" style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>{approach.result}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why They Failed */}
                        <div className="glass-panel border-glow animate-fade-in-up" style={{
                            padding: '1.25rem', marginTop: '1rem', border: '1px solid var(--color-alert-red)',
                            background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                            animationDelay: '0.3s'
                        }}>
                            <div className="text-mono text-red" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>WHY THEY FAILED</div>
                            <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                They all treat arrests as records, not stateful events. No one built infrastructure for verified change detection.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: CORE INSIGHT ========== */}
                <section className="brand-section" id="why-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.2 }}>
                        <RadarNode size="600px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <span className="label" style={{ marginBottom: '2rem' }}>03. OUR ADVANTAGE</span>
                        <h2 className="text-huge animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                            THE ONLY SIGNAL THAT MATTERS IS<br />
                            <span className="text-red text-glow">THE DELTA, NOT THE DATASET.</span>
                        </h2>
                        <p className="text-muted animate-fade-in-up" style={{ fontSize: '1.2rem', animationDelay: '0.1s' }}>
                            ArrestDelta is built around one core insight.
                        </p>
                    </div>
                </section>

                {/* ========== SLIDE 5: WHAT'S DIFFERENT NOW ========== */}
                <section className="brand-section" id="why-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="label">03. OUR ADVANTAGE (CONTINUED)</span>
                            <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '0' }}>
                                WHAT'S <span className="text-red">DIFFERENT NOW</span>
                            </h2>
                        </div>

                        {/* 4 Differentiators in 2x2 grid */}
                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {[
                                {
                                    title: "1. STATE-AWARE CHANGE DETECTION",
                                    items: ["Model arrests as state machines", "Detect transitions (booking, release, correction)", "Ignore non-meaningful noise"],
                                    note: "Eliminates massive percentage of false alerts."
                                },
                                {
                                    title: "2. VERIFICATION-FIRST ARCHITECTURE",
                                    items: ["Source consistency validation", "Temporal plausibility checks", "Structural vs cosmetic updates"],
                                    note: "Creates confidence scores, not blind alerts."
                                },
                                {
                                    title: "3. MODERN AUTOMATION",
                                    items: ["Headless browsers", "Resilient scraping", "Normalization pipelines", "Event-based delivery"],
                                    note: "Tools that didn't exist 5–10 years ago."
                                },
                                {
                                    title: "4. HARDEST PART SOLVED",
                                    items: ["County-level variability", "Scraping hostility", "Data normalization", "Alert accuracy"],
                                    note: "Remaining work is scaling, not inventing."
                                }
                            ].map((diff, i) => (
                                <div key={i} className="glass-panel border-glow animate-fade-in-up" style={{
                                    padding: '1rem', border: '1px solid var(--color-alert-red)',
                                    background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                                    animationDelay: `${i * 0.08}s`
                                }}>
                                    <div className="text-mono text-red" style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>{diff.title}</div>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.5rem' }}>
                                        {diff.items.map((item, j) => (
                                            <li key={j} className="text-white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                                <span className="text-red">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem', fontStyle: 'italic' }}>{diff.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: TAILWINDS ========== */}
                <section className="brand-section" id="why-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <span className="label">04. TAILWINDS</span>
                            <h2 className="text-large" style={{ fontSize: '2rem', marginBottom: '0' }}>
                                WHAT TAILWINDS SUPPORT THIS <span className="text-red">OVER 4–10 YEARS?</span>
                            </h2>
                        </div>

                        {/* 4 Tailwinds in 2x2 grid */}
                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {[
                                {
                                    title: "1. COMPLIANCE PRESSURE INCREASING",
                                    tags: ["Financial", "Marketplaces", "Gig", "Insurers"],
                                    text: "All face greater liability for stale criminal data.",
                                    note: "They need provable accuracy."
                                },
                                {
                                    title: "2. PUBLIC RECORDS NOT GETTING CLEANER",
                                    items: ["More decentralization", "More async updates", "More expungements"],
                                    note: "Problem getting harder favors infrastructure."
                                },
                                {
                                    title: "3. SHIFT TO EVENT-DRIVEN SYSTEMS",
                                    items: ["Real-time alerts", "Webhooks", "Automation"],
                                    note: "ArrestDelta plugs directly into this."
                                },
                                {
                                    title: "4. AI INCREASES COST OF BAD DATA",
                                    items: ["Bad data propagates faster", "Errors compound", "Liability increases"],
                                    note: "Verified source-of-truth more valuable."
                                }
                            ].map((tw, i) => (
                                <div key={i} className="glass-panel border-glow animate-fade-in-up" style={{
                                    padding: '1rem', border: '1px solid var(--color-alert-red)',
                                    background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                                    animationDelay: `${i * 0.08}s`
                                }}>
                                    <div className="text-mono text-red" style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>{tw.title}</div>
                                    {tw.tags && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                            {tw.tags.map((tag, j) => (
                                                <span key={j} className="text-mono text-muted" style={{
                                                    padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid var(--color-grid)', fontSize: '0.65rem'
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    {tw.text && <p className="text-white" style={{ fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{tw.text}</p>}
                                    {tw.items && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                            {tw.items.map((item, j) => (
                                                <span key={j} className="text-white" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span className="text-red">→</span> {item}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem', fontStyle: 'italic' }}>{tw.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: CLOSE ========== */}
                <section className="brand-section" id="why-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.25 }}>
                        <RadarNode size="800px" type="radar" />
                    </div>

                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                                WE DON'T RE-CHECK THE PAST.<br />
                                <span className="text-red text-glow">WE MONITOR THE PRESENT.</span>
                            </h2>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                    ← Back to Decks
                                </Link>
                                <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                    Visit Website
                                </Link>
                            </div>
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

export default InvestorQuestions;
