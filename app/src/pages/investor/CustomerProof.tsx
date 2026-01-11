import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import MarkAsReadButton from '../../components/deckhub/MarkAsReadButton';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { CUSTOMER_PROOF_CONFIG } from '../../lib/customerProofConfig';

const CONFIG = CUSTOMER_PROOF_CONFIG;
const SLIDE_TITLES = CONFIG.slideNavTitles;

const CustomerProof: React.FC = () => {
    usePageTitle('Customer Proof');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Interaction states
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [hoveredRequirement, setHoveredRequirement] = useState<string | null>(null);
    const [selectedEngagement, setSelectedEngagement] = useState<string | null>(null);
    const [activeArtifactTab, setActiveArtifactTab] = useState(CONFIG.demonstrableArtifacts.artifacts[0].id);
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

    // Quote carousel navigation
    const nextQuote = () => {
        setCurrentQuoteIndex((prev) => (prev + 1) % CONFIG.enterpriseQuotes.quotes.length);
    };
    const prevQuote = () => {
        setCurrentQuoteIndex((prev) => (prev - 1 + CONFIG.enterpriseQuotes.quotes.length) % CONFIG.enterpriseQuotes.quotes.length);
    };

    // Get current artifact
    const getActiveArtifact = () => {
        return CONFIG.demonstrableArtifacts.artifacts.find(a => a.id === activeArtifactTab) || CONFIG.demonstrableArtifacts.artifacts[0];
    };

    // Page-local styles
    const styles = {
        transcriptLine: (isActive: boolean) => ({
            padding: '2rem',
            background: isActive ? 'rgba(228, 0, 40, 0.08)' : 'rgba(255,255,255,0.02)',
            border: isActive ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
            boxShadow: isActive ? '0 0 30px rgba(228, 0, 40, 0.15)' : 'none',
            transition: prefersReducedMotion ? 'none' : 'all 0.2s'
        }),
        sourceTag: {
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            background: 'rgba(228, 0, 40, 0.15)',
            border: '1px solid var(--color-alert-red)',
            color: 'var(--color-alert-red)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            marginTop: '1rem'
        },
        requirementRow: (isHovered: boolean) => ({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            padding: '1.25rem 1.5rem',
            background: isHovered ? 'rgba(228, 0, 40, 0.08)' : 'rgba(255,255,255,0.02)',
            border: isHovered ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
            marginBottom: '0.75rem',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            cursor: 'pointer'
        }),
        ladderRung: (isSelected: boolean) => ({
            padding: '1rem 1.5rem',
            background: isSelected ? 'rgba(228, 0, 40, 0.1)' : 'rgba(255,255,255,0.02)',
            border: isSelected ? '1px solid var(--color-alert-red)' : '1px solid var(--color-grid)',
            borderLeft: isSelected ? '4px solid var(--color-alert-red)' : '4px solid var(--color-grid)',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
        }),
        artifactTab: (isActive: boolean) => ({
            padding: '0.75rem 1rem',
            background: isActive ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
            border: 'none',
            borderBottom: isActive ? '2px solid var(--color-alert-red)' : '2px solid transparent',
            color: isActive ? '#fff' : '#666',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: prefersReducedMotion ? 'none' : 'all 0.15s',
            textTransform: 'uppercase' as const
        }),
        milestoneItem: (isNext: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 1.5rem',
            background: isNext ? 'rgba(228, 0, 40, 0.08)' : 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: isNext ? 'var(--color-alert-red)' : 'var(--color-grid)',
            marginBottom: '0.75rem'
        }),
        redactionBar: {
            height: '12px',
            background: 'rgba(255,255,255,0.1)',
            marginBottom: '0.5rem',
            borderRadius: '2px'
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
                <section className="brand-section" id="cp-slide-00">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>{CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.0, marginBottom: '2rem' }}>
                                {CONFIG.thesis.headline}
                            </h1>
                            <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
                                {CONFIG.thesis.thesisLine}
                            </p>
                            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)', maxWidth: '800px' }}>
                                <p className="text-white" style={{ fontSize: '1.15rem', lineHeight: 1.6, margin: 0 }}>
                                    {CONFIG.thesis.framing}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 1: SIGNAL TRANSCRIPT CAROUSEL ========== */}
                <section className="brand-section" id="cp-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.enterpriseQuotes.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                                {CONFIG.enterpriseQuotes.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '700px' }}>
                                {CONFIG.enterpriseQuotes.intro}
                            </p>

                            {/* Transcript Carousel */}
                            <div style={styles.transcriptLine(true)}>
                                <p style={{
                                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                    color: '#fff',
                                    fontStyle: 'italic',
                                    margin: 0,
                                    lineHeight: 1.5
                                }}>
                                    {CONFIG.enterpriseQuotes.quotes[currentQuoteIndex].text}
                                </p>
                                <div style={styles.sourceTag}>
                                    {CONFIG.enterpriseQuotes.quotes[currentQuoteIndex].sourceClass}
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={prevQuote}
                                        aria-label="Previous quote"
                                        style={{
                                            padding: '0.75rem 1.25rem',
                                            background: 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            color: '#fff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
                                        }}
                                    >
                                        ← PREV
                                    </button>
                                    <button
                                        onClick={nextQuote}
                                        aria-label="Next quote"
                                        style={{
                                            padding: '0.75rem 1.25rem',
                                            background: 'transparent',
                                            border: '1px solid var(--color-grid)',
                                            color: '#fff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: prefersReducedMotion ? 'none' : 'all 0.15s'
                                        }}
                                    >
                                        NEXT →
                                    </button>
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>
                                    {currentQuoteIndex + 1} / {CONFIG.enterpriseQuotes.quotes.length}
                                </div>
                            </div>

                            <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '2rem', fontStyle: 'italic' }}>
                                {CONFIG.enterpriseQuotes.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: REQUIREMENTS ALIGNMENT MATRIX ========== */}
                <section className="brand-section" id="cp-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.solutionRequirements.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                                {CONFIG.solutionRequirements.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.solutionRequirements.intro}
                            </p>

                            {/* Matrix Header */}
                            <div className="cp-matrix-header" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem',
                                marginBottom: '1rem',
                                padding: '0 1.5rem'
                            }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>PROBLEM REALITY</span>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem' }}>SOLUTION REQUIREMENT</span>
                            </div>

                            {/* Matrix Rows */}
                            {CONFIG.solutionRequirements.requirements.map((req) => (
                                <div
                                    key={req.id}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${req.problemReality} aligns with ${req.solutionRequirement}`}
                                    onMouseEnter={() => setHoveredRequirement(req.id)}
                                    onMouseLeave={() => setHoveredRequirement(null)}
                                    onFocus={() => setHoveredRequirement(req.id)}
                                    onBlur={() => setHoveredRequirement(null)}
                                    style={styles.requirementRow(hoveredRequirement === req.id)}
                                >
                                    <div style={{ color: '#888', fontSize: '1rem' }}>
                                        <span style={{ marginRight: '0.75rem', color: '#555' }}>•</span>
                                        {req.problemReality}
                                    </div>
                                    <div style={{ color: hoveredRequirement === req.id ? 'var(--color-alert-red)' : '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="text-red">›</span>
                                        {req.solutionRequirement}
                                    </div>
                                </div>
                            ))}

                            <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '2rem', fontStyle: 'italic' }}>
                                {CONFIG.solutionRequirements.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: ENGAGEMENT DEPTH LADDER ========== */}
                <section className="brand-section" id="cp-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.engagementEvidence.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                                {CONFIG.engagementEvidence.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.engagementEvidence.intro}
                            </p>

                            <div className="cp-ladder-container" style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(200px, 1fr) minmax(300px, 2fr)',
                                gap: '2rem',
                                alignItems: 'start'
                            }}>
                                {/* Ladder Rungs */}
                                <div>
                                    {CONFIG.engagementEvidence.evidence.map((item, index) => (
                                        <div
                                            key={item.id}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${item.label}: ${item.detail}`}
                                            aria-pressed={selectedEngagement === item.id}
                                            onClick={() => setSelectedEngagement(selectedEngagement === item.id ? null : item.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setSelectedEngagement(selectedEngagement === item.id ? null : item.id);
                                                }
                                            }}
                                            style={{
                                                ...styles.ladderRung(selectedEngagement === item.id),
                                                marginBottom: index < CONFIG.engagementEvidence.evidence.length - 1 ? '0' : '0'
                                            }}
                                        >
                                            <span className="text-mono" style={{
                                                fontSize: '0.8rem',
                                                color: selectedEngagement === item.id ? 'var(--color-alert-red)' : '#888'
                                            }}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Detail Panel */}
                                <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '200px' }}>
                                    {selectedEngagement ? (
                                        <>
                                            <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>
                                                {CONFIG.engagementEvidence.evidence.find(e => e.id === selectedEngagement)?.label.toUpperCase()}
                                            </span>
                                            <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                                                {CONFIG.engagementEvidence.evidence.find(e => e.id === selectedEngagement)?.detail}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-muted" style={{ fontSize: '1rem', margin: 0 }}>
                                            Click a rung to reveal engagement details.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <p className="text-white" style={{ fontSize: '1.05rem', marginTop: '2rem', fontWeight: 500 }}>
                                {CONFIG.engagementEvidence.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: ARTEFACT DRAWER ========== */}
                <section className="brand-section" id="cp-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.demonstrableArtifacts.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                                {CONFIG.demonstrableArtifacts.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.demonstrableArtifacts.intro}
                            </p>

                            {/* Tabs */}
                            <div role="tablist" aria-label="Artifact types" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid var(--color-grid)', marginBottom: '1.5rem' }}>
                                {CONFIG.demonstrableArtifacts.artifacts.map((artifact) => (
                                    <button
                                        key={artifact.id}
                                        role="tab"
                                        aria-selected={activeArtifactTab === artifact.id}
                                        aria-controls={`panel-${artifact.id}`}
                                        onClick={() => setActiveArtifactTab(artifact.id)}
                                        style={styles.artifactTab(activeArtifactTab === artifact.id)}
                                    >
                                        {artifact.title}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Panel */}
                            <div
                                id={`panel-${activeArtifactTab}`}
                                role="tabpanel"
                                aria-labelledby={activeArtifactTab}
                                className="glass-panel"
                                style={{ padding: '2rem' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                                    {/* Description */}
                                    <div>
                                        <span className="text-mono text-red" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>
                                            {getActiveArtifact().title.toUpperCase()}
                                        </span>
                                        <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                                            {getActiveArtifact().description}
                                        </p>
                                    </div>

                                    {/* Functional Artifact Previews */}
                                    {activeArtifactTab === 'art-1' && (
                                        /* Alert Example - Structured alert card */
                                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--color-alert-red)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <span className="text-mono text-red" style={{ fontSize: '0.65rem' }}>VERIFIED CHANGE ALERT</span>
                                                <span className="text-mono" style={{ fontSize: '0.6rem', color: '#666' }}>ID: ████-████</span>
                                            </div>
                                            <div style={{ marginBottom: '0.75rem' }}>
                                                <span className="text-mono text-muted" style={{ fontSize: '0.6rem' }}>SUBJECT</span>
                                                <div style={{ color: '#fff', fontSize: '0.9rem', marginTop: '0.25rem' }}>████████ ██████████</div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                                                <div>
                                                    <span className="text-mono text-muted" style={{ fontSize: '0.6rem' }}>PREVIOUS STATE</span>
                                                    <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>No Active Record</div>
                                                </div>
                                                <div>
                                                    <span className="text-mono text-muted" style={{ fontSize: '0.6rem' }}>NEW STATE</span>
                                                    <div style={{ color: 'var(--color-alert-red)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Active Arrest</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--color-grid)', paddingTop: '0.75rem' }}>
                                                <div style={{ flex: 1 }}>
                                                    <span className="text-mono text-muted" style={{ fontSize: '0.6rem' }}>CONFIDENCE</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                                            <div style={{ width: '92%', height: '100%', background: 'var(--color-alert-red)', borderRadius: '2px' }} />
                                                        </div>
                                                        <span className="text-mono" style={{ fontSize: '0.7rem', color: '#fff' }}>92%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeArtifactTab === 'art-2' && (
                                        /* Audit Trail - Timeline format */
                                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--color-grid)' }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '1rem' }}>VERIFICATION TIMELINE</span>
                                            {[
                                                { time: '14:32:01', event: 'Source A queried', status: 'complete' },
                                                { time: '14:32:03', event: 'Source B queried', status: 'complete' },
                                                { time: '14:32:05', event: 'Identity resolution', status: 'complete' },
                                                { time: '14:32:06', event: 'State delta detected', status: 'alert' },
                                                { time: '14:32:08', event: 'Confidence scored', status: 'complete' }
                                            ].map((item, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: i < 4 ? '0.5rem' : 0 }}>
                                                    <span className="text-mono" style={{ fontSize: '0.65rem', color: '#555', width: '60px' }}>{item.time}</span>
                                                    <div style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: item.status === 'alert' ? 'var(--color-alert-red)' : '#444',
                                                        boxShadow: item.status === 'alert' ? '0 0 8px var(--color-alert-red)' : 'none'
                                                    }} />
                                                    <span style={{ fontSize: '0.8rem', color: item.status === 'alert' ? 'var(--color-alert-red)' : '#888' }}>{item.event}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeArtifactTab === 'art-3' && (
                                        /* Pilot Structure - Phases */
                                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--color-grid)' }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '1rem' }}>PILOT PHASES</span>
                                            {[
                                                { phase: 'Phase 1', title: 'Scoping & Integration', weeks: 'Wk 1-2' },
                                                { phase: 'Phase 2', title: 'Shadow Mode Testing', weeks: 'Wk 3-6' },
                                                { phase: 'Phase 3', title: 'Live Alerting (Limited)', weeks: 'Wk 7-10' },
                                                { phase: 'Phase 4', title: 'Full Rollout Decision', weeks: 'Wk 11-12' }
                                            ].map((item, i) => (
                                                <div key={i} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '0.5rem 0.75rem',
                                                    background: i === 0 ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                                                    borderLeft: i === 0 ? '2px solid var(--color-alert-red)' : '2px solid #333',
                                                    marginBottom: i < 3 ? '0.25rem' : 0
                                                }}>
                                                    <div>
                                                        <span className="text-mono" style={{ fontSize: '0.6rem', color: i === 0 ? 'var(--color-alert-red)' : '#555' }}>{item.phase}</span>
                                                        <div style={{ fontSize: '0.85rem', color: i === 0 ? '#fff' : '#888', marginTop: '0.1rem' }}>{item.title}</div>
                                                    </div>
                                                    <span className="text-mono" style={{ fontSize: '0.65rem', color: '#555' }}>{item.weeks}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeArtifactTab === 'art-4' && (
                                        /* Refresh vs Change - Visual comparison */
                                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--color-grid)' }}>
                                            <span className="text-mono text-muted" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '1rem' }}>SIGNAL DIFFERENTIATION</span>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px dashed #333' }}>
                                                    <span className="text-mono" style={{ fontSize: '0.6rem', color: '#555' }}>DATA REFRESH</span>
                                                    <div style={{ marginTop: '0.5rem' }}>
                                                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                        </div>
                                                    </div>
                                                    <div className="text-mono" style={{ fontSize: '0.6rem', color: '#555', marginTop: '0.5rem' }}>Same data, new timestamp</div>
                                                </div>
                                                <div style={{ padding: '0.75rem', background: 'rgba(228, 0, 40, 0.08)', border: '1px solid var(--color-alert-red)' }}>
                                                    <span className="text-mono text-red" style={{ fontSize: '0.6rem' }}>STATE CHANGE</span>
                                                    <div style={{ marginTop: '0.5rem' }}>
                                                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                            <div style={{ width: '40%', height: '6px', background: 'var(--color-alert-red)' }} />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                            <div style={{ width: '40%', height: '6px', background: '#333' }} />
                                                        </div>
                                                    </div>
                                                    <div className="text-mono" style={{ fontSize: '0.6rem', color: 'var(--color-alert-red)', marginTop: '0.5rem' }}>Verified material change</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '2rem', fontStyle: 'italic' }}>
                                {CONFIG.demonstrableArtifacts.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: VALIDATION MILESTONES TRACKER ========== */}
                <section className="brand-section" id="cp-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <div className="animate-fade-in-up">
                            <span className="label">{CONFIG.nextMilestones.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                                {CONFIG.nextMilestones.headline}
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                                {CONFIG.nextMilestones.intro}
                            </p>

                            {/* Milestones Checklist */}
                            {CONFIG.nextMilestones.milestones.map((milestone, index) => (
                                <div key={milestone.id} style={styles.milestoneItem(milestone.isNext)}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        border: '1px solid',
                                        borderColor: milestone.isNext ? 'var(--color-alert-red)' : 'var(--color-grid)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontFamily: 'var(--font-mono)',
                                        color: milestone.isNext ? 'var(--color-alert-red)' : '#666'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <span style={{ color: milestone.isNext ? '#fff' : '#aaa', fontSize: '1.05rem' }}>
                                            {milestone.text}
                                        </span>
                                    </div>
                                    {milestone.isNext && (
                                        <span className="text-mono text-red" style={{ fontSize: '0.7rem' }}>
                                            NEXT UP
                                        </span>
                                    )}
                                </div>
                            ))}

                            <p className="text-white" style={{ fontSize: '1.05rem', marginTop: '2rem', fontWeight: 500 }}>
                                {CONFIG.nextMilestones.closing}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: INVESTOR SUMMARY ========== */}
                <section className="brand-section cp-final-slide" id="cp-slide-06">
                    <div className="grid-bg-overlay" />

                    {/* Dramatic gradient overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse at center, rgba(228, 0, 40, 0.08) 0%, transparent 60%)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }} />

                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="animate-fade-in-up">

                            {/* Eyebrow with accent line */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div className="cp-accent-line" style={{ width: '60px', height: '2px', background: 'var(--color-alert-red)' }} />
                                <span className="label text-red" style={{ margin: 0 }}>{CONFIG.investorSummary.eyebrow}</span>
                                <div className="cp-accent-line" style={{ width: '60px', height: '2px', background: 'var(--color-alert-red)' }} />
                            </div>

                            {/* Proof Indicators */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Problem Validated', icon: '✓' },
                                    { label: 'Solution Aligned', icon: '✓' },
                                    { label: 'Engagement Real', icon: '✓' }
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(228, 0, 40, 0.08)',
                                        border: '1px solid rgba(228, 0, 40, 0.3)'
                                    }}>
                                        <span style={{
                                            width: '20px',
                                            height: '20px',
                                            background: 'var(--color-alert-red)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            color: '#fff'
                                        }}>{item.icon}</span>
                                        <span className="text-mono" style={{ fontSize: '0.75rem', color: '#fff' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Main Summary Callout - Enhanced */}
                            <div className="cp-summary-callout" style={{
                                padding: 'clamp(2rem, 5vw, 4rem)',
                                background: 'linear-gradient(135deg, rgba(228, 0, 40, 0.1) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(228, 0, 40, 0.05) 100%)',
                                border: '2px solid var(--color-alert-red)',
                                boxShadow: '0 0 60px rgba(228, 0, 40, 0.2), inset 0 0 40px rgba(228, 0, 40, 0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Corner accents */}
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '3px solid var(--color-alert-red)', borderLeft: '3px solid var(--color-alert-red)' }} />
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '3px solid var(--color-alert-red)', borderRight: '3px solid var(--color-alert-red)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '3px solid var(--color-alert-red)', borderLeft: '3px solid var(--color-alert-red)' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '3px solid var(--color-alert-red)', borderRight: '3px solid var(--color-alert-red)' }} />

                                <p style={{
                                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    fontWeight: 300,
                                    letterSpacing: '0.02em'
                                }}>
                                    "{CONFIG.investorSummary.summary}"
                                </p>
                            </div>

                            {/* Validation Tagline */}
                            <p className="text-mono" style={{
                                marginTop: '2rem',
                                fontSize: '0.85rem',
                                color: '#888',
                                letterSpacing: '0.15em'
                            }}>
                                PROOF = BEHAVIOUR + VALIDATION + ALIGNMENT
                            </p>

                            {/* CTA Buttons */}
                            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Link to="/" className="btn btn-secondary" style={{ minWidth: '180px', padding: '1rem 2rem' }}>
                                    Return to Main Site
                                </Link>
                                <MarkAsReadButton deckId="customer-proof" />
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
                .cp-summary-callout {
                    animation: summaryGlow 3s ease-in-out infinite;
                }

                .cp-accent-line {
                    animation: accentPulse 2s ease-in-out infinite;
                }

                .cp-final-slide {
                    background: radial-gradient(ellipse at bottom, rgba(228, 0, 40, 0.03) 0%, transparent 50%);
                }

                @keyframes summaryGlow {
                    0%, 100% { 
                        box-shadow: 0 0 60px rgba(228, 0, 40, 0.2), inset 0 0 40px rgba(228, 0, 40, 0.05);
                    }
                    50% { 
                        box-shadow: 0 0 80px rgba(228, 0, 40, 0.35), inset 0 0 60px rgba(228, 0, 40, 0.08);
                    }
                }

                @keyframes accentPulse {
                    0%, 100% { 
                        width: 60px;
                        opacity: 0.7;
                    }
                    50% { 
                        width: 80px;
                        opacity: 1;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .cp-summary-callout,
                    .cp-accent-line {
                        animation: none;
                    }
                }

                @media (max-width: 768px) {
                    .cp-ladder-container {
                        grid-template-columns: 1fr !important;
                    }
                    .cp-matrix-header {
                        display: none !important;
                    }
                    #cp-slide-02 [style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                        gap: 0.75rem !important;
                    }
                    #cp-slide-04 [style*="grid-template-columns: 1fr 1fr"] {
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

export default CustomerProof;
