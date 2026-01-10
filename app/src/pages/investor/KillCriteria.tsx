import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { KILL_CRITERIA_CONFIG } from '../../lib/killCriteriaConfig';

const CONFIG = KILL_CRITERIA_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const KillCriteria: React.FC = () => {
    usePageTitle('Kill Criteria');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [selectedCriterion, setSelectedCriterion] = useState<string | null>(CONFIG.criteria[0].id);
    const [triggerLevel, setTriggerLevel] = useState<0 | 1 | 2>(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

    // Get selected criterion data
    const getSelectedCriterion = () => {
        return CONFIG.criteria.find(c => c.id === selectedCriterion) || CONFIG.criteria[0];
    };

    // Page-local styles
    const styles = {
        criterionItem: (isSelected: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: isSelected ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
            border: isSelected ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            marginBottom: '0.5rem'
        }),
        statusIndicator: (isSelected: boolean) => ({
            width: '12px',
            height: '12px',
            border: '1px solid',
            borderColor: isSelected ? 'var(--color-alert-red)' : '#666',
            background: isSelected ? 'var(--color-alert-red)' : 'transparent',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
        }),
        dossierPanel: {
            background: 'rgba(26, 26, 26, 0.8)',
            border: '1px solid var(--color-grid)',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
        },
        triggerButton: (isActive: boolean, isTriggered: boolean) => ({
            padding: '0.75rem 1.5rem',
            background: isActive ? (isTriggered ? 'var(--color-alert-red)' : 'rgba(255,255,255,0.1)') : 'transparent',
            border: '1px solid',
            borderColor: isTriggered && isActive ? 'var(--color-alert-red)' : 'var(--color-grid)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.2s'
        }),
        triggerPanel: (isTriggered: boolean) => ({
            padding: '2rem',
            background: isTriggered ? 'rgba(228, 0, 40, 0.05)' : 'rgba(255,255,255,0.02)',
            border: isTriggered ? '2px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
            boxShadow: isTriggered ? '0 0 30px rgba(228, 0, 40, 0.2), inset 0 0 20px rgba(228, 0, 40, 0.05)' : 'none',
            transition: prefersReducedMotion ? 'none' : 'all 0.3s'
        }),
        timeWindowBadge: {
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            background: 'rgba(228, 0, 40, 0.15)',
            border: '1px solid var(--color-alert-red)',
            color: 'var(--color-alert-red)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 500
        }
    };

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: prefersReducedMotion ? 'none' : 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: THESIS ========== */}
                <section className="brand-section" id="kc-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
                                {CONFIG.thesis.headline}
                            </h1>
                            <p className="text-red" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 500, marginBottom: '2.5rem', fontStyle: 'italic' }}>
                                {CONFIG.thesis.subheadline}
                            </p>
                            {CONFIG.thesis.content.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className={i === 0 ? 'text-white' : 'text-muted'}
                                    style={{
                                        fontSize: '1.15rem',
                                        maxWidth: '800px',
                                        marginBottom: '1.25rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: CRITERIA CONSOLE ========== */}
                <section className="brand-section" id="kc-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">CRITERIA CONSOLE</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '2rem' }}>
                                Five Defined Kill Criteria
                            </h2>

                            <div className="kc-console-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(280px, 1fr) minmax(300px, 1.5fr)',
                                gap: '2rem',
                                alignItems: 'start'
                            }}>
                                {/* Criteria List */}
                                <div>
                                    {CONFIG.criteria.map((criterion, i) => (
                                        <div
                                            key={criterion.id}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Select ${criterion.title}`}
                                            aria-pressed={selectedCriterion === criterion.id}
                                            onClick={() => setSelectedCriterion(criterion.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setSelectedCriterion(criterion.id);
                                                }
                                            }}
                                            style={styles.criterionItem(selectedCriterion === criterion.id)}
                                        >
                                            <div style={styles.statusIndicator(selectedCriterion === criterion.id)} />
                                            <div style={{ flex: 1 }}>
                                                <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666' }}>0{i + 1}</span>
                                                <p style={{ color: selectedCriterion === criterion.id ? '#fff' : '#aaa', fontSize: '0.95rem', margin: 0 }}>
                                                    {criterion.title}
                                                </p>
                                            </div>
                                            {criterion.timeWindowBadge && (
                                                <div style={styles.timeWindowBadge}>
                                                    {criterion.timeWindowBadge}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Dossier Panel */}
                                <div style={styles.dossierPanel}>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span className="text-mono text-red" style={{ fontSize: '0.8rem' }}>SELECTED CRITERION</span>
                                        <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: '#fff' }}>
                                            {getSelectedCriterion().title}
                                        </h3>
                                        {getSelectedCriterion().timeWindowBadge && (
                                            <div style={{ ...styles.timeWindowBadge, marginTop: '0.75rem' }}>
                                                {getSelectedCriterion().timeWindowBadge}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <span className="text-mono" style={{ fontSize: '0.75rem', color: '#666' }}>CONDITION</span>
                                        <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                                            {getSelectedCriterion().condition}
                                        </p>
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <span className="text-mono" style={{ fontSize: '0.75rem', color: '#666' }}>RATIONALE</span>
                                        <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                                            {getSelectedCriterion().rationale}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-mono" style={{ fontSize: '0.75rem', color: '#666' }}>ACTION</span>
                                        <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                                            {getSelectedCriterion().actionSummary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDES 2-6: INDIVIDUAL CRITERIA ========== */}
                {CONFIG.criteria.map((criterion, index) => (
                    <section className="brand-section" id={`kc-slide-0${index + 2}`} key={criterion.id}>
                        <div className="grid-bg-overlay" />
                        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                            <div className="animate-fade-in-up">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <span className="label" style={{ margin: 0 }}>KILL CRITERION {index + 1}</span>
                                    {criterion.timeWindowBadge && (
                                        <div style={styles.timeWindowBadge}>
                                            {criterion.timeWindowBadge}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '2rem' }}>
                                    {criterion.title}
                                </h2>

                                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                                    <span className="text-mono text-red" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.75rem' }}>CONDITION</span>
                                    <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                                        {criterion.condition}
                                    </p>
                                </div>

                                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                                    <span className="text-mono" style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: '0.75rem' }}>RATIONALE</span>
                                    <p style={{ color: '#ccc', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                                        {criterion.rationale}
                                    </p>
                                </div>

                                <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                    <span className="text-mono" style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: '0.75rem' }}>ACTION</span>
                                    {criterion.action.length > 0 && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>We would reassess:</p>
                                            {criterion.action.map((item, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <span className="text-red">›</span>
                                                    <span style={{ color: '#fff' }}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <p style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                        {criterion.actionSummary}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* ========== SLIDE 7: CAPITAL DISCIPLINE TRIGGER ========== */}
                <section className="brand-section" id="kc-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.trigger.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '2rem' }}>
                                {CONFIG.trigger.headline}
                            </h2>

                            {/* Trigger Simulator */}
                            <div style={{ marginBottom: '2rem' }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.75rem' }}>
                                    TRIGGER SIMULATOR
                                </span>
                                <div
                                    role="group"
                                    aria-label="Select number of criteria met"
                                    style={{ display: 'inline-flex', border: '1px solid var(--color-grid)' }}
                                >
                                    {[0, 1, 2].map((level) => (
                                        <button
                                            key={level}
                                            role="radio"
                                            aria-checked={triggerLevel === level}
                                            onClick={() => setTriggerLevel(level as 0 | 1 | 2)}
                                            style={styles.triggerButton(triggerLevel === level, level === 2)}
                                        >
                                            {level === 0 ? '0 Criteria' : level === 1 ? '1 Criterion' : '2+ Criteria'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trigger Panel */}
                            <div style={styles.triggerPanel(triggerLevel === 2)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {triggerLevel === 2 && (
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '2px solid var(--color-alert-red)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--color-alert-red)',
                                            fontSize: '1.25rem'
                                        }}>
                                            🔒
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-mono" style={{
                                            fontSize: '0.8rem',
                                            color: triggerLevel === 2 ? 'var(--color-alert-red)' : '#666'
                                        }}>
                                            {triggerLevel === 2 ? 'TRIGGERED - CAPITAL DISCIPLINE ACTIVE' : 'STATUS: NOMINAL'}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                                    We will:
                                </p>

                                {CONFIG.trigger.actions.map((action, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginBottom: '0.75rem',
                                            padding: '0.75rem 1rem',
                                            background: triggerLevel === 2 ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
                                            border: '1px solid',
                                            borderColor: triggerLevel === 2 ? 'var(--color-alert-red)' : 'var(--color-grid)',
                                            transition: prefersReducedMotion ? 'none' : 'all 0.2s'
                                        }}
                                    >
                                        <span className="text-red" style={{ fontWeight: 600 }}>{i + 1}.</span>
                                        <span style={{ color: '#fff' }}>{action}</span>
                                    </div>
                                ))}

                                <p style={{
                                    color: triggerLevel === 2 ? '#fff' : '#888',
                                    fontSize: '1rem',
                                    marginTop: '1.5rem',
                                    fontStyle: 'italic'
                                }}>
                                    {CONFIG.trigger.closing}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 8: INVESTOR SUMMARY ========== */}
                <section className="brand-section" id="kc-slide-08">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">{CONFIG.investorSummary.eyebrow}</span>

                            {/* Main Summary Callout */}
                            <div className="kc-summary-callout" style={{
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
                                    "{CONFIG.investorSummary.summary}"
                                </p>
                            </div>

                            {/* Final Note */}
                            <div className="glass-panel" style={{
                                padding: '2rem',
                                marginTop: '2rem',
                                textAlign: 'left',
                                borderLeft: '4px solid var(--color-alert-red)'
                            }}>
                                <span className="text-mono" style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: '1rem' }}>
                                    FINAL NOTE
                                </span>
                                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                                    {CONFIG.investorSummary.finalNote}
                                </p>
                            </div>

                            {/* CTA Buttons */}
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
                        {i === activeIndex && (
                            <span className="text-mono text-red animate-fade-in-up" style={{ position: 'absolute', bottom: '20px', fontSize: '0.6rem', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                                {title}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Page-local CSS for responsive grid and animations */}
            <style>{`
                .kc-summary-callout {
                    animation: summaryGlow 3s ease-in-out infinite;
                }

                @keyframes summaryGlow {
                    0%, 100% { box-shadow: 0 0 40px rgba(228, 0, 40, 0.15); }
                    50% { box-shadow: 0 0 60px rgba(228, 0, 40, 0.25); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .kc-summary-callout {
                        animation: none;
                    }
                }

                @media (max-width: 768px) {
                    .kc-console-grid {
                        grid-template-columns: 1fr !important;
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

export default KillCriteria;
