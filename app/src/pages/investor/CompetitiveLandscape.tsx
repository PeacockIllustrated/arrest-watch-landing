import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { COMPETITIVE_LANDSCAPE_CONFIG } from '../../lib/competitiveLandscapeConfig';

const CONFIG = COMPETITIVE_LANDSCAPE_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const CompetitiveLandscape: React.FC = () => {
    usePageTitle('Competitive Landscape');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Interaction States
    const [thesisMode, setThesisMode] = useState<'timeliness' | 'confidence'>('timeliness');
    const [activeGridRow, setActiveGridRow] = useState<string | null>(null);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

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

    const scrollToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const width = window.innerWidth;
            scrollContainerRef.current.scrollTo({
                left: width * index,
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

    // Helper for rendering player list with source gating
    const renderPlayers = (players: typeof CONFIG.ecosystem.rows[0]['mainPlayers']) => (
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {players.map((p, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1rem', borderLeft: '2px solid var(--color-grid)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#fff', fontWeight: 600 }}>{p.name}</span>
                        {p.showCompNumbers && <span className="text-mono" style={{ fontSize: '0.65rem', color: '#666' }}>SOURCE</span>}
                    </div>
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
                        {p.description}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: prefersReducedMotion ? 'none' : 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: THESIS ========== */}
                <section className="brand-section" id="cl-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>THESIS</span>

                            {/* Confidence vs Timeliness Switch */}
                            <div style={{ marginBottom: '2rem', display: 'inline-flex', border: '1px solid var(--color-grid)', background: 'rgba(255,255,255,0.05)' }}>
                                <button
                                    onClick={() => setThesisMode('timeliness')}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: thesisMode === 'timeliness' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: thesisMode === 'timeliness' ? '#fff' : '#666',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    TIMELINESS
                                </button>
                                <button
                                    onClick={() => setThesisMode('confidence')}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: thesisMode === 'confidence' ? 'var(--color-alert-red)' : 'transparent',
                                        color: thesisMode === 'confidence' ? '#fff' : '#666',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    CONFIDENCE
                                </button>
                            </div>

                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                                {thesisMode === 'timeliness' ? (
                                    <>
                                        The Market Has Moved Toward <span className="text-white">Timeliness</span>...
                                    </>
                                ) : (
                                    <>
                                        ...But Not Toward <span className="text-red">Decision Confidence</span>.
                                    </>
                                )}
                            </h1>

                            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '850px', lineHeight: 1.6 }}>
                                {CONFIG.thesis.problemStatement}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: CATEGORY MAP ========== */}
                <section className="brand-section" id="cl-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>THE ECOSYSTEM</span>

                            <div className="cl-ecosystem-grid">
                                {/* Left Side: The List */}
                                <div className="cl-grid-list">
                                    {CONFIG.ecosystem.rows.map((row) => (
                                        <div
                                            key={row.id}
                                            className={`cl-grid-row ${activeGridRow === row.id ? 'active' : ''}`}
                                            onClick={() => setActiveGridRow(row.id === activeGridRow ? null : row.id)}
                                            onMouseEnter={() => setActiveGridRow(row.id)}
                                            style={{
                                                padding: '1.25rem 1.5rem',
                                                border: activeGridRow === row.id ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                                background: activeGridRow === row.id ? 'rgba(228, 0, 40, 0.05)' : 'rgba(255,255,255,0.02)',
                                                marginBottom: '0.75rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span style={{ color: activeGridRow === row.id ? '#fff' : '#888', fontWeight: 500, fontSize: '1rem' }}>
                                                {row.title}
                                            </span>
                                            <span className="text-mono" style={{ color: activeGridRow === row.id ? 'var(--color-alert-red)' : '#444', fontSize: '0.8rem' }}>
                                                {activeGridRow === row.id ? 'OPEN' : '+'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side: Dossier Panel */}
                                <div className="cl-dossier-panel glass-panel" style={{
                                    padding: '2rem',
                                    borderLeft: '4px solid var(--color-alert-red)',
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    {activeGridRow ? (
                                        (() => {
                                            const row = CONFIG.ecosystem.rows.find(r => r.id === activeGridRow)!;
                                            return (
                                                <div className="animate-fade-in">
                                                    <h3 className="text-large" style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>{row.title.split('. ')[1]}</h3>

                                                    <div style={{ marginBottom: '1.5rem' }}>
                                                        <span className="text-mono text-muted" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>WHAT THEY DO</span>
                                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#ccc' }}>
                                                            {row.whatTheyDo.map((item, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>)}
                                                        </ul>
                                                    </div>

                                                    <div style={{ marginBottom: '1.5rem' }}>
                                                        <span className="text-mono text-red" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>LIMITATIONS</span>
                                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#fff' }}>
                                                            {row.structuralLimitations.map((item, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>)}
                                                        </ul>
                                                    </div>

                                                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                                        <span className="text-mono text-muted" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>TAKEAWAY</span>
                                                        <p style={{ fontStyle: 'italic', margin: 0, color: '#fff' }}>"{row.keyTakeaway}"</p>
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <div style={{ textAlign: 'center', color: '#666' }}>
                                            <p className="text-mono" style={{ fontSize: '0.9rem' }}>SELECT A CATEGORY TO INSPECT</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDES 2-6: INDIVIDUAL BUCKETS ========== */}
                {CONFIG.ecosystem.rows.map((row) => (
                    <section key={row.id} className="brand-section" id={`cl-bucket-${row.id}`}>
                        <div className="grid-bg-overlay" />
                        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                            <div className="animate-fade-in-up">
                                <span className="label">{row.title}</span>
                                <h2 className="text-large" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', marginBottom: '1.5rem', color: '#fff' }}>
                                    {row.roleInEcosystem ? row.roleInEcosystem : "Market Analysis"}
                                </h2>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
                                    <div>
                                        <h3 className="text-mono text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>STRUCTURE</h3>
                                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                            <p style={{ color: '#aaa', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>What They Do</p>
                                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.2rem', color: '#ccc' }}>
                                                {row.whatTheyDo.map((x, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{x}</li>)}
                                            </ul>

                                            <p style={{ color: 'var(--color-alert-red)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Limitations</p>
                                            <ul style={{ paddingLeft: '1.2rem', color: '#fff' }}>
                                                {row.structuralLimitations.map((x, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{x}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-mono text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>KEY PLAYERS</h3>
                                        {renderPlayers(row.mainPlayers)}

                                        <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--color-alert-red)', background: 'rgba(228, 0, 40, 0.05)' }}>
                                            <p style={{ color: '#fff', fontStyle: 'italic', margin: 0, fontSize: '1.1rem' }}>
                                                {row.keyTakeaway}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* ========== SLIDE 7: DIFFERENTIATION ========== */}
                <section className="brand-section" id="cl-slide-diff">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">DIFFERENTIATION</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.differentiation.title}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
                                {CONFIG.differentiation.subtitle}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                                <div>
                                    {CONFIG.differentiation.points.map((point, i) => (
                                        <div key={i} className="glass-panel" style={{
                                            padding: '1.25rem 1.5rem',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            borderLeft: '3px solid var(--color-alert-red)'
                                        }}>
                                            <span className="text-red">›</span>
                                            <span style={{ color: '#fff', fontSize: '1.1rem' }}>{point}</span>
                                        </div>
                                    ))}

                                    <p className="text-white" style={{ marginTop: '2rem', fontSize: '1.2rem', fontStyle: 'italic', borderLeft: '2px solid #555', paddingLeft: '1rem' }}>
                                        {CONFIG.differentiation.conclusion}
                                    </p>
                                </div>

                                <div className="cl-micro-visual" style={{
                                    border: '1px solid var(--color-grid)',
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>STATEFUL VS EVENT</span>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.8 }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#666' }}></div>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Event (Point-in-Time)</span>
                                    </div>
                                    <div style={{ width: '2px', height: '20px', background: '#333', margin: '0.5rem 0' }}></div>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--color-alert-red)', boxShadow: '0 0 10px var(--color-alert-red)' }}></div>
                                        <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>State (Evolution)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 8: STANDALONE COMPANY ========== */}
                <section className="brand-section" id="cl-slide-standalone">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">STRATEGIC POSITION</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.standalone.title}
                            </h2>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>This layer persists because:</p>
                                {CONFIG.standalone.reasons.map((reason, i) => (
                                    <div key={i} style={{ marginBottom: '1.25rem', display: 'flex', gap: '1rem' }}>
                                        <span className="text-mono" style={{ color: 'var(--color-alert-red)', fontWeight: 600 }}>0{i + 1}</span>
                                        <span style={{ color: '#fff', fontSize: '1.1rem' }}>{reason}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px solid var(--color-grid)', background: 'linear-gradient(90deg, rgba(228, 0, 40, 0.1), transparent)' }}>
                                <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500, margin: 0 }}>
                                    {CONFIG.standalone.conclusion}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 9: INVESTOR SUMMARY ========== */}
                <section className="brand-section" id="cl-slide-summary">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">INVESTOR SUMMARY</span>
                            <div className="cl-summary-callout" style={{
                                padding: '3rem',
                                background: 'rgba(228, 0, 40, 0.05)',
                                border: '2px solid var(--color-alert-red)',
                                boxShadow: '0 0 40px rgba(228, 0, 40, 0.15)',
                                marginTop: '2rem'
                            }}>
                                <p style={{
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    {CONFIG.investorSummary}
                                </p>
                            </div>

                            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/decks" className="btn">
                                    ← BACK TO DECKS
                                </Link>
                                <Link to="/" className="btn btn-secondary">
                                    MAIN SITE
                                </Link>
                            </div>
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
                            aria-label={`Go to slide: ${title}`}
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
                showPrev={showPrev}
                showNext={showNext}
                onPrev={() => scrollByAmount(-window.innerWidth)}
                onNext={() => scrollByAmount(window.innerWidth)}
            />

            <style>{`
                .cl-ecosystem-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    height: 100%;
                    align-items: center;
                }

                @media (max-width: 768px) {
                    .cl-ecosystem-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    .cl-dossier-panel {
                        min-height: auto !important;
                    }
                    .cl-micro-visual {
                        display: none;
                    }
                    .brand-section {
                         padding: 2rem 1.5rem !important;
                         overflow-y: auto !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CompetitiveLandscape;
