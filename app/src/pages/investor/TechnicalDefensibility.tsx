import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { TECHNICAL_DEFENSIBILITY_CONFIG } from '../../lib/technicalDefensibilityConfig';

const CONFIG = TECHNICAL_DEFENSIBILITY_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const TechnicalDefensibility: React.FC = () => {
    usePageTitle('Technical Defensibility');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [detectionView, setDetectionView] = useState<'rows' | 'transitions'>('transitions');
    const [noiseView, setNoiseView] = useState<'coverage' | 'confidence'>('confidence');
    const [hoveredJurisdiction, setHoveredJurisdiction] = useState<number | null>(null);
    const [hoveredGate, setHoveredGate] = useState<string | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            mediaQuery.removeEventListener('change', handler);
            window.removeEventListener('resize', checkMobile);
        };
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

    // Jurisdiction grid labels (from canonical: varianceFactors)
    const jurisdictionLabels = CONFIG.countyVariance.varianceFactors;

    // Verification gate stages
    const verificationGates = [
        { id: 'detect', label: 'DETECT', criteria: ['Source reliability patterns', 'Timing consistency'] },
        { id: 'evaluate', label: 'EVALUATE', criteria: ['Structural vs cosmetic updates', 'Known correction behaviors'] },
        { id: 'verify', label: 'VERIFY', criteria: ['Jurisdiction-specific quirks', 'Temporal plausibility'] },
        { id: 'surface', label: 'SURFACE', criteria: ['Material changes only', 'Decision suitability'] }
    ];

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: THESIS ========== */}
                <section className="brand-section" id="td-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.0, marginBottom: '2.5rem' }}>
                                {CONFIG.thesis.headline}
                            </h1>
                            {CONFIG.thesis.content.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className={i === 1 ? 'text-white' : 'text-muted'}
                                    style={{
                                        fontSize: '1.25rem',
                                        maxWidth: '900px',
                                        marginBottom: '1.5rem',
                                        lineHeight: 1.6,
                                        ...(i === 1 && { fontWeight: 500 })
                                    }}
                                >
                                    {i === 1 ? (
                                        <>
                                            It is defensible because it operates in a problem space where{' '}
                                            <span className="text-red" style={{ fontWeight: 600 }}>real-world complexity compounds faster than competitors can copy</span>.
                                        </>
                                    ) : i === 2 ? (
                                        <>
                                            Our advantage is built on{' '}
                                            <span style={{ color: '#fff' }}>operational learning, verification logic, and accumulated edge cases</span>, not surface-level data access.
                                        </>
                                    ) : paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: COUNTY-LEVEL VARIANCE ========== */}
                <section className="brand-section" id="td-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.countyVariance.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.countyVariance.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '700px' }}>
                                {CONFIG.countyVariance.content}
                            </p>

                            {/* Jurisdiction Variance Console */}
                            <div className="td-variance-grid">
                                {/* Abstract Grid */}
                                <div className="jurisdiction-console" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(6, 1fr)',
                                    gridTemplateRows: 'repeat(4, 1fr)',
                                    gap: isMobile ? '4px' : '8px',
                                    maxWidth: '400px',
                                    marginBottom: '2rem'
                                }}>
                                    {[...Array(24)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="jurisdiction-tile"
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`Jurisdiction tile showing: ${jurisdictionLabels[i % jurisdictionLabels.length]}`}
                                            onMouseEnter={() => setHoveredJurisdiction(i)}
                                            onMouseLeave={() => setHoveredJurisdiction(null)}
                                            onFocus={() => setHoveredJurisdiction(i)}
                                            onBlur={() => setHoveredJurisdiction(null)}
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1',
                                                background: hoveredJurisdiction === i ? 'rgba(228, 0, 40, 0.2)' : 'rgba(255,255,255,0.05)',
                                                border: hoveredJurisdiction === i ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                                transition: 'all 0.15s',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            }}
                                        >
                                            {hoveredJurisdiction === i && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '120%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    background: '#000',
                                                    border: '1px solid var(--color-alert-red)',
                                                    padding: '0.5rem 0.75rem',
                                                    whiteSpace: 'nowrap',
                                                    zIndex: 10,
                                                    fontSize: '0.75rem',
                                                    fontFamily: 'var(--font-mono)',
                                                    color: '#fff'
                                                }}>
                                                    {jurisdictionLabels[i % jurisdictionLabels.length]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Variance Factors List */}
                                <div>
                                    {CONFIG.countyVariance.varianceFactors.map((factor, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem 0',
                                                borderBottom: i < CONFIG.countyVariance.varianceFactors.length - 1 ? '1px dashed var(--color-grid)' : 'none'
                                            }}
                                        >
                                            <span className="text-red">›</span>
                                            <span className="text-white" style={{ fontSize: '1.05rem' }}>{factor}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '700px' }}>
                                {CONFIG.countyVariance.conclusion}
                            </p>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)', maxWidth: '800px' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {CONFIG.countyVariance.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: CHANGE DETECTION ========== */}
                <section className="brand-section" id="td-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.changeDetection.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.changeDetection.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '700px' }}>
                                {CONFIG.changeDetection.content}
                            </p>

                            {/* Stateful Entity Timeline Toggle */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div
                                    role="tablist"
                                    aria-label="Detection approach comparison"
                                    style={{
                                        display: 'inline-flex',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--color-grid)',
                                        padding: '4px'
                                    }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={detectionView === 'rows'}
                                        onClick={() => setDetectionView('rows')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: detectionView === 'rows' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            border: 'none',
                                            color: detectionView === 'rows' ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        ROWS
                                    </button>
                                    <button
                                        role="tab"
                                        aria-selected={detectionView === 'transitions'}
                                        onClick={() => setDetectionView('transitions')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: detectionView === 'transitions' ? 'var(--color-alert-red)' : 'transparent',
                                            border: 'none',
                                            color: '#fff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        TRANSITIONS
                                    </button>
                                </div>
                            </div>

                            {/* Content Panels */}
                            <div className="td-detection-grid">
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: detectionView === 'rows' ? 1 : 0.4,
                                        transform: detectionView === 'rows' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: detectionView === 'rows' ? '1px solid #888' : '1px solid var(--color-grid)'
                                    }}
                                >
                                    <h3 className="text-mono text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>{CONFIG.changeDetection.scrapingApproach.title}</h3>
                                    {CONFIG.changeDetection.scrapingApproach.bullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#888' }}>
                                            <span style={{ color: '#555' }}>•</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: detectionView === 'transitions' ? 1 : 0.4,
                                        transform: detectionView === 'transitions' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: detectionView === 'transitions' ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                        boxShadow: detectionView === 'transitions' ? '0 0 20px rgba(228, 0, 40, 0.15)' : 'none'
                                    }}
                                >
                                    <h3 className="text-mono text-red" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>{CONFIG.changeDetection.statefulApproach.title}</h3>
                                    {CONFIG.changeDetection.statefulApproach.bullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#fff' }}>
                                            <span className="text-red">›</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', maxWidth: '800px', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {CONFIG.changeDetection.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: VERIFICATION LOGIC ========== */}
                <section className="brand-section" id="td-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.verificationLogic.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.verificationLogic.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '700px' }}>
                                {CONFIG.verificationLogic.content}
                            </p>

                            {/* Verification Gate Pipeline */}
                            <div className="td-pipeline-container">
                                {verificationGates.map((gate, i) => (
                                    <React.Fragment key={gate.id}>
                                        <div
                                            className="td-pipeline-gate"
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`${gate.label} gate: ${gate.criteria.join(', ')}`}
                                            onMouseEnter={() => setHoveredGate(gate.id)}
                                            onMouseLeave={() => setHoveredGate(null)}
                                            onFocus={() => setHoveredGate(gate.id)}
                                            onBlur={() => setHoveredGate(null)}
                                            style={{
                                                position: 'relative',
                                                padding: '1.25rem 1.5rem',
                                                background: hoveredGate === gate.id ? 'rgba(228, 0, 40, 0.15)' : 'rgba(255,255,255,0.05)',
                                                border: hoveredGate === gate.id ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                minWidth: '120px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <span className="text-mono" style={{
                                                fontSize: '0.8rem',
                                                color: hoveredGate === gate.id ? 'var(--color-alert-red)' : '#888'
                                            }}>
                                                {gate.label}
                                            </span>

                                            {hoveredGate === gate.id && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '120%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    background: '#000',
                                                    border: '1px solid var(--color-alert-red)',
                                                    padding: '0.75rem 1rem',
                                                    zIndex: 10,
                                                    minWidth: '180px',
                                                    textAlign: 'left'
                                                }}>
                                                    {gate.criteria.map((c, ci) => (
                                                        <div key={ci} style={{
                                                            fontSize: '0.75rem',
                                                            color: '#fff',
                                                            marginBottom: ci < gate.criteria.length - 1 ? '0.5rem' : 0,
                                                            display: 'flex',
                                                            gap: '0.5rem'
                                                        }}>
                                                            <span className="text-red">›</span>
                                                            <span>{c}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {i < verificationGates.length - 1 && (
                                            <div className="td-pipeline-arrow" style={{ color: 'var(--color-grid)', padding: '0 0.5rem' }}>→</div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
                                <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '1rem' }}>This verification logic improves as:</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {CONFIG.verificationLogic.improvementFactors.map((factor, i) => (
                                        <div key={i} className="glass-panel" style={{
                                            padding: '0.75rem 1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span className="text-red">+</span>
                                            <span style={{ fontSize: '0.95rem' }}>{factor}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)', maxWidth: '800px' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {CONFIG.verificationLogic.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: FALSE POSITIVES ========== */}
                <section className="brand-section" id="td-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.falsePositives.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.falsePositives.headline}
                            </h2>

                            {/* Noise Suppression Dial / Toggle */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div
                                    role="tablist"
                                    aria-label="Optimization comparison"
                                    style={{
                                        display: 'inline-flex',
                                        gap: '0'
                                    }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={noiseView === 'coverage'}
                                        onClick={() => setNoiseView('coverage')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            borderRight: 'none',
                                            color: noiseView === 'coverage' ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            borderBottom: noiseView === 'coverage' ? '2px solid #888' : '2px solid transparent'
                                        }}
                                    >
                                        COVERAGE-FIRST
                                    </button>
                                    <button
                                        role="tab"
                                        aria-selected={noiseView === 'confidence'}
                                        onClick={() => setNoiseView('confidence')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: noiseView === 'confidence' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            color: noiseView === 'confidence' ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            borderBottom: noiseView === 'confidence' ? '2px solid var(--color-alert-red)' : '2px solid transparent'
                                        }}
                                    >
                                        CONFIDENCE-FIRST
                                    </button>
                                </div>
                            </div>

                            <div className="td-noise-grid">
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: noiseView === 'coverage' ? 1 : 0.4,
                                        transform: noiseView === 'coverage' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: noiseView === 'coverage' ? '1px solid #888' : '1px solid var(--color-grid)'
                                    }}
                                >
                                    <h3 className="text-mono text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>{CONFIG.falsePositives.competitorOptimization.title}</h3>
                                    {CONFIG.falsePositives.competitorOptimization.bullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#888' }}>
                                            <span style={{ color: '#555' }}>•</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: noiseView === 'confidence' ? 1 : 0.4,
                                        transform: noiseView === 'confidence' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: noiseView === 'confidence' ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                        boxShadow: noiseView === 'confidence' ? '0 0 20px rgba(228, 0, 40, 0.15)' : 'none'
                                    }}
                                >
                                    <h3 className="text-mono text-red" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>{CONFIG.falsePositives.ourOptimization.title}</h3>
                                    {CONFIG.falsePositives.ourOptimization.bullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#fff' }}>
                                            <span className="text-red">›</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                                <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Reducing false positives requires:</p>
                                {CONFIG.falsePositives.requirements.map((req, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <span className="text-red">›</span>
                                        <span style={{ color: i === 0 ? 'var(--color-alert-red)' : '#fff', fontWeight: i === 0 ? 600 : 400 }}>{req}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)', maxWidth: '800px' }}>
                                <p className="text-white" style={{ fontSize: '1.05rem', margin: 0 }}>
                                    {CONFIG.falsePositives.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: INFRASTRUCTURE / FLYWHEEL ========== */}
                <section className="brand-section" id="td-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.infrastructure.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.infrastructure.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '700px' }}>
                                {CONFIG.infrastructure.content}
                            </p>

                            <div className="td-flywheel-container">
                                {/* Expansion Benefits */}
                                <div>
                                    <p className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>AS WE EXPAND:</p>
                                    {CONFIG.infrastructure.expansionBenefits.map((benefit, i) => (
                                        <div key={i} className="glass-panel" style={{
                                            padding: '1rem 1.25rem',
                                            marginBottom: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}>
                                            <span className="text-red">+</span>
                                            <span style={{ color: '#fff' }}>{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Defensibility Flywheel */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="flywheel-visual" style={{
                                        position: 'relative',
                                        width: '280px',
                                        height: '280px'
                                    }}>
                                        {/* Flywheel circle */}
                                        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                                            <circle
                                                cx="100"
                                                cy="100"
                                                r="80"
                                                fill="none"
                                                stroke="var(--color-grid)"
                                                strokeWidth="2"
                                            />
                                            {/* Animated indicator */}
                                            {!prefersReducedMotion && (
                                                <circle
                                                    cx="100"
                                                    cy="20"
                                                    r="6"
                                                    fill="var(--color-alert-red)"
                                                    style={{
                                                        transformOrigin: '100px 100px',
                                                        animation: 'flywheelRotate 8s linear infinite'
                                                    }}
                                                />
                                            )}
                                        </svg>
                                        {/* Labels around flywheel */}
                                        {['Coverage', 'Learning', 'Accuracy', 'Trust', 'Expansion'].map((label, i) => {
                                            const angle = (i * 72 - 90) * (Math.PI / 180);
                                            const radius = 110;
                                            const x = 140 + radius * Math.cos(angle);
                                            const y = 140 + radius * Math.sin(angle);
                                            return (
                                                <div key={label} style={{
                                                    position: 'absolute',
                                                    left: `${x}px`,
                                                    top: `${y}px`,
                                                    transform: 'translate(-50%, -50%)',
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.7rem',
                                                    color: i === 0 ? 'var(--color-alert-red)' : '#888',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {label}
                                                </div>
                                            );
                                        })}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            textAlign: 'center'
                                        }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.65rem' }}>DEFENSIBILITY</span><br />
                                            <span className="text-mono text-red" style={{ fontSize: '0.75rem' }}>FLYWHEEL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2.5rem', padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.15rem', margin: 0, fontWeight: 500 }}>
                                    {CONFIG.infrastructure.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: HARD TO COPY ========== */}
                <section className="brand-section" id="td-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.hardToCopy.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.hardToCopy.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2rem' }}>
                                A competitor would need to:
                            </p>

                            {/* Copy Difficulty Checklist */}
                            <div className="td-checklist" style={{ marginBottom: '2rem' }}>
                                {CONFIG.hardToCopy.competitorNeeds.map((item, i) => (
                                    <div
                                        key={i}
                                        className="checklist-item glass-panel"
                                        style={{
                                            padding: '1.25rem 1.5rem',
                                            marginBottom: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            borderLeft: '3px solid var(--color-alert-red)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div className="checklist-indicator text-mono" data-index={i + 1} style={{
                                            width: '24px',
                                            height: '24px',
                                            border: '1px solid var(--color-alert-red)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.8rem',
                                            color: '#fff',
                                            position: 'relative'
                                        }}>
                                        </div>
                                        <span style={{ color: '#fff', fontSize: '1.05rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {CONFIG.hardToCopy.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: RESTRAINT ========== */}
                <section className="brand-section" id="td-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.restraint.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {CONFIG.restraint.headline}
                            </h2>

                            <div className="td-restraint-container">
                                {/* Deliberate choices */}
                                <div>
                                    <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>We deliberately:</p>
                                    {CONFIG.restraint.deliberateChoices.map((choice, i) => (
                                        <div key={i} className="glass-panel" style={{
                                            padding: '1.25rem 1.5rem',
                                            marginBottom: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            borderLeft: '3px solid var(--color-alert-red)'
                                        }}>
                                            <span className="text-red">›</span>
                                            <span style={{ color: '#fff', fontSize: '1.05rem' }}>{choice}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Throttle Visual */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="throttle-visual" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem',
                                        padding: '2rem',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--color-grid)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>EXPANSION SPEED</span>
                                            <div style={{
                                                width: '100px',
                                                height: '8px',
                                                background: 'var(--color-grid)',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    width: '30%',
                                                    height: '100%',
                                                    background: '#666'
                                                }} />
                                            </div>
                                            <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666' }}>LOW</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>CONFIDENCE</span>
                                            <div style={{
                                                width: '100px',
                                                height: '8px',
                                                background: 'var(--color-grid)',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    width: '85%',
                                                    height: '100%',
                                                    background: 'var(--color-alert-red)',
                                                    boxShadow: '0 0 10px rgba(228, 0, 40, 0.5)'
                                                }} />
                                            </div>
                                            <span className="text-mono text-red" style={{ fontSize: '0.7rem' }}>HIGH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                    {CONFIG.restraint.callout}
                                </p>
                                <p className="text-muted" style={{ fontSize: '1rem', margin: 0 }}>
                                    {CONFIG.restraint.closing}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 8: INVESTOR SUMMARY ========== */}
                <section className="brand-section" id="td-slide-08">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">{CONFIG.investorSummary.eyebrow}</span>
                            <div className="td-summary-callout" style={{
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
                                    {CONFIG.investorSummary.summary}
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
                onPrev={() => scrollByAmount(-window.innerWidth)}
                onNext={() => scrollByAmount(window.innerWidth)}
                showPrev={showPrev}
                showNext={showNext}
            />

            {/* Page-local styles */}
            <style>{`
                @keyframes flywheelRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .td-variance-grid {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 3rem;
                    align-items: start;
                    margin-bottom: 2rem;
                }

                .td-detection-grid,
                .td-noise-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    max-width: 900px;
                }

                .td-pipeline-container {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    gap: 0;
                    margin-bottom: 2rem;
                }

                .td-flywheel-container,
                .td-restraint-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .td-summary-callout {
                    animation: summaryGlow 3s ease-in-out infinite;
                }

                @keyframes summaryGlow {
                    0%, 100% { box-shadow: 0 0 40px rgba(228, 0, 40, 0.15); }
                    50% { box-shadow: 0 0 60px rgba(228, 0, 40, 0.25); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .td-summary-callout {
                        animation: none;
                    }
                }

                @media (max-width: 768px) {
                    .td-variance-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .td-detection-grid,
                    .td-noise-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }

                    .td-pipeline-container {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .td-pipeline-arrow {
                        transform: rotate(90deg);
                        text-align: center;
                        padding: 0.5rem 0 !important;
                    }

                    .td-flywheel-container,
                    .td-restraint-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .flywheel-visual {
                        transform: scale(0.85);
                    }

                    .jurisdiction-console {
                        max-width: 100% !important;
                    }
                }

                /* Checklist Interaction */
                .checklist-item:hover {
                    background: rgba(228, 0, 40, 0.05);
                    transform: translateX(5px);
                }
                
                .checklist-indicator::before {
                    content: attr(data-index);
                }
                
                .checklist-item:hover .checklist-indicator::before {
                    content: "✓";
                    color: var(--color-alert-red);
                }
            `}</style>
        </>
    );
};

export default TechnicalDefensibility;
