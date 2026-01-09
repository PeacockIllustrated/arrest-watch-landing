import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { PRODUCT_FLOW_CONFIG as CONFIG } from '../../lib/productFlowConfig';

const ProductFlow: React.FC = () => {
    usePageTitle('Product Flow');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Interaction states
    const [activeStep, setActiveStep] = useState<string>('verification'); // Default focus on Step 4
    const [hoveredSegment, setHoveredSegment] = useState<'provisional' | 'gate' | 'verified' | null>(null);

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

    const getSegmentForStep = (stepId: string) => {
        if (['ingestion', 'detection', 'resolution'].includes(stepId)) return 'provisional';
        if (stepId === 'verification') return 'gate';
        if (stepId === 'routing') return 'verified';
        return null;
    };

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: prefersReducedMotion ? 'none' : 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: INTRO / THESIS ========== */}
                <section className="brand-section" id="pf-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>INFRASTRUCTURE</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
                                {CONFIG.meta.title}
                            </h1>
                            <h2 className="text-large text-muted" style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: 400 }}>
                                {CONFIG.meta.subheading}
                            </h2>

                            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-grid)', maxWidth: '900px' }}>
                                <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{CONFIG.intro.paragraph1}</p>
                                <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{CONFIG.intro.paragraph2}</p>
                                <p className="text-white" style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.6 }}>{CONFIG.intro.paragraph3}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: THE FLOW ========== */}
                <section className="brand-section" id="pf-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="animate-fade-in-up">
                            {/* Segment Labels */}
                            <div style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                gap: '4px',
                                maxWidth: '1000px',
                                marginInline: 'auto'
                            }}>
                                {/* Provisional Segment */}
                                <div
                                    onMouseEnter={() => setHoveredSegment('provisional')}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                    style={{
                                        flex: 3,
                                        background: hoveredSegment === 'provisional' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                                        padding: '0.5rem',
                                        borderTop: hoveredSegment === 'provisional' ? '2px solid #666' : '2px solid transparent',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>PROVISIONAL SIGNALS</span>
                                </div>
                                {/* Gate Segment */}
                                <div
                                    onMouseEnter={() => setHoveredSegment('gate')}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                    style={{
                                        flex: 1,
                                        background: hoveredSegment === 'gate' ? 'rgba(228, 0, 40, 0.15)' : 'rgba(255,255,255,0.03)',
                                        padding: '0.5rem',
                                        borderTop: hoveredSegment === 'gate' ? '2px solid var(--color-alert-red)' : '2px solid transparent',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: hoveredSegment === 'gate' ? 'var(--color-alert-red)' : '#888' }}>VERIFICATION GATE</span>
                                </div>
                                {/* Verified Segment */}
                                <div
                                    onMouseEnter={() => setHoveredSegment('verified')}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                    style={{
                                        flex: 1,
                                        background: hoveredSegment === 'verified' ? 'rgba(0, 255, 0, 0.05)' : 'rgba(255,255,255,0.03)',
                                        padding: '0.5rem',
                                        borderTop: hoveredSegment === 'verified' ? '2px solid #fff' : '2px solid transparent',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: hoveredSegment === 'verified' ? '#fff' : '#888' }}>ACTIONABLE ROUTING</span>
                                </div>
                            </div>

                            {/* The Flow Diagram */}
                            <div style={{ overflowX: 'auto', paddingBottom: '2rem' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                    gap: '1rem',
                                    minWidth: '1000px',
                                    position: 'relative',
                                    maxWidth: '1200px',
                                    marginInline: 'auto'
                                }}>
                                    {/* Connecting Line */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '10%',
                                        right: '10%',
                                        height: '2px',
                                        background: 'var(--color-grid)',
                                        zIndex: 0
                                    }} />

                                    {CONFIG.steps.map((step, i) => {
                                        const isFocused = activeStep === step.id;
                                        const segment = getSegmentForStep(step.id);
                                        const isSegmentHovered = hoveredSegment === segment;

                                        return (
                                            <div
                                                key={step.id}
                                                onClick={() => setActiveStep(step.id)}
                                                onMouseEnter={() => setActiveStep(step.id)}
                                                className="glass-panel"
                                                style={{
                                                    position: 'relative',
                                                    zIndex: 1,
                                                    padding: '1.5rem',
                                                    minHeight: '220px',
                                                    border: step.isGate
                                                        ? (isFocused ? '2px solid var(--color-alert-red)' : '2px solid rgba(228, 0, 40, 0.5)')
                                                        : (isFocused ? '1px solid #fff' : '1px solid var(--color-grid)'),
                                                    background: step.isGate
                                                        ? 'rgba(20, 0, 5, 0.8)'
                                                        : (isFocused || isSegmentHovered ? 'var(--glass-surface-hover)' : 'var(--glass-surface)'),
                                                    transform: isFocused ? 'translateY(-10px)' : 'translateY(0)',
                                                    transition: 'all 0.3s var(--ease-snap)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    boxShadow: isFocused
                                                        ? (step.isGate ? '0 10px 30px rgba(228, 0, 40, 0.2)' : '0 10px 30px rgba(0,0,0,0.5)')
                                                        : 'none',
                                                    opacity: (hoveredSegment && hoveredSegment !== segment) ? 0.5 : 1
                                                }}
                                            >
                                                {/* Step Number */}
                                                <div className="text-mono" style={{
                                                    marginBottom: '1rem',
                                                    color: step.isGate ? 'var(--color-alert-red)' : '#666',
                                                    fontSize: '0.8rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <span>0{step.stepNumber}</span>
                                                    {step.isGate && <span style={{ fontSize: '1.2rem' }}>🛡️</span>}
                                                </div>

                                                {/* Title */}
                                                <h3 style={{
                                                    fontSize: '1.1rem',
                                                    marginBottom: '1rem',
                                                    color: isFocused ? '#fff' : '#aaa',
                                                    lineHeight: 1.3
                                                }}>
                                                    {step.title}
                                                </h3>

                                                {/* Description (Reveal on Focus) */}
                                                <p className="text-muted" style={{
                                                    fontSize: '0.9rem',
                                                    lineHeight: 1.5,
                                                    opacity: isFocused ? 1 : 0.7,
                                                    margin: 0
                                                }}>
                                                    {step.description}
                                                </p>

                                                {/* Connector Arrow */}
                                                {i < CONFIG.steps.length - 1 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        right: '-1rem',
                                                        top: '30px',
                                                        color: 'var(--color-grid)',
                                                        transform: 'translateX(50%)',
                                                        zIndex: 0
                                                    }}>
                                                        →
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: IMPACT ========== */}
                <section className="brand-section" id="pf-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">IMPACT</span>

                            <div style={{
                                marginTop: '4rem',
                                padding: '4rem',
                                border: '1px solid var(--color-alert-red)',
                                background: 'rgba(228, 0, 40, 0.05)',
                                boxShadow: '0 0 40px rgba(228, 0, 40, 0.15)'
                            }}>
                                <p className="text-white" style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    margin: 0,
                                    fontFamily: 'var(--font-head)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.2
                                }}>
                                    {CONFIG.closing.text}
                                </p>
                            </div>

                            <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
                {CONFIG.slideNavTitles.map((title, i) => (
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
        </>
    );
};

export default ProductFlow;
