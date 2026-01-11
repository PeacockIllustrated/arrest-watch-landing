import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { CUSTOMER_ACCESS_TARGETING_CONFIG } from '../../lib/customerAccessTargetingConfig';
import type { Segment } from '../../lib/customerAccessTargetingConfig';

const CONFIG = CUSTOMER_ACCESS_TARGETING_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const CustomerAccessTargeting: React.FC = () => {
    usePageTitle('Customer Access & Targeting');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [segmentViewMode, setSegmentViewMode] = useState<'sales' | 'marketing'>('sales');
    const [hoveredMarketingRow, setHoveredMarketingRow] = useState<number | null>(null);
    const [expandedTrigger, setExpandedTrigger] = useState<number | null>(null);
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
            if (e.key === 'Escape') setSelectedSegment(null);
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

    // Get segment by ID
    const getSegment = (id: string): Segment | undefined => {
        return CONFIG.segments.find(s => s.id === id);
    };

    // Page-local styles
    const styles = {
        glassPanel: {
            background: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem'
        },
        targetCard: (isSelected: boolean, _isPrimary: boolean) => ({
            background: isSelected ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isSelected ? 'var(--color-alert-red)' : 'var(--color-grid)',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            position: 'relative' as const,
            flex: 1
        }),
        statusIndicator: (isActive: boolean, isPrimary: boolean) => ({
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isActive
                ? 'var(--color-alert-red)'
                : (isPrimary ? 'rgba(46, 160, 67, 0.8)' : 'rgba(255,255,255,0.3)'),
            boxShadow: isActive && !prefersReducedMotion ? '0 0 10px var(--color-alert-red)' : 'none'
        }),
        dossierPanel: {
            background: 'rgba(26, 26, 26, 0.95)',
            border: '1px solid var(--color-grid)',
            borderLeft: '4px solid var(--color-alert-red)',
            padding: '2rem',
            maxHeight: isMobile ? 'none' : '70vh',
            overflowY: (isMobile ? 'visible' : 'auto') as 'visible' | 'auto'
        },
        toggleButton: (isActive: boolean) => ({
            background: isActive ? 'rgba(228, 0, 40, 0.2)' : 'transparent',
            border: '1px solid',
            borderColor: isActive ? 'var(--color-alert-red)' : 'var(--color-grid)',
            color: isActive ? '#fff' : '#888',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
        }),
        comparatorRow: (isHovered: boolean) => ({
            display: 'flex',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
            border: '1px solid',
            borderColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            marginBottom: '0.5rem',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            position: 'relative' as const
        }),
        triggerCard: (isExpanded: boolean) => ({
            background: isExpanded ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isExpanded ? 'var(--color-alert-red)' : 'var(--color-grid)',
            padding: '1rem 1.25rem',
            marginBottom: '0.75rem',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            position: 'relative' as const
        }),
        pulseIndicator: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--color-alert-red)',
            animation: prefersReducedMotion ? 'none' : 'pulse 2s infinite'
        },
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
        }
    };

    // Render segment detail slide
    const renderSegmentSlide = (segment: Segment, slideId: string) => (
        <section className="brand-section" id={slideId} key={segment.id}>
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <div className="animate-fade-in-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span className="label" style={{ marginBottom: 0 }}>
                            {segment.isPrimary ? 'PRIMARY WEDGE' : (segment.isOptional ? 'OPTIONAL APPROACH' : 'TARGET SEGMENT')}
                        </span>
                        {segment.isPrimary && (
                            <span style={{
                                background: 'rgba(46, 160, 67, 0.2)',
                                border: '1px solid rgba(46, 160, 67, 0.5)',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(46, 160, 67, 1)'
                            }}>PRIMARY</span>
                        )}
                        {segment.isOptional && (
                            <span style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px dashed var(--color-grid)',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                color: '#888'
                            }}>OPTIONAL</span>
                        )}
                    </div>
                    <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '2rem' }}>
                        {segment.name}
                    </h2>

                    <div className="cat-segment-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem'
                    }}>
                        {/* Why This Segment */}
                        <div style={styles.glassPanel}>
                            <span className="text-mono text-red" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem' }}>
                                WHY THIS SEGMENT
                            </span>
                            {segment.why.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span className="text-red">›</span>
                                    <span style={{ color: '#ccc', fontSize: '0.95rem' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Buyer Roles */}
                        <div style={styles.glassPanel}>
                            <span className="text-mono text-red" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem' }}>
                                BUYER ROLES
                            </span>
                            {segment.buyerRoles.map((role, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span className="text-red">›</span>
                                    <span style={{ color: '#ccc', fontSize: '0.95rem' }}>{role}</span>
                                </div>
                            ))}
                        </div>

                        {/* Access Strategy */}
                        <div style={styles.glassPanel}>
                            <span className="text-mono" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem', color: '#888' }}>
                                ACCESS STRATEGY
                            </span>
                            {segment.accessStrategy.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#666' }}>›</span>
                                    <span style={{ color: '#aaa', fontSize: '0.95rem' }}>{item}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-grid)' }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '0.5rem' }}>
                                    MARKETING SUPPORT
                                </span>
                                {segment.marketingSupport.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                        <span className="text-red" style={{ fontSize: '0.8rem' }}>+</span>
                                        <span style={{ color: '#999', fontSize: '0.85rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Outcome */}
                        <div style={{
                            ...styles.glassPanel,
                            borderLeft: '4px solid var(--color-alert-red)',
                            background: 'rgba(228, 0, 40, 0.05)'
                        }}>
                            <span className="text-mono text-red" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem' }}>
                                EXPECTED OUTCOME
                            </span>
                            {segment.outcome.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span className="text-red">✓</span>
                                    <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                            {segment.permissionNote && (
                                <p style={{
                                    color: '#888',
                                    fontSize: '0.85rem',
                                    fontStyle: 'italic',
                                    marginTop: '1rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px dashed var(--color-grid)'
                                }}>
                                    {segment.permissionNote}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: prefersReducedMotion ? 'none' : 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* ========== SLIDE 0: THESIS ========== */}
                <section className="brand-section" id="cat-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                                {CONFIG.thesis.headline}
                            </h1>
                            <p className="text-muted" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: 1.6 }}>
                                {CONFIG.thesis.intro}
                            </p>

                            {/* Two pillars */}
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                <div style={{ ...styles.glassPanel, flex: 1, minWidth: '280px' }}>
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>PILLAR 1</span>
                                    <p style={{ color: '#fff', fontSize: '1rem' }}>Founder-led and relationship-assisted sales</p>
                                </div>
                                <div style={{ ...styles.glassPanel, flex: 1, minWidth: '280px' }}>
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>PILLAR 2</span>
                                    <p style={{ color: '#fff', fontSize: '1rem' }}>Authority-driven marketing that creates inbound interest, shortens sales cycles, and de-risks buyer decisions</p>
                                </div>
                            </div>

                            {/* Key Framing Callout */}
                            <div style={{
                                padding: '1.5rem 2rem',
                                borderLeft: '4px solid var(--color-alert-red)',
                                background: 'rgba(228, 0, 40, 0.05)',
                                display: 'inline-block',
                                maxWidth: '700px'
                            }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>
                                    KEY FRAMING
                                </span>
                                <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500, margin: 0, fontStyle: 'italic' }}>
                                    "{CONFIG.thesis.keyFraming}"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: TARGET CONSOLE ========== */}
                <section className="brand-section" id="cat-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">PRIMARY CUSTOMER SEGMENTS</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                                First 20 Customers
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                Select a target segment to view access strategy and expected outcomes.
                            </p>

                            <div className="cat-console-layout" style={{ display: 'flex', gap: '2rem' }}>
                                {/* Target Cards */}
                                <div className="cat-target-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '0 0 45%' }}>
                                    {CONFIG.segments.map((segment, i) => (
                                        <button
                                            key={segment.id}
                                            style={styles.targetCard(selectedSegment === segment.id, segment.isPrimary)}
                                            onClick={() => setSelectedSegment(selectedSegment === segment.id ? null : segment.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setSelectedSegment(selectedSegment === segment.id ? null : segment.id);
                                                }
                                            }}
                                            aria-pressed={selectedSegment === segment.id}
                                            aria-label={`Select ${segment.name}`}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={styles.statusIndicator(selectedSegment === segment.id, segment.isPrimary)} />
                                                    <div>
                                                        <span className="text-mono" style={{
                                                            fontSize: '0.65rem',
                                                            color: '#666',
                                                            display: 'block',
                                                            marginBottom: '0.25rem'
                                                        }}>
                                                            TARGET {i + 1} {segment.isPrimary && '• PRIMARY'} {segment.isOptional && '• OPTIONAL'}
                                                        </span>
                                                        <span style={{
                                                            color: selectedSegment === segment.id ? '#fff' : '#ccc',
                                                            fontWeight: 500,
                                                            fontSize: '0.95rem'
                                                        }}>
                                                            {segment.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span style={{
                                                    color: selectedSegment === segment.id ? 'var(--color-alert-red)' : '#444',
                                                    fontSize: '1.2rem'
                                                }}>
                                                    {selectedSegment === segment.id ? '▸' : '▹'}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Dossier Panel */}
                                <div className="cat-dossier" style={{ flex: 1 }}>
                                    {selectedSegment ? (
                                        <div style={styles.dossierPanel}>
                                            {(() => {
                                                const segment = getSegment(selectedSegment);
                                                if (!segment) return null;
                                                return (
                                                    <>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                                            <div>
                                                                <span className="text-mono text-red" style={{ fontSize: '0.7rem' }}>DOSSIER</span>
                                                                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.25rem' }}>{segment.shortName}</h3>
                                                            </div>
                                                            {/* Toggle */}
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button
                                                                    style={styles.toggleButton(segmentViewMode === 'sales')}
                                                                    onClick={() => setSegmentViewMode('sales')}
                                                                >
                                                                    Sales Motion
                                                                </button>
                                                                <button
                                                                    style={styles.toggleButton(segmentViewMode === 'marketing')}
                                                                    onClick={() => setSegmentViewMode('marketing')}
                                                                >
                                                                    Marketing
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Why */}
                                                        <div style={{ marginBottom: '1.25rem' }}>
                                                            <span className="text-mono" style={{ fontSize: '0.65rem', color: '#666' }}>WHY THIS SEGMENT</span>
                                                            {segment.why.map((item, i) => (
                                                                <div key={i} style={{
                                                                    display: 'flex',
                                                                    gap: '0.5rem',
                                                                    marginTop: '0.4rem',
                                                                    opacity: segmentViewMode === 'sales' ? 1 : 0.5,
                                                                    transition: prefersReducedMotion ? 'none' : 'opacity 0.15s'
                                                                }}>
                                                                    <span className="text-red">›</span>
                                                                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Buyer Roles */}
                                                        <div style={{ marginBottom: '1.25rem' }}>
                                                            <span className="text-mono" style={{ fontSize: '0.65rem', color: '#666' }}>BUYER ROLES</span>
                                                            {segment.buyerRoles.map((role, i) => (
                                                                <div key={i} style={{
                                                                    display: 'flex',
                                                                    gap: '0.5rem',
                                                                    marginTop: '0.4rem',
                                                                    opacity: segmentViewMode === 'sales' ? 1 : 0.5,
                                                                    transition: prefersReducedMotion ? 'none' : 'opacity 0.15s'
                                                                }}>
                                                                    <span className="text-red">›</span>
                                                                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{role}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Access Strategy */}
                                                        <div style={{ marginBottom: '1.25rem' }}>
                                                            <span className="text-mono" style={{ fontSize: '0.65rem', color: '#666' }}>ACCESS STRATEGY</span>
                                                            {segment.accessStrategy.map((item, i) => (
                                                                <div key={i} style={{
                                                                    display: 'flex',
                                                                    gap: '0.5rem',
                                                                    marginTop: '0.4rem',
                                                                    opacity: segmentViewMode === 'sales' ? 1 : 0.5,
                                                                    transition: prefersReducedMotion ? 'none' : 'opacity 0.15s'
                                                                }}>
                                                                    <span style={{ color: '#666' }}>›</span>
                                                                    <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Marketing Support */}
                                                        <div style={{
                                                            marginBottom: '1.25rem',
                                                            padding: '1rem',
                                                            background: segmentViewMode === 'marketing' ? 'rgba(228, 0, 40, 0.05)' : 'transparent',
                                                            border: '1px solid',
                                                            borderColor: segmentViewMode === 'marketing' ? 'var(--color-alert-red)' : 'transparent',
                                                            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
                                                        }}>
                                                            <span className="text-mono text-red" style={{ fontSize: '0.65rem' }}>MARKETING SUPPORT</span>
                                                            {segment.marketingSupport.map((item, i) => (
                                                                <div key={i} style={{
                                                                    display: 'flex',
                                                                    gap: '0.5rem',
                                                                    marginTop: '0.4rem',
                                                                    opacity: segmentViewMode === 'marketing' ? 1 : 0.6,
                                                                    transition: prefersReducedMotion ? 'none' : 'opacity 0.15s'
                                                                }}>
                                                                    <span className="text-red">+</span>
                                                                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Outcome */}
                                                        <div style={{
                                                            padding: '1rem',
                                                            background: 'rgba(228, 0, 40, 0.08)',
                                                            borderLeft: '3px solid var(--color-alert-red)'
                                                        }}>
                                                            <span className="text-mono text-red" style={{ fontSize: '0.65rem' }}>EXPECTED OUTCOME</span>
                                                            {segment.outcome.map((item, i) => (
                                                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                                                                    <span className="text-red">✓</span>
                                                                    <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    ) : (
                                        <div style={{
                                            ...styles.glassPanel,
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            minHeight: '300px'
                                        }}>
                                            <span className="text-mono" style={{ color: '#444', fontSize: '0.8rem' }}>SELECT A TARGET</span>
                                            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>Click a segment to view details</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDES 2-4: SEGMENT DETAILS ========== */}
                {renderSegmentSlide(CONFIG.segments[0], 'cat-slide-02')}
                {renderSegmentSlide(CONFIG.segments[1], 'cat-slide-03')}
                {renderSegmentSlide(CONFIG.segments[2], 'cat-slide-04')}

                {/* ========== SLIDE 5: MARKETING'S ROLE ========== */}
                <section className="brand-section" id="cat-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">MARKETING STRATEGY</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                                Marketing's Role in the Access Strategy
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.marketingRole.intro}
                            </p>

                            <div className="cat-comparator" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                                {/* What Marketing Does */}
                                <div>
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(46, 160, 67, 0.1)',
                                        borderBottom: '2px solid rgba(46, 160, 67, 0.5)',
                                        marginBottom: '1rem'
                                    }}>
                                        <span className="text-mono" style={{ fontSize: '0.75rem', color: 'rgba(46, 160, 67, 1)' }}>
                                            WHAT MARKETING DOES
                                        </span>
                                    </div>
                                    {CONFIG.marketingRole.does.map((item, i) => (
                                        <div
                                            key={i}
                                            style={styles.comparatorRow(hoveredMarketingRow === i)}
                                            onMouseEnter={() => setHoveredMarketingRow(i)}
                                            onMouseLeave={() => setHoveredMarketingRow(null)}
                                        >
                                            <span style={{ color: 'rgba(46, 160, 67, 1)' }}>✓</span>
                                            <span style={{ color: '#ccc', fontSize: '0.95rem' }}>{item}</span>
                                            {hoveredMarketingRow === i && (
                                                <div style={styles.tooltip}>
                                                    Supports enterprise sales directly
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* What Marketing Does NOT Do */}
                                <div>
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(228, 0, 40, 0.1)',
                                        borderBottom: '2px solid var(--color-alert-red)',
                                        marginBottom: '1rem'
                                    }}>
                                        <span className="text-mono text-red" style={{ fontSize: '0.75rem' }}>
                                            WHAT MARKETING DOES NOT DO
                                        </span>
                                    </div>
                                    {CONFIG.marketingRole.doesNot.map((item, i) => (
                                        <div
                                            key={i}
                                            style={styles.comparatorRow(hoveredMarketingRow === i + 100)}
                                            onMouseEnter={() => setHoveredMarketingRow(i + 100)}
                                            onMouseLeave={() => setHoveredMarketingRow(null)}
                                        >
                                            <span className="text-red">✗</span>
                                            <span style={{ color: '#888', fontSize: '0.95rem' }}>{item}</span>
                                            {hoveredMarketingRow === i + 100 && (
                                                <div style={styles.tooltip}>
                                                    Not aligned with high-trust enterprise sales
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: CORE MARKETING ASSETS ========== */}
                <section className="brand-section" id="cat-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">YEAR 1 DELIVERABLES</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '2rem' }}>
                                {CONFIG.coreAssets.intro}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Flagship Whitepaper */}
                                <div style={{
                                    ...styles.glassPanel,
                                    borderLeft: '4px solid var(--color-alert-red)',
                                    background: 'rgba(228, 0, 40, 0.05)'
                                }}>
                                    <span className="text-mono text-red" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>
                                        {CONFIG.coreAssets.whitepaper.label.toUpperCase()}
                                    </span>
                                    <p style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 500, fontStyle: 'italic' }}>
                                        {CONFIG.coreAssets.whitepaper.title}
                                    </p>
                                </div>

                                {/* Executive Briefs */}
                                <div style={styles.glassPanel}>
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.75rem' }}>
                                        EXECUTIVE BRIEFS FOR
                                    </span>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {CONFIG.coreAssets.briefs.map((brief, i) => (
                                            <span key={i} style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--color-grid)',
                                                color: '#ccc',
                                                fontSize: '0.9rem'
                                            }}>
                                                {brief}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Thought Leadership */}
                                <div style={styles.glassPanel}>
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                                        THOUGHT LEADERSHIP
                                    </span>
                                    <p style={{ color: '#ccc', fontSize: '1rem' }}>
                                        {CONFIG.coreAssets.thoughtLeadership}
                                    </p>
                                </div>

                                {/* Events */}
                                <div style={styles.glassPanel}>
                                    <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                                        EVENT PARTICIPATION
                                    </span>
                                    <p style={{ color: '#ccc', fontSize: '1rem' }}>
                                        {CONFIG.coreAssets.events}
                                    </p>
                                </div>
                            </div>

                            {/* Closing */}
                            <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
                                {CONFIG.coreAssets.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: BUYING TRIGGERS ========== */}
                <section className="brand-section" id="cat-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label text-red">BUYING TRIGGERS</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                                How Marketing & Sales Intersect
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.triggers.intro}
                            </p>

                            <div className="cat-triggers" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {CONFIG.triggers.items.map((trigger, i) => (
                                    <div
                                        key={i}
                                        style={styles.triggerCard(expandedTrigger === i)}
                                        onClick={() => setExpandedTrigger(expandedTrigger === i ? null : i)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setExpandedTrigger(expandedTrigger === i ? null : i);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-expanded={expandedTrigger === i}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={styles.pulseIndicator} />
                                            <span style={{ color: expandedTrigger === i ? '#fff' : '#ccc', fontSize: '1rem' }}>
                                                {trigger}
                                            </span>
                                        </div>
                                        {expandedTrigger === i && (
                                            <p style={{
                                                color: '#888',
                                                fontSize: '0.9rem',
                                                fontStyle: 'italic',
                                                marginTop: '0.75rem',
                                                paddingTop: '0.75rem',
                                                borderTop: '1px dashed var(--color-grid)',
                                                marginLeft: '1.75rem'
                                            }}>
                                                {CONFIG.triggers.closing}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Closing callout */}
                            <div style={{
                                marginTop: '2rem',
                                padding: '1.25rem 1.5rem',
                                borderLeft: '4px solid var(--color-alert-red)',
                                background: 'rgba(228, 0, 40, 0.05)'
                            }}>
                                <p style={{ color: '#fff', fontSize: '1.05rem', margin: 0, fontWeight: 500 }}>
                                    {CONFIG.triggers.closing}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 8: WHY THIS SCALES + INVESTOR SUMMARY ========== */}
                <section className="brand-section" id="cat-slide-08">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">SCALABILITY</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '2rem' }}>
                                Why This Scales
                            </h2>

                            <div style={styles.glassPanel}>
                                {CONFIG.whyScales.map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        gap: '0.75rem',
                                        marginBottom: i < CONFIG.whyScales.length - 1 ? '1rem' : 0,
                                        paddingBottom: i < CONFIG.whyScales.length - 1 ? '1rem' : 0,
                                        borderBottom: i < CONFIG.whyScales.length - 1 ? '1px solid var(--color-grid)' : 'none'
                                    }}>
                                        <span className="text-red" style={{ fontSize: '1.2rem' }}>›</span>
                                        <span style={{ color: '#fff', fontSize: '1.05rem', lineHeight: 1.5 }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Investor Summary */}
                            <div style={{
                                marginTop: '3rem',
                                padding: '2rem 2.5rem',
                                background: 'rgba(26, 26, 26, 0.8)',
                                border: '2px solid var(--color-alert-red)',
                                boxShadow: prefersReducedMotion ? 'none' : '0 0 40px rgba(228, 0, 40, 0.15)'
                            }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>
                                    INVESTOR SUMMARY
                                </span>
                                <p style={{
                                    color: '#fff',
                                    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                                    lineHeight: 1.6,
                                    fontStyle: 'italic',
                                    margin: 0
                                }}>
                                    {CONFIG.investorSummary}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                                <Link to="/decks" className="btn">
                                    ← Back to Data Room
                                </Link>
                                <Link to="/" className="btn btn-secondary">
                                    Main Site
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
                    </div>
                ))}
            </div>

            {/* Page-local CSS */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(228, 0, 40, 0.4); }
                    50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(228, 0, 40, 0); }
                }
                @media (max-width: 900px) {
                    .cat-console-layout {
                        flex-direction: column !important;
                    }
                    .cat-target-cards {
                        flex: 1 !important;
                    }
                    .cat-comparator {
                        grid-template-columns: 1fr !important;
                    }
                    .cat-segment-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 768px) {
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

export default CustomerAccessTargeting;
