import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import TECHNICAL_APPENDIX_SYSTEM_LOGIC_CONFIG from '../../lib/technicalAppendixSystemLogicConfig';

const CONFIG = TECHNICAL_APPENDIX_SYSTEM_LOGIC_CONFIG;
const SLIDE_TITLES = ['Intro', 'Flow', 'Overview', 'Breakdown'];

const TechnicalAppendixSystemLogic: React.FC = () => {
    usePageTitle('Technical Appendix - System Logic');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    // Interactive States
    const [expandedStepId, setExpandedStepId] = useState<string | null>('verification'); // Default focus Step 4
    const [activeTab, setActiveTab] = useState<'detection' | 'verification' | 'routing'>('verification');
    const [activeBreakdownStep, setActiveBreakdownStep] = useState<string>(CONFIG.flowBreakdown.steps[0].id);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Treat tablets as mobile for this view
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            mediaQuery.removeEventListener('change', handler);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Mobile Auto-Cycle Loop
    useEffect(() => {
        if (!isMobile) return;

        const phases: ('detection' | 'verification' | 'routing')[] = ['detection', 'verification', 'routing'];
        let currentIndex = phases.indexOf(activeTab);

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % phases.length;
            setActiveTab(phases[currentIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobile]);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;

            setShowPrev(scrollLeft > 10);
            setShowNext(scrollLeft < maxScroll - 10);

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
            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 1: INTRO ========== */}
                <section className="brand-section" id="slide-01-intro">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-mono" style={{ marginBottom: '1.5rem', display: 'block', color: '#888' }}>TECHNICAL APPENDIX</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                                {CONFIG.intro.title}
                            </h1>
                            <div className="glass-panel" style={{
                                display: 'inline-block',
                                padding: '1.5rem 2.5rem',
                                borderLeft: '4px solid var(--color-alert-red)',
                                textAlign: 'left',
                                maxWidth: '800px'
                            }}>
                                <p className="text-white" style={{ fontSize: '1.5rem', margin: 0, fontWeight: 300, fontFamily: 'var(--font-mono)' }}>
                                    {CONFIG.intro.neutralLine}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: PRODUCT FLOW DIAGRAM ========== */}
                <section className="brand-section" id="slide-02-flow">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1300px', margin: '0 auto', width: '100%', padding: '0 2rem' }}>
                        <div className="animate-fade-in-up">
                            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                                <span className="label">ARCHITECTURE MAP</span>
                                <h2 className="text-large" style={{ marginBottom: '1rem' }}>Product Flow</h2>
                                <p className="text-muted">{CONFIG.productFlow.closingLine}</p>
                            </div>

                            {/* Layer Tabs (Illustrative) */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
                                {[
                                    { id: 'detection', label: '1-2 DETECTION' },
                                    { id: 'verification', label: '3-4 VERIFICATION' },
                                    { id: 'routing', label: '5 ROUTING' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            border: activeTab === tab.id ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
                                            color: activeTab === tab.id ? '#fff' : '#666',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* 5-Step Flow Diagram */}
                            <div className="flow-diagram-container" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                gap: '1rem',
                                alignItems: 'stretch'
                            }}>
                                {CONFIG.productFlow.steps.map((step, i) => {
                                    const isExpanded = isMobile || expandedStepId === step.id; // Always expanded on mobile
                                    const isGate = step.isGate;

                                    return (
                                        <div
                                            key={step.id}
                                            className="flow-step glass-panel"
                                            onClick={() => !isMobile && setExpandedStepId(step.id)} // Disable click on mobile
                                            onMouseEnter={() => !isMobile && setExpandedStepId(step.id)}
                                            style={{
                                                padding: '1.5rem',
                                                border: isGate ? '2px solid var(--color-alert-red)' : isExpanded ? '1px solid #fff' : '1px solid var(--color-grid)',
                                                transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                                                opacity: activeTab === 'detection' && i < 2 ? 1 :
                                                    activeTab === 'verification' && (i === 2 || i === 3) ? 1 :
                                                        activeTab === 'routing' && i === 4 ? 1 : 0.4,
                                                transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                cursor: isMobile ? 'default' : 'pointer', // No pointer cursor on mobile
                                                position: 'relative',
                                                minHeight: '480px'
                                            }}
                                        >
                                            <div style={{
                                                fontSize: '3rem',
                                                fontWeight: 700,
                                                color: isGate ? 'var(--color-alert-red)' : 'rgba(255,255,255,0.1)',
                                                fontFamily: 'var(--font-mono)',
                                                marginBottom: '1rem',
                                                lineHeight: 1
                                            }}>
                                                {step.stepNumber}
                                            </div>
                                            <h3 style={{
                                                fontSize: '1rem',
                                                color: '#fff',
                                                marginBottom: '0.5rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                {step.title}
                                            </h3>
                                            <div style={{
                                                height: isExpanded ? 'auto' : '0',
                                                overflow: 'hidden',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Connector Arrow */}
                                            {i < 4 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '-1rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    color: 'var(--color-grid)',
                                                    zIndex: 1
                                                }}>→</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: SYSTEM OVERVIEW (APPENDIX) ========== */}
                <section className="brand-section" id="slide-03-overview">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">SYSTEM CONTEXT</span>
                            <h2 className="text-large" style={{ marginBottom: '2rem' }}>System Overview</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 300px', gap: isMobile ? '2rem' : '3rem' }}>
                                <div>
                                    <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '2rem', marginBottom: '2rem' }}>
                                        <h3 className="text-white" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Purpose</h3>
                                        <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                                            {CONFIG.systemOverview.purpose}
                                        </p>
                                    </div>

                                    <h3 className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>CORE PRINCIPLES</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                                        {CONFIG.systemOverview.principles.map((p, i) => (
                                            <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                <span className="text-red">›</span>
                                                <span style={{ color: '#fff' }}>{p}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="glass-panel" style={{ padding: '1.5rem', height: '100%', borderTop: '4px solid var(--color-alert-red)' }}>
                                        <h3 className="text-mono text-red" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>PROCESSING LOGIC</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {CONFIG.systemOverview.overview.map((para, i) => (
                                                <p key={i} className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                                    {para}
                                                </p>
                                            ))}
                                            <div style={{ borderTop: '1px solid var(--color-grid)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                                                <p style={{ color: '#fff', fontSize: '0.95rem', fontStyle: 'italic' }}>
                                                    "{CONFIG.systemOverview.summary}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: TECHNICAL BREAKDOWN ========== */}
                <section className="brand-section" id="slide-04-breakdown">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="animate-fade-in-up" style={{ height: isMobile ? 'auto' : '80vh', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexShrink: 0, marginBottom: '2rem' }}>
                                <span className="label">DEEP DIVE</span>
                                <h2 className="text-large">Technical Breakdown</h2>
                            </div>

                            <div className="breakdown-console" style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                                gap: '2rem',
                                flexGrow: 1,
                                height: isMobile ? 'auto' : '100%',
                                overflow: isMobile ? 'visible' : 'hidden'
                            }}>
                                {/* Rail */}
                                <div className="step-rail" style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'row' : 'column',
                                    gap: isMobile ? '1rem' : '0.5rem',
                                    overflowY: isMobile ? 'hidden' : 'auto',
                                    overflowX: isMobile ? 'auto' : 'hidden',
                                    paddingRight: isMobile ? '0' : '1rem',
                                    paddingBottom: isMobile ? '1rem' : '0',
                                    scrollSnapType: isMobile ? 'x mandatory' : 'none',
                                    WebkitOverflowScrolling: 'touch'
                                }}>
                                    {CONFIG.flowBreakdown.steps.map((step) => (
                                        <button
                                            key={step.id}
                                            onClick={() => setActiveBreakdownStep(step.id)}
                                            style={{
                                                padding: '1.5rem 1rem',
                                                background: activeBreakdownStep === step.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                                border: activeBreakdownStep === step.id ? '1px solid var(--color-alert-red)' : '1px solid transparent',
                                                borderLeft: activeBreakdownStep === step.id ? '4px solid var(--color-alert-red)' : '4px solid transparent',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                minWidth: isMobile ? '260px' : 'auto', // Wider touch target
                                                scrollSnapAlign: 'start' // Snap to start
                                            }}
                                        >
                                            <div className="text-mono" style={{ color: activeBreakdownStep === step.id ? 'var(--color-alert-red)' : '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                STEP {step.stepNumber}
                                            </div>
                                            <div style={{ color: activeBreakdownStep === step.id ? '#fff' : '#888', fontWeight: 500 }}>
                                                {step.title}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Content Console */}
                                <div className="glass-panel" style={{
                                    padding: isMobile ? '1rem' : '3rem',
                                    overflowY: isMobile ? 'visible' : 'auto',
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem',
                                    height: 'auto'
                                }}>
                                    {CONFIG.flowBreakdown.steps.map(step => {
                                        if (step.id !== activeBreakdownStep) return null;
                                        return (
                                            <div key={step.id} className="animate-fade-in">
                                                <h3 className="text-huge" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{step.title}</h3>
                                                <p className="text-white" style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
                                                    {step.subtitle}
                                                </p>

                                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '3rem' }}>
                                                    <div>
                                                        <h4 className="text-mono text-grid" style={{ marginBottom: '1rem' }}>WHAT HAPPENS INITIALLY</h4>
                                                        <p className="text-muted" style={{ marginBottom: '2rem' }}>{step.technicalPurpose}</p>

                                                        <h4 className="text-mono text-grid" style={{ marginBottom: '1rem' }}>TECHNICAL DETAILS</h4>
                                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                                            {step.technicalDetails.map((detail, i) => (
                                                                <li key={i} style={{ marginBottom: '1rem', display: 'flex', gap: isMobile ? '0.5rem' : '0.75rem', color: '#ccc' }}>
                                                                    <span className="text-red">›</span>
                                                                    {detail}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <div style={{
                                                            padding: isMobile ? '1rem' : '2rem',
                                                            border: '1px dashed var(--color-grid)',
                                                            background: 'rgba(255,255,255,0.02)'
                                                        }}>
                                                            <h4 className="text-mono text-red" style={{ marginBottom: '1rem' }}>DESIGN PRINCIPLE</h4>
                                                            <p className="text-white" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
                                                                "{step.designPrinciple}"
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/decks" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                    ← BACK TO DECK HUB
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Navigation Indicators */}
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

            <style>{`
                .flow-step:hover {
                    border-color: #fff !important;
                }
                
                @media (max-width: 1024px) {
                    .flow-diagram-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .breakdown-console {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto 1fr;
                    }
                    .step-rail {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 1rem;
                        padding-right: 0;
                    }
                    .step-rail button {
                        min-width: 200px;
                    }
                }
            `}</style>
        </>
    );
};

export default TechnicalAppendixSystemLogic;
