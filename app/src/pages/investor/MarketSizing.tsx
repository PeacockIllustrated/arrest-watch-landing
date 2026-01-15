import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import RadarNode from '../../components/investor/ui/RadarNode';
import MarkAsReadButton from '../../components/deckhub/MarkAsReadButton';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { MARKET_SIZING_CONFIG } from '../../lib/marketSizingConfig';

const SLIDE_TITLES = MARKET_SIZING_CONFIG.slideNavTitles;

const MarketSizing: React.FC = () => {
    usePageTitle('Market Sizing');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Interaction states
    const [expandedLever, setExpandedLever] = useState<string | null>(null);

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
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

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
            window.removeEventListener('resize', checkMobile);
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

                {/* ========== SLIDE 1: THESIS ========== */}
                <section className="brand-section" id="ms-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.3 }}>
                        <RadarNode size="700px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>{MARKET_SIZING_CONFIG.thesis.eyebrow}</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                {MARKET_SIZING_CONFIG.thesis.headline}
                            </h1>
                            <p className="text-muted" style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                                {MARKET_SIZING_CONFIG.thesis.subheadline}
                            </p>

                            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <div style={{ fontSize: '1.2rem', color: '#fff', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    We size the market from buyers who already make{' '}
                                    <span className="signal-chip" title="Active operational need, not theoretical">
                                        arrest-related decisions
                                    </span>{' '}
                                    today, have{' '}
                                    <span className="signal-chip" title="Paying for screening/monitoring now">
                                        budget authority
                                    </span>
                                    , and feel the{' '}
                                    <span className="signal-chip" title="Legal/reputational risk > software cost">
                                        cost of false positives
                                    </span>.
                                </div>
                                <p className="text-white" style={{ fontSize: '1.2rem', margin: 0 }}>
                                    {MARKET_SIZING_CONFIG.thesis.keyPoints[1]}
                                </p>
                            </div>

                            {/* Chip Styles inline for scoped effect */}
                            <style>{`
                                .signal-chip {
                                    background: rgba(228, 0, 40, 0.15);
                                    border: 1px solid rgba(228, 0, 40, 0.3);
                                    padding: 0 0.4rem;
                                    border-radius: 4px;
                                    cursor: help;
                                    transition: all 0.2s;
                                    position: relative;
                                    display: inline-block;
                                }
                                .signal-chip:hover {
                                    background: rgba(228, 0, 40, 0.3);
                                    box-shadow: 0 0 10px rgba(228, 0, 40, 0.2);
                                }
                                .signal-chip:hover::after {
                                    content: attr(title);
                                    position: absolute;
                                    bottom: 110%;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: #000;
                                    border: 1px solid var(--color-grid);
                                    padding: 0.5rem;
                                    font-size: 0.8rem;
                                    white-space: nowrap;
                                    z-index: 10;
                                    pointer-events: none;
                                }
                            `}</style>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 2: CORE ASSUMPTION ========== */}
                <section className="brand-section" id="ms-slide-02">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="label">{MARKET_SIZING_CONFIG.coreAssumption.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                {MARKET_SIZING_CONFIG.coreAssumption.headline}
                            </h2>
                            <p className="text-white" style={{ fontSize: '1.5rem', maxWidth: '800px' }}>
                                {MARKET_SIZING_CONFIG.coreAssumption.description}
                            </p>
                        </div>

                        <div className="grid-2" style={{ gap: '2rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                            {MARKET_SIZING_CONFIG.coreAssumption.bullets.map((bullet, i) => (
                                <div key={i} className="glass-panel animate-fade-in-up" style={{
                                    padding: '1.5rem',
                                    border: '1px solid var(--color-grid)',
                                    background: 'rgba(0,0,0,0.4)',
                                    animationDelay: `${i * 0.1}s`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span className="text-red" style={{ fontSize: '1.5rem' }}>›</span>
                                    <span className="text-mono" style={{ fontSize: '1.1rem' }}>{bullet}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 3: SAM ========== */}
                <section className="brand-section" id="ms-slide-03">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

                        {/* LEFT: Context */}
                        <div className="animate-fade-in-up">
                            <span className="label">{MARKET_SIZING_CONFIG.sam.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                                {MARKET_SIZING_CONFIG.sam.headline}
                            </h2>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 className="text-mono text-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                    {MARKET_SIZING_CONFIG.sam.targetBuyerUniverse.title}
                                </h3>
                                <p className="text-muted" style={{ marginBottom: '1rem' }}>{MARKET_SIZING_CONFIG.sam.targetBuyerUniverse.description}</p>
                                <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem' }}>
                                    {MARKET_SIZING_CONFIG.sam.targetBuyerUniverse.criteria.map((c, i) => (
                                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                            <span className="text-red">•</span>
                                            <span className="text-white">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>PRIMARY SEGMENTS</div>
                                {MARKET_SIZING_CONFIG.sam.primarySegments.map((seg, i) => (
                                    <div key={i} style={{
                                        padding: '0.75rem',
                                        borderBottom: i < 2 ? '1px dashed var(--color-grid)' : 'none',
                                        color: '#fff'
                                    }}>
                                        {i + 1}. {seg.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Calculator Panel */}
                        <div className="glass-panel border-glow animate-fade-in-up" style={{
                            padding: '2rem',
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,0,0,0.4))',
                            border: '1px solid var(--color-alert-red)',
                            animationDelay: '0.2s',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                        }}>
                            <div className="text-mono text-red" style={{ textAlign: 'right', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                                SYSTEM.CALC_SAM_V1
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                                {/* Buyers Input */}
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
                                    <div className="text-muted text-mono" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>BUYER COUNT (CONSERVATIVE)</div>
                                    <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{MARKET_SIZING_CONFIG.sam.buyerCount.range}</div>
                                    <div className="text-muted" style={{ fontSize: '0.7rem', marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.7 }}>
                                        {MARKET_SIZING_CONFIG.sam.buyerCount.footnote}
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', color: 'var(--color-grid)' }}>X</div>

                                {/* ACV Input */}
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
                                    <div className="text-muted text-mono" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>AVG ACV (MIDPOINT)</div>
                                    <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{MARKET_SIZING_CONFIG.sam.pricing.midpoint}</div>
                                    <div className="text-muted" style={{ fontSize: '0.7rem', marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.7 }}>
                                        {MARKET_SIZING_CONFIG.sam.pricing.anchoringNote}
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: '2px solid var(--color-alert-red)', paddingTop: '1.5rem' }}>
                                <div className="text-muted text-mono" style={{ marginBottom: '0.5rem' }}>NEAR-TERM SAM</div>
                                <div className="text-red text-glow" style={{ fontSize: '3.5rem', lineHeight: 1, fontWeight: 'bold' }}>
                                    {MARKET_SIZING_CONFIG.sam.calculation.result}
                                </div>
                                <div className="text-white" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                                    {MARKET_SIZING_CONFIG.sam.calculation.contextNote}
                                </div>
                                <div className="text-muted" style={{ marginTop: '1rem', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                    Excludes geographic expansion, additional Delta products, and deeper workflow penetration.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 4: SOM ========== */}
                <section className="brand-section" id="ms-slide-04">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <span className="label">{MARKET_SIZING_CONFIG.som.eyebrow}</span>
                        <h2 className="text-large" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                            {MARKET_SIZING_CONFIG.som.headline}
                        </h2>

                        <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                            {/* Background decoration */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-alert-red)' }} />

                            <h3 className="text-mono text-muted" style={{ marginBottom: '1rem' }}>
                                {MARKET_SIZING_CONFIG.som.penetrationAssumption.title}
                            </h3>
                            <div className="text-white" style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
                                {MARKET_SIZING_CONFIG.som.penetrationAssumption.rate}
                            </div>

                            {/* Range Bar Visualization */}
                            <div style={{
                                position: 'relative',
                                height: '6px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '3px',
                                margin: '0 auto 4rem',
                                maxWidth: '600px'
                            }}>
                                {/* Active Range */}
                                <div style={{
                                    position: 'absolute', left: '0%', width: '15%', height: '100%',
                                    background: 'var(--color-alert-red)',
                                    borderRadius: '3px',
                                    boxShadow: '0 0 20px var(--color-alert-red)'
                                }}>
                                    {/* Endpoint Left */}
                                    <div className="som-endpoint" title="Conservative bottom-up scenario" style={{ position: 'absolute', left: '0', top: '-6px', height: '18px', width: '2px', background: '#fff' }} />
                                    {/* Endpoint Right */}
                                    <div className="som-endpoint" title="GTM plan execution targets" style={{ position: 'absolute', right: '0', top: '-6px', height: '18px', width: '2px', background: '#fff' }} />
                                </div>
                            </div>

                            <style>{`
                                .som-endpoint { cursor: help; }
                                .som-endpoint:hover::after {
                                    content: attr(title);
                                    position: absolute;
                                    bottom: 150%;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: #000;
                                    border: 1px solid var(--color-grid);
                                    padding: 0.5rem;
                                    font-size: 0.8rem;
                                    white-space: nowrap;
                                    z-index: 10;
                                }
                            `}</style>

                            <div className="ms-som-grid">
                                <div>
                                    <div className="text-huge text-red" style={{ fontSize: '4rem', lineHeight: 1 }}>20-30</div>
                                    <div className="text-mono text-muted" style={{ marginTop: '0.5rem' }}>CUSTOMERS</div>
                                </div>
                                <div className="ms-som-divider"></div>
                                <div>
                                    <div className="text-huge text-red" style={{ fontSize: '3rem', lineHeight: 1 }}>$6M-$9M</div>
                                    <div className="text-mono text-muted" style={{ marginTop: '0.5rem' }}>ARR</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed var(--color-grid)' }}>
                                <p className="text-white" style={{ margin: 0 }}>{MARKET_SIZING_CONFIG.som.alignment}</p>
                                <p className="text-muted" style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                    Represents meaningful scale while maintaining focus on product quality, data accuracy, and enterprise trust.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 5: EXPANSION LEVERS ========== */}
                <section className="brand-section" id="ms-slide-05">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="label">GROWTH VECTORS</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem' }}>
                                MARKET EXPANSION LEVERS
                            </h2>
                        </div>

                        <div className="ms-expansion-grid">
                            {MARKET_SIZING_CONFIG.expansionLevers.map((lever, i) => (
                                <div
                                    key={i}
                                    className={`glass-panel ${expandedLever === lever.id ? 'border-glow' : ''}`}
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: expandedLever === lever.id ? 'rgba(20,20,20,0.9)' : 'rgba(0,0,0,0.4)',
                                        border: expandedLever === lever.id ? '1px solid var(--color-alert-red)' : '1px solid transparent',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onClick={() => setExpandedLever(expandedLever === lever.id ? null : lever.id)}
                                >
                                    <div className="text-mono text-red" style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '1rem' }}>0{lever.number}</div>
                                    <h3 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem', minHeight: '3rem' }}>{lever.title}</h3>

                                    <div style={{
                                        opacity: 1,
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem'
                                    }}>
                                        {lever.bullets.map((b, j) => (
                                            <div key={j} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                                                <span className="text-red">›</span>
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {lever.note && (
                                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--color-grid)', fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>
                                            {lever.note}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 6: VENTURE SCALE ========== */}
                <section className="brand-section" id="ms-slide-06">
                    <div className="grid-bg-overlay" />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                        {/* LEFT: TAO */}
                        <div className="animate-fade-in-up">
                            <span className="label">{MARKET_SIZING_CONFIG.tao.eyebrow}</span>
                            <h2 className="text-large" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                                {MARKET_SIZING_CONFIG.tao.headline}
                            </h2>
                            <p className="text-muted text-mono" style={{ marginBottom: '2rem' }}>{MARKET_SIZING_CONFIG.tao.disclaimer}</p>

                            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                                {MARKET_SIZING_CONFIG.tao.considerations.map((c, i) => (
                                    <div key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                                        <span className="text-red">+</span> {c}
                                    </div>
                                ))}
                            </div>

                            <p className="text-white" style={{ fontSize: '1.1rem', lineHeight: 1.6, borderLeft: '3px solid var(--color-alert-red)', paddingLeft: '1rem' }}>
                                {MARKET_SIZING_CONFIG.tao.conclusion}
                            </p>
                        </div>

                        {/* RIGHT: Why Venture Scale */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="glass-panel border-glow" style={{ padding: '2rem', background: 'rgba(228,0,40,0.05)' }}>
                                <span className="label text-red">{MARKET_SIZING_CONFIG.ventureScale.eyebrow}</span>
                                <h3 className="text-white" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>{MARKET_SIZING_CONFIG.ventureScale.headline}</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                    {MARKET_SIZING_CONFIG.ventureScale.attributes.map((attr, i) => (
                                        <div key={i} className="text-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                            <span className="text-red">✓</span> {attr}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
                                    <p className="text-white" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{MARKET_SIZING_CONFIG.ventureScale.closingStatement}</p>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{MARKET_SIZING_CONFIG.ventureScale.positioning}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SLIDE 7: SUMMARY ========== */}
                <section className="brand-section" id="ms-slide-07">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.15 }}>
                        <RadarNode size="900px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                        <span className="label text-red">{MARKET_SIZING_CONFIG.investorSummary.eyebrow}</span>

                        <h2 className="text-large animate-fade-in-up" style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                            lineHeight: 1.4,
                            marginBottom: '2.5rem',
                            maxWidth: '700px',
                            margin: '0 auto 2.5rem'
                        }}>
                            A defensible, high-ACV wedge into a massive legacy replacement cycle.
                        </h2>

                        {/* Key Metrics Summary */}
                        <div className="animate-fade-in-up ms-summary-grid" style={{
                            animationDelay: '0.1s'
                        }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div className="text-red text-mono" style={{ fontSize: '2rem', fontWeight: 'bold' }}>$10.5B+</div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Conservative SAM</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div className="text-red text-mono" style={{ fontSize: '2rem', fontWeight: 'bold' }}>$300K</div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Avg ACV</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div className="text-red text-mono" style={{ fontSize: '2rem', fontWeight: 'bold' }}>4+</div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Expansion Levers</div>
                            </div>
                        </div>

                        <p className="text-muted animate-fade-in-up" style={{
                            animationDelay: '0.2s',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem',
                            lineHeight: 1.6
                        }}>
                            Clear expansion paths support multi-billion-dollar potential as ArrestDelta becomes embedded decision infrastructure.
                        </p>

                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Link to="/" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                                Return to Main Site
                            </Link>
                            <MarkAsReadButton deckId="market-sizing" />
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
                /* Responsive Grid Overrides */
                .ms-som-grid {
                    display: grid;
                    grid-template-columns: 1fr 1px 1fr;
                    gap: 2rem;
                    align-items: center;
                }
                .ms-expansion-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    height: 500px;
                }
                .ms-summary-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                }
                .ms-som-divider {
                    height: 80px; 
                    background: var(--color-grid);
                }

                @media (max-width: 768px) {
                    .brand-section {
                        padding: 4rem 1.5rem !important;
                        overflow-y: auto !important;
                        scrollbar-gutter: stable; /* Prevents layout shift when scrollbar appears */
                    }
                    .text-huge {
                        font-size: 3rem !important;
                    }
                    .text-large {
                        font-size: 2rem !important;
                    }
                    
                    /* Slide 4 SOM */
                    .ms-som-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .ms-som-divider {
                        display: none;
                    }

                    /* Slide 5 Expansion */
                    .ms-expansion-grid {
                        grid-template-columns: 1fr !important;
                        height: auto !important;
                        overflow: visible !important;
                        max-height: none;
                    }

                    /* Slide 7 Summary */
                    .ms-summary-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    /* General adjustments */
                    .glass-panel {
                        padding: 1.5rem !important;
                    }
                }
            `}</style>
        </>
    );
};

export default MarketSizing;
