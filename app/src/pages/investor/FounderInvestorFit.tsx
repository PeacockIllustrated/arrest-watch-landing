import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import MarkAsReadButton from '../../components/deckhub/MarkAsReadButton';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { FOUNDER_INVESTOR_FIT_CONFIG } from '../../lib/founderInvestorFitConfig';

const CONFIG = FOUNDER_INVESTOR_FIT_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const FounderInvestorFit: React.FC = () => {
    usePageTitle('Founder-Investor Fit');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [activeGrowthStage, setActiveGrowthStage] = useState<string | null>(null);
    const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [closingVisible, setClosingVisible] = useState(false);

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

            // Trigger closing animation when on last slide
            if (index === SLIDE_TITLES.length - 1) {
                setClosingVisible(true);
            }
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

    const toggleTerm = (termId: string) => {
        setExpandedTerms(prev => {
            const next = new Set(prev);
            if (next.has(termId)) {
                next.delete(termId);
            } else {
                next.add(termId);
            }
            return next;
        });
    };

    // Page-local styles
    const styles = {
        alignmentItem: (type: 'aligned' | 'avoid', isHovered: boolean) => ({
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: isHovered
                ? (type === 'aligned' ? 'rgba(46, 160, 67, 0.1)' : 'rgba(228, 0, 40, 0.1)')
                : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isHovered
                ? (type === 'aligned' ? 'rgba(46, 160, 67, 0.5)' : 'var(--color-alert-red)')
                : 'var(--color-grid)',
            cursor: 'default',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            marginBottom: '0.75rem',
            position: 'relative' as const
        }),
        indicator: (type: 'aligned' | 'avoid') => ({
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: type === 'aligned' ? 'rgba(46, 160, 67, 0.8)' : 'var(--color-alert-red)',
            flexShrink: 0,
            marginTop: '0.35rem'
        }),
        tooltip: {
            position: 'absolute' as const,
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(26, 26, 26, 0.95)',
            border: '1px solid var(--color-grid)',
            padding: '0.5rem 0.75rem',
            fontSize: '0.8rem',
            color: '#ccc',
            whiteSpace: 'nowrap' as const,
            zIndex: 10,
            backdropFilter: 'blur(10px)'
        },
        growthStage: (isActive: boolean) => ({
            flex: 1,
            padding: '1rem',
            background: isActive ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isActive ? 'var(--color-alert-red)' : 'var(--color-grid)',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            textAlign: 'center' as const
        }),
        growthConnector: {
            width: '40px',
            height: '2px',
            background: 'var(--color-grid)',
            alignSelf: 'center' as const
        },
        termCard: (isExpanded: boolean) => ({
            background: isExpanded ? 'rgba(228, 0, 40, 0.05)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isExpanded ? 'var(--color-alert-red)' : 'var(--color-grid)',
            padding: '1rem 1.25rem',
            marginBottom: '0.75rem',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
        }),
        signatureCallout: (isVisible: boolean) => ({
            background: 'rgba(26, 26, 26, 0.8)',
            border: '2px solid var(--color-alert-red)',
            padding: '2.5rem',
            position: 'relative' as const,
            boxShadow: isVisible && !prefersReducedMotion
                ? '0 0 40px rgba(228, 0, 40, 0.2), inset 0 0 20px rgba(228, 0, 40, 0.05)'
                : 'none',
            transition: prefersReducedMotion ? 'none' : 'all 0.3s',
            opacity: isVisible ? 1 : 0.8,
            transform: isVisible ? 'scale(1)' : 'scale(0.98)'
        }),
        profileBadge: {
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px dashed var(--color-grid)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#888',
            letterSpacing: '0.05em',
            marginTop: '1.5rem'
        }
    };

    // Get highlighted bullets for growth stage
    const getHighlightedBullets = () => {
        if (!activeGrowthStage) return new Set<number>();
        const stage = CONFIG.growth.stages.find(s => s.id === activeGrowthStage);
        return new Set(stage?.bulletIndices || []);
    };

    const highlightedBullets = getHighlightedBullets();

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: prefersReducedMotion ? 'none' : 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: THESIS ========== */}
                <section className="brand-section" id="fif-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
                                {CONFIG.thesis.headline}
                            </h1>
                            <p className="text-muted" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', marginBottom: '2rem', maxWidth: '800px', lineHeight: 1.6 }}>
                                {CONFIG.thesis.subheadline}
                            </p>
                            <p className="text-white" style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                                {CONFIG.thesis.intro}
                            </p>

                            {/* Key Stance Callout */}
                            <div className="glass-panel" style={{
                                padding: '1.5rem 2rem',
                                borderLeft: '4px solid var(--color-alert-red)',
                                display: 'inline-block'
                            }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
                                    KEY STANCE
                                </span>
                                <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 500, margin: 0, fontStyle: 'italic' }}>
                                    "{CONFIG.thesis.keyStance}"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: WHAT WE'RE LOOKING FOR ========== */}
                <section className="brand-section" id="fif-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.lookingFor.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.lookingFor.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                {CONFIG.lookingFor.intro}
                            </p>

                            <div className="fif-alignment-list">
                                {CONFIG.lookingFor.items.map((item) => (
                                    <div
                                        key={item.id}
                                        style={styles.alignmentItem('aligned', hoveredItem === item.id)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onFocus={() => setHoveredItem(item.id)}
                                        onBlur={() => setHoveredItem(null)}
                                        tabIndex={0}
                                        role="listitem"
                                        aria-label={item.text}
                                    >
                                        <div style={styles.indicator('aligned')} />
                                        <p style={{ color: '#fff', fontSize: '1rem', margin: 0, lineHeight: 1.5 }}>
                                            {item.text}
                                        </p>
                                        {hoveredItem === item.id && item.whyMatters && (
                                            <div style={styles.tooltip}>
                                                {item.whyMatters}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <p className="text-muted" style={{ fontSize: '1rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
                                {CONFIG.lookingFor.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: WHAT WE'RE NOT OPTIMIZED FOR ========== */}
                <section className="brand-section" id="fif-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.notOptimized.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.notOptimized.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                {CONFIG.notOptimized.intro}
                            </p>

                            <div className="fif-alignment-list">
                                {CONFIG.notOptimized.items.map((item) => (
                                    <div
                                        key={item.id}
                                        style={styles.alignmentItem('avoid', hoveredItem === item.id)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onFocus={() => setHoveredItem(item.id)}
                                        onBlur={() => setHoveredItem(null)}
                                        tabIndex={0}
                                        role="listitem"
                                        aria-label={item.text}
                                    >
                                        <div style={styles.indicator('avoid')} />
                                        <p style={{ color: '#ccc', fontSize: '1rem', margin: 0, lineHeight: 1.5 }}>
                                            {item.text}
                                        </p>
                                        {hoveredItem === item.id && item.whyMatters && (
                                            <div style={styles.tooltip}>
                                                {item.whyMatters}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <p className="text-muted" style={{ fontSize: '1rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
                                {CONFIG.notOptimized.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: OUR VIEW ON GROWTH ========== */}
                <section className="brand-section" id="fif-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.growth.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.growth.headline}
                            </h2>

                            {/* Growth Gate Visual */}
                            <div style={{ marginBottom: '2rem' }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.75rem' }}>
                                    EVIDENCE-GROUNDED GROWTH GATE
                                </span>
                                <div
                                    className="fif-growth-gate"
                                    style={{ display: 'flex', gap: '0' }}
                                    role="group"
                                    aria-label="Growth stages"
                                >
                                    {CONFIG.growth.stages.map((stage, i) => (
                                        <React.Fragment key={stage.id}>
                                            <button
                                                style={styles.growthStage(activeGrowthStage === stage.id)}
                                                onClick={() => setActiveGrowthStage(activeGrowthStage === stage.id ? null : stage.id)}
                                                aria-pressed={activeGrowthStage === stage.id}
                                                aria-label={`Select ${stage.label} stage`}
                                            >
                                                <span className="text-mono" style={{
                                                    fontSize: '0.7rem',
                                                    color: activeGrowthStage === stage.id ? 'var(--color-alert-red)' : '#666',
                                                    display: 'block',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    STAGE {i + 1}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.9rem',
                                                    color: activeGrowthStage === stage.id ? '#fff' : '#aaa',
                                                    fontWeight: 500
                                                }}>
                                                    {stage.label}
                                                </span>
                                            </button>
                                            {i < CONFIG.growth.stages.length - 1 && (
                                                <div style={styles.growthConnector}>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'linear-gradient(90deg, var(--color-grid), var(--color-alert-red), var(--color-grid))'
                                                    }} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Growth Bullets */}
                            <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
                                <span className="text-mono" style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '1rem' }}>
                                    WE BELIEVE GROWTH WILL COME FROM
                                </span>
                                {CONFIG.growth.bullets.map((bullet, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginBottom: '0.75rem',
                                            padding: '0.5rem',
                                            background: highlightedBullets.has(i) ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                                            border: highlightedBullets.has(i) ? '1px solid var(--color-alert-red)' : '1px solid transparent',
                                            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
                                        }}
                                    >
                                        <span className="text-red">›</span>
                                        <span style={{ color: highlightedBullets.has(i) ? '#fff' : '#ccc' }}>{bullet}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Conviction Line */}
                            <div style={{
                                marginTop: '2rem',
                                padding: '1.5rem 2rem',
                                borderLeft: '4px solid var(--color-alert-red)',
                                background: 'rgba(228, 0, 40, 0.05)'
                            }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
                                    OUR CONVICTION
                                </span>
                                <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, margin: 0, fontStyle: 'italic' }}>
                                    "{CONFIG.growth.conviction}"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: PARTNERSHIP ========== */}
                <section className="brand-section" id="fif-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.partnership.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.partnership.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                {CONFIG.partnership.intro}
                            </p>

                            {/* Partnership Terms Cards */}
                            <div
                                className="fif-terms-container"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '0.75rem'
                                }}
                            >
                                {CONFIG.partnership.terms.map((term) => (
                                    <div
                                        key={term.id}
                                        style={styles.termCard(expandedTerms.has(term.id))}
                                        onClick={() => toggleTerm(term.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggleTerm(term.id);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-expanded={expandedTerms.has(term.id)}
                                        aria-label={`${term.term}: ${term.detail}`}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span className="text-mono" style={{
                                                fontSize: '0.85rem',
                                                color: expandedTerms.has(term.id) ? 'var(--color-alert-red)' : '#fff',
                                                fontWeight: 600
                                            }}>
                                                {term.term}
                                            </span>
                                            <span style={{
                                                color: '#666',
                                                fontSize: '0.8rem',
                                                transform: expandedTerms.has(term.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: prefersReducedMotion ? 'none' : 'transform 0.15s'
                                            }}>
                                                ▼
                                            </span>
                                        </div>
                                        {expandedTerms.has(term.id) && (
                                            <p style={{
                                                color: '#ccc',
                                                fontSize: '0.95rem',
                                                margin: '0.75rem 0 0 0',
                                                lineHeight: 1.5
                                            }}>
                                                {term.detail}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Reciprocal Commitment */}
                            <div className="glass-panel" style={{
                                padding: '1.5rem 2rem',
                                marginTop: '1.5rem',
                                borderTop: '2px solid var(--color-alert-red)'
                            }}>
                                <span className="text-mono" style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                                    RECIPROCAL COMMITMENT
                                </span>
                                <p style={{ color: '#fff', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
                                    {CONFIG.partnership.reciprocal}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: CLOSING ========== */}
                <section className="brand-section" id="fif-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.closing.eyebrow}</span>

                            {/* Signature Callout */}
                            <div style={styles.signatureCallout(closingVisible)}>
                                {CONFIG.closing.statement.map((line, i) => (
                                    <p
                                        key={i}
                                        style={{
                                            color: i === CONFIG.closing.statement.length - 1 ? '#fff' : '#ccc',
                                            fontSize: i === CONFIG.closing.statement.length - 1
                                                ? 'clamp(1.1rem, 2vw, 1.3rem)'
                                                : 'clamp(1rem, 1.8vw, 1.15rem)',
                                            lineHeight: 1.6,
                                            marginBottom: i === CONFIG.closing.statement.length - 1 ? 0 : '1rem',
                                            fontWeight: i === CONFIG.closing.statement.length - 1 ? 500 : 400
                                        }}
                                    >
                                        {line}
                                    </p>
                                ))}

                                {/* Partnership Profile Badge */}
                                <div style={styles.profileBadge}>
                                    PARTNERSHIP PROFILE: {CONFIG.closing.partnershipProfile}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem', alignItems: 'center' }}>
                                <Link to="/" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                                    Return to Main Site
                                </Link>
                                <MarkAsReadButton deckId="founder-investor-fit" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Navigation */}
            <NavigationArrows
                showPrev={showPrev}
                showNext={showNext}
                onPrev={() => scrollByAmount(-window.innerWidth)}
                onNext={() => scrollByAmount(window.innerWidth)}
            />

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
                                transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: i === activeIndex ? '0 0 10px var(--color-alert-red)' : 'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Page-local CSS for responsive */}
            <style>{`
                @media (max-width: 768px) {
                    .fif-terms-container {
                        grid-template-columns: 1fr !important;
                    }
                    .fif-growth-gate {
                        flex-direction: column !important;
                    }
                    .fif-growth-gate > div:nth-child(even) {
                        width: 2px !important;
                        height: 20px !important;
                        align-self: center !important;
                    }
                    .brand-section {
                        padding: 2rem 1.5rem !important;
                        overflow: visible !important;
                        height: auto !important;
                    }
                }
            `}</style>
        </>
    );
};

export default FounderInvestorFit;
