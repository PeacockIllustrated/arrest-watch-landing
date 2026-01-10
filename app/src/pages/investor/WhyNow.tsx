import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import RadarNode from '../../components/investor/ui/RadarNode';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { WHY_NOW_CONFIG } from '../../lib/whyNowConfig';

const SLIDE_TITLES = WHY_NOW_CONFIG.slideNavTitles;

const WhyNow: React.FC = () => {
    usePageTitle('Why Now');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [defendableState, setDefendableState] = useState<'then' | 'now'>('now');
    const [costView, setCostView] = useState<'coverage' | 'confidence'>('confidence');
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

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 1: SYSTEMIC RISK ========== */}
                <section className="brand-section" id="wn-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.2 }}>
                        <RadarNode size="600px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{WHY_NOW_CONFIG.systemicRisk.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                {WHY_NOW_CONFIG.systemicRisk.headline}
                            </h1>
                            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '800px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                                {WHY_NOW_CONFIG.systemicRisk.content}
                            </p>

                            {/* Signal Chips */}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                                {WHY_NOW_CONFIG.systemicRisk.signalChips.map((chip, i) => (
                                    <span
                                        key={i}
                                        className="signal-chip"
                                        title={chip.tooltip}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`${chip.label}: ${chip.tooltip}`}
                                    >
                                        {chip.label}
                                    </span>
                                ))}
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>ARREST DATA NOW INFLUENCES:</div>
                                <div className="influences-grid">
                                    {WHY_NOW_CONFIG.systemicRisk.influences.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                                            <span className="text-red">›</span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white" style={{ marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: 500 }}>
                                    {WHY_NOW_CONFIG.systemicRisk.callout}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Propagation visual - subtle node animation */}
                    {!prefersReducedMotion && (
                        <div style={{ position: 'absolute', bottom: '15%', right: '5%', opacity: 0.15 }}>
                            <div className="propagation-nodes">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="prop-node"
                                        style={{
                                            animationDelay: `${i * 0.3}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <style>{`
                        .signal-chip {
                            background: rgba(228, 0, 40, 0.15);
                            border: 1px solid rgba(228, 0, 40, 0.3);
                            padding: 0.5rem 1rem;
                            border-radius: 4px;
                            cursor: help;
                            transition: all 0.2s;
                            font-family: var(--font-mono);
                            font-size: 0.85rem;
                            color: #fff;
                            position: relative;
                        }
                        .signal-chip:hover, .signal-chip:focus {
                            background: rgba(228, 0, 40, 0.3);
                            box-shadow: 0 0 15px rgba(228, 0, 40, 0.3);
                            outline: none;
                        }
                        .signal-chip:hover::after, .signal-chip:focus::after {
                            content: attr(title);
                            position: absolute;
                            bottom: 120%;
                            left: 50%;
                            transform: translateX(-50%);
                            background: #000;
                            border: 1px solid var(--color-grid);
                            padding: 0.6rem 0.8rem;
                            font-size: 0.75rem;
                            white-space: nowrap;
                            z-index: 10;
                            pointer-events: none;
                            max-width: 250px;
                            white-space: normal;
                            text-align: center;
                        }
                        .propagation-nodes {
                            display: flex;
                            gap: 20px;
                        }
                        .prop-node {
                            width: 12px;
                            height: 12px;
                            background: var(--color-alert-red);
                            border-radius: 50%;
                            animation: nodePulse 2s ease-in-out infinite;
                        }
                        @keyframes nodePulse {
                            0%, 100% { opacity: 0.2; transform: scale(1); }
                            50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 20px var(--color-alert-red); }
                        }
                    `}</style>
                </section>

                {/* ========== SLIDE 2: AUDITABILITY SHIFT ========== */}
                <section className="brand-section" id="wn-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{WHY_NOW_CONFIG.auditability.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
                                {WHY_NOW_CONFIG.auditability.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '700px' }}>
                                {WHY_NOW_CONFIG.auditability.content}
                            </p>

                            {/* Toggle Switch */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div
                                    className="toggle-container"
                                    role="tablist"
                                    aria-label="Defendability comparison"
                                    style={{
                                        display: 'inline-flex',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--color-grid)',
                                        padding: '4px'
                                    }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={defendableState === 'then'}
                                        onClick={() => setDefendableState('then')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: defendableState === 'then' ? 'rgba(228, 0, 40, 0.2)' : 'transparent',
                                            border: 'none',
                                            color: defendableState === 'then' ? '#fff' : '#888',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        DEFENDABLE THEN
                                    </button>
                                    <button
                                        role="tab"
                                        aria-selected={defendableState === 'now'}
                                        onClick={() => setDefendableState('now')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: defendableState === 'now' ? 'var(--color-alert-red)' : 'transparent',
                                            border: 'none',
                                            color: '#fff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        DEFENDABLE NOW
                                    </button>
                                </div>
                            </div>

                            {/* Content Panel */}
                            <div
                                className="glass-panel"
                                style={{
                                    padding: '2rem',
                                    maxWidth: '800px',
                                    border: defendableState === 'now' ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                    transition: 'border-color 0.3s'
                                }}
                            >
                                <h3 className="text-mono" style={{ color: defendableState === 'now' ? 'var(--color-alert-red)' : '#888', marginBottom: '1.5rem', fontSize: '1rem' }}>
                                    {defendableState === 'then' ? WHY_NOW_CONFIG.auditability.then.title : WHY_NOW_CONFIG.auditability.now.title}
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {(defendableState === 'then' ? WHY_NOW_CONFIG.auditability.then.bullets : WHY_NOW_CONFIG.auditability.now.bullets).map((bullet, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                marginBottom: '1rem',
                                                fontSize: '1.1rem',
                                                color: '#fff',
                                                opacity: 0,
                                                animation: 'fadeSlideIn 0.3s forwards',
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        >
                                            <span className="text-red" style={{ marginTop: '0.2rem' }}>›</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes fadeSlideIn {
                            from { opacity: 0; transform: translateX(-10px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                    `}</style>
                </section>

                {/* ========== SLIDE 3: FALSE POSITIVES / COST INVERSION ========== */}
                <section className="brand-section" id="wn-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{WHY_NOW_CONFIG.falsePositives.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                {WHY_NOW_CONFIG.falsePositives.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '700px' }}>
                                {WHY_NOW_CONFIG.falsePositives.content}
                            </p>

                            {/* Coverage vs Confidence Tabs */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div
                                    role="tablist"
                                    aria-label="Cost comparison"
                                    style={{
                                        display: 'inline-flex',
                                        gap: '0'
                                    }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={costView === 'coverage'}
                                        onClick={() => setCostView('coverage')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            borderRight: 'none',
                                            color: costView === 'coverage' ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            borderBottom: costView === 'coverage' ? '2px solid var(--color-alert-red)' : '2px solid transparent'
                                        }}
                                    >
                                        COVERAGE (THEN)
                                    </button>
                                    <button
                                        role="tab"
                                        aria-selected={costView === 'confidence'}
                                        onClick={() => setCostView('confidence')}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: costView === 'confidence' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            color: costView === 'confidence' ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            borderBottom: costView === 'confidence' ? '2px solid var(--color-alert-red)' : '2px solid transparent'
                                        }}
                                    >
                                        SIGNAL CONFIDENCE (NOW)
                                    </button>
                                </div>
                            </div>

                            <div className="cost-comparison-grid">
                                {/* Coverage Panel */}
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: costView === 'coverage' ? 1 : 0.4,
                                        transform: costView === 'coverage' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: costView === 'coverage' ? '1px solid #888' : '1px solid var(--color-grid)'
                                    }}
                                >
                                    <h3 className="text-mono text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>OPTIMIZED FOR COVERAGE</h3>
                                    {WHY_NOW_CONFIG.falsePositives.coverageBullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#ccc' }}>
                                            <span style={{ color: '#666' }}>•</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Confidence Panel */}
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem',
                                        opacity: costView === 'confidence' ? 1 : 0.4,
                                        transform: costView === 'confidence' ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s',
                                        border: costView === 'confidence' ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                        boxShadow: costView === 'confidence' ? '0 0 20px rgba(228, 0, 40, 0.15)' : 'none'
                                    }}
                                >
                                    <h3 className="text-mono text-red" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>DOMINANT COST TODAY</h3>
                                    {WHY_NOW_CONFIG.falsePositives.confidenceBullets.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', color: '#fff' }}>
                                            <span className="text-red">›</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', maxWidth: '900px', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {WHY_NOW_CONFIG.falsePositives.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: FRAGMENTATION ========== */}
                <section className="brand-section" id="wn-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{WHY_NOW_CONFIG.fragmentation.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
                                {WHY_NOW_CONFIG.fragmentation.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
                                {WHY_NOW_CONFIG.fragmentation.content}
                            </p>

                            {/* Jurisdiction Grid Visual */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                                <div>
                                    {WHY_NOW_CONFIG.fragmentation.fragmentationFactors.map((factor, i) => (
                                        <div
                                            key={i}
                                            className="fragmentation-item"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                borderBottom: i < WHY_NOW_CONFIG.fragmentation.fragmentationFactors.length - 1 ? '1px dashed var(--color-grid)' : 'none',
                                                animation: prefersReducedMotion ? 'none' : `fadeSlideIn 0.4s forwards`,
                                                animationDelay: `${i * 0.1}s`,
                                                opacity: prefersReducedMotion ? 1 : 0
                                            }}
                                        >
                                            <span className="text-red" style={{ fontSize: '1.2rem' }}>›</span>
                                            <span className="text-white" style={{ fontSize: '1.1rem' }}>{factor}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Abstract Jurisdiction Grid */}
                                <div className="jurisdiction-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '6px', maxWidth: '350px' }}>
                                    {[...Array(24)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="jurisdiction-cell"
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--color-grid)',
                                                animation: prefersReducedMotion ? 'none' : `jurisdictionPulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                                                animationDelay: `${Math.random() * 2}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2.5rem', padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {WHY_NOW_CONFIG.fragmentation.callout}
                                </p>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes jurisdictionPulse {
                            0%, 100% { background: rgba(255,255,255,0.05); border-color: var(--color-grid); }
                            50% { background: rgba(228, 0, 40, 0.15); border-color: rgba(228, 0, 40, 0.4); }
                        }
                    `}</style>
                </section>

                {/* ========== SLIDE 5: ENTERPRISE READY ========== */}
                <section className="brand-section" id="wn-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{WHY_NOW_CONFIG.enterpriseReady.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
                                {WHY_NOW_CONFIG.enterpriseReady.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                                {WHY_NOW_CONFIG.enterpriseReady.content}
                            </p>

                            {/* Pipeline Diagram */}
                            <div className="pipeline-diagram-container">
                                {/* Sources */}
                                <div className="pipeline-node" style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '120px',
                                        height: '80px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--color-grid)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>SOURCES</span>
                                    </div>
                                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>Jurisdictions</span>
                                </div>

                                {/* Arrow */}
                                <div className="pipeline-arrow">→</div>

                                {/* ArrestDelta */}
                                <div className="pipeline-node" style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '140px',
                                        height: '80px',
                                        background: 'rgba(228, 0, 40, 0.1)',
                                        border: '2px solid var(--color-alert-red)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.5rem',
                                        boxShadow: '0 0 20px rgba(228, 0, 40, 0.2)'
                                    }}>
                                        <span className="text-mono text-red" style={{ fontSize: '0.75rem' }}>VERIFIED EVENTS</span>
                                    </div>
                                    <span className="text-red" style={{ fontSize: '0.7rem' }}>ArrestDelta</span>
                                </div>

                                {/* Arrow */}
                                <div className="pipeline-arrow">→</div>

                                {/* Enterprise */}
                                <div className="pipeline-node" style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '120px',
                                        height: '80px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--color-grid)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>WEBHOOKS</span>
                                    </div>
                                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>Enterprise Systems</span>
                                </div>
                            </div>

                            {/* Capabilities Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                {WHY_NOW_CONFIG.enterpriseReady.capabilities.map((cap, i) => (
                                    <div key={i} className="glass-panel" style={{
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <span className="text-red">✓</span>
                                        <span className="text-white">{cap}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {WHY_NOW_CONFIG.enterpriseReady.callout}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: AI STAKES ========== */}
                <section className="brand-section" id="wn-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{WHY_NOW_CONFIG.aiStakes.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
                                {WHY_NOW_CONFIG.aiStakes.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                                {WHY_NOW_CONFIG.aiStakes.content}
                            </p>

                            <div className="ai-stakes-grid">
                                {/* Escalations */}
                                <div>
                                    {WHY_NOW_CONFIG.aiStakes.escalations.map((esc, i) => (
                                        <div
                                            key={i}
                                            className="glass-panel"
                                            style={{
                                                padding: '1.5rem',
                                                marginBottom: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                borderLeft: '3px solid var(--color-alert-red)'
                                            }}
                                        >
                                            <span className="text-red text-mono" style={{ fontSize: '1.5rem', opacity: 0.5 }}>0{i + 1}</span>
                                            <span className="text-white" style={{ fontSize: '1.15rem' }}>{esc}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Blast Radius Visual */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="blast-radius" style={{ position: 'relative', width: '250px', height: '250px' }}>
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: `${60 + i * 50}px`,
                                                    height: `${60 + i * 50}px`,
                                                    border: `1px solid ${i === 0 ? 'var(--color-alert-red)' : 'rgba(228, 0, 40, ' + (0.5 - i * 0.12) + ')'}`,
                                                    borderRadius: '50%',
                                                    animation: prefersReducedMotion ? 'none' : `blastExpand 3s ease-out infinite`,
                                                    animationDelay: `${i * 0.5}s`
                                                }}
                                            />
                                        ))}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '20px',
                                            height: '20px',
                                            background: 'var(--color-alert-red)',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 30px var(--color-alert-red)'
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, calc(-50% + 140px))',
                                            textAlign: 'center'
                                        }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>ONE ERROR → THOUSANDS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '2.5rem', padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <p className="text-white" style={{ fontSize: '1.1rem', margin: 0 }}>
                                    {WHY_NOW_CONFIG.aiStakes.callout}
                                </p>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes blastExpand {
                            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                        }

                        /* RESPONSIVE LAYOUTS */
                        .influences-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                            gap: 0.75rem;
                        }

                        .cost-comparison-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 2rem;
                            max-width: 900px;
                        }

                        .pipeline-diagram-container {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0;
                            margin-bottom: 3rem;
                            flex-wrap: wrap;
                        }
                        
                        .pipeline-arrow {
                            padding: 0 1rem;
                            color: var(--color-grid);
                            transition: transform 0.3s;
                        }

                        .ai-stakes-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 4rem;
                            align-items: center;
                        }

                        /* MOBILE OVERRIDES */
                        @media (max-width: 768px) {
                            .influences-grid {
                                grid-template-columns: 1fr;
                            }

                            .cost-comparison-grid {
                                grid-template-columns: 1fr;
                                gap: 1.5rem;
                            }

                            .pipeline-diagram-container {
                                flex-direction: column;
                                gap: 1rem;
                            }

                            .pipeline-arrow {
                                transform: rotate(90deg);
                                margin: 0.5rem 0;
                            }

                            .ai-stakes-grid {
                                grid-template-columns: 1fr;
                                gap: 3rem;
                            }
                            
                            /* Adjust blast radius container on mobile so it doesn't overflow */
                            .blast-radius {
                                transform: scale(0.8);
                            }
                        }
                    `}</style>
                </section>

                {/* ========== SLIDE 7: WHY NOW EXISTS ========== */}
                <section className="brand-section" id="wn-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.15 }}>
                        <RadarNode size="800px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">{WHY_NOW_CONFIG.whyNowExists.eyebrow}</span>
                            <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2rem' }}>
                                {WHY_NOW_CONFIG.whyNowExists.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.3rem', marginBottom: '2.5rem' }}>
                                {WHY_NOW_CONFIG.whyNowExists.content}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem', textAlign: 'left' }}>
                                {WHY_NOW_CONFIG.whyNowExists.reasons.map((reason, i) => (
                                    <div
                                        key={i}
                                        className="glass-panel animate-fade-in-up"
                                        style={{
                                            padding: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    >
                                        <span className="text-red text-mono" style={{ fontSize: '1.5rem', lineHeight: 1 }}>›</span>
                                        <span className="text-white" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>{reason}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel" style={{
                                padding: '2rem 3rem',
                                background: 'rgba(228, 0, 40, 0.08)',
                                border: '1px solid var(--color-alert-red)',
                                maxWidth: '700px',
                                margin: '0 auto'
                            }}>
                                <p className="text-white" style={{ fontSize: '1.4rem', margin: 0, fontWeight: 500 }}>
                                    {WHY_NOW_CONFIG.whyNowExists.closing}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 8: INVESTOR SUMMARY ========== */}
                <section className="brand-section" id="wn-slide-08">
                    <div className="grid-bg-overlay" />

                    {/* Large radar background */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08 }}>
                        <RadarNode size="1200px" type="radar" />
                    </div>

                    {/* Floating data particles */}
                    {!prefersReducedMotion && (
                        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="summary-particle"
                                    style={{
                                        position: 'absolute',
                                        left: `${10 + (i * 12) % 80}%`,
                                        bottom: '-20px',
                                        width: '4px',
                                        height: '4px',
                                        background: 'var(--color-alert-red)',
                                        borderRadius: '50%',
                                        opacity: 0.3,
                                        animation: `floatUpSummary ${8 + Math.random() * 4}s linear infinite`,
                                        animationDelay: `${i * 0.8}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Eyebrow with animated underline */}
                        <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
                            <span className="label text-red" style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.2em',
                                display: 'inline-block',
                                position: 'relative'
                            }}>
                                {WHY_NOW_CONFIG.investorSummary.eyebrow}
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60px',
                                    height: '2px',
                                    background: 'var(--color-alert-red)',
                                    boxShadow: '0 0 10px var(--color-alert-red)'
                                }} />
                            </span>
                        </div>

                        {/* Main summary box with enhanced styling */}
                        <div className="animate-fade-in-up" style={{
                            position: 'relative',
                            marginTop: '2rem',
                            padding: '3.5rem 4rem',
                            background: 'linear-gradient(135deg, rgba(228, 0, 40, 0.12), rgba(0,0,0,0.6))',
                            border: '2px solid var(--color-alert-red)',
                            boxShadow: '0 0 80px rgba(228, 0, 40, 0.25), inset 0 0 60px rgba(228, 0, 40, 0.08)',
                            animationDelay: '0.2s'
                        }}>
                            {/* Inner corner accents */}
                            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)' }} />

                            {/* Quotation mark decoration */}
                            <span style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1.5rem',
                                fontSize: '4rem',
                                fontFamily: 'Georgia, serif',
                                color: 'var(--color-alert-red)',
                                opacity: 0.3,
                                lineHeight: 1
                            }}>"</span>

                            <p className="text-white" style={{
                                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                                lineHeight: 1.5,
                                margin: 0,
                                fontWeight: 400,
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {WHY_NOW_CONFIG.investorSummary.summary}
                            </p>

                            {/* Closing quotation mark */}
                            <span style={{
                                position: 'absolute',
                                bottom: '0.5rem',
                                right: '1.5rem',
                                fontSize: '4rem',
                                fontFamily: 'Georgia, serif',
                                color: 'var(--color-alert-red)',
                                opacity: 0.3,
                                lineHeight: 1
                            }}>"</span>
                        </div>

                        {/* CTA buttons */}
                        <div className="animate-fade-in-up" style={{
                            marginTop: '1rem',
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            animationDelay: '0.4s',
                            flexWrap: 'wrap'
                        }}>
                            <Link to="/investor-delta" className="btn btn-secondary">
                                ← Back to Investor Deck
                            </Link>
                            <Link to="/decks" className="btn btn-secondary">
                                Data Room
                            </Link>
                        </div>

                        {/* System status indicator */}
                        <div className="animate-fade-in-up" style={{
                            marginTop: '3rem',
                            animationDelay: '0.5s',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: 'var(--color-alert-red)',
                                borderRadius: '50%',
                                animation: prefersReducedMotion ? 'none' : 'pulse 2s ease-in-out infinite',
                                boxShadow: '0 0 10px var(--color-alert-red)'
                            }} />
                            <span className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                                ARRESTDELTA // WHY NOW // END
                            </span>
                        </div>
                    </div>

                    <style>{`
                        @keyframes floatUpSummary {
                            0% { transform: translateY(0); opacity: 0; }
                            10% { opacity: 0.3; }
                            90% { opacity: 0.3; }
                            100% { transform: translateY(-100vh); opacity: 0; }
                        }
                        @keyframes pulse {
                            0%, 100% { opacity: 1; transform: scale(1); }
                            50% { opacity: 0.5; transform: scale(0.8); }
                        }
                    `}</style>
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
        </>
    );
};

export default WhyNow;
