import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';
import PieChart from '../../components/investor/ui/PieChart';
import RadarNode from '../../components/investor/ui/RadarNode';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { USE_OF_FUNDS_CONFIG } from '../../lib/useOfFundsConfig';

// Simple parser to avoid heavy dependencies
const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={index} className="text-red" style={{ fontStyle: 'normal' }}>{part.slice(1, -1)}</em>;
        }
        return part;
    });
};

const SLIDE_TITLES = [
    "Thesis", "Structure", "Milestones", "Allocation", "Metrics", "Summary"
];

const UseOfFunds: React.FC = () => {
    usePageTitle('Use of Funds');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // Interaction States
    const [selectedMilestone, setSelectedMilestone] = useState(0);
    const [allocationView, setAllocationView] = useState<'table' | 'bar'>('table');
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
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
            if (container) container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {/* Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            {/* Back to Investor Deck */}
            <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 100 }}>
                <Link to="/investor-delta" className="nav-link text-mono text-muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <span className="text-red">←</span> BACK TO DECK
                </Link>
            </div>

            <div className="brand-scroll-container" ref={scrollContainerRef}>

                {/* SLIDE 1: Thesis */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15, pointerEvents: 'none' }}>
                        <RadarNode size="800px" type="radar" />
                    </div>
                    <div className="animate-fade-in-up" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <span className="label text-red">USE OF FUNDS</span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem', lineHeight: 0.95 }}>
                            {USE_OF_FUNDS_CONFIG.thesis.headline}
                        </h1>
                        <div className="text-muted" style={{ fontSize: '1.4rem', maxWidth: '900px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                            {USE_OF_FUNDS_CONFIG.thesis.content.map((p, i) => (
                                <p key={i} style={{ marginBottom: '1.5rem' }}>{parseMarkdown(p)}</p>
                            ))}
                        </div>
                        <div className="glass-panel" style={{ display: 'inline-block', padding: '1.5rem 3rem', border: '1px solid var(--color-alert-red)', background: 'rgba(228, 0, 40, 0.05)' }}>
                            <p className="text-white text-large" style={{ fontSize: '1.5rem', fontWeight: 500, margin: 0 }}>
                                {parseMarkdown(USE_OF_FUNDS_CONFIG.thesis.subContent)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* SLIDE 2: Raise Overview */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div className="animate-fade-in-up" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
                            <div>
                                <span className="label text-red">CAPITAL STRUCTURE</span>
                                <h2 className="text-large" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
                                    {USE_OF_FUNDS_CONFIG.raiseOverview.title}
                                </h2>
                                <div className="glass-panel border-glow" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {USE_OF_FUNDS_CONFIG.raiseOverview.points.map((point, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem', fontSize: '1.4rem', color: '#fff' }}>
                                                <span className="text-red">›</span>
                                                {parseMarkdown(point)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <RadarNode size="500px" type="radar" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SLIDE 3: Milestones (Ops Console) */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>
                        <span className="label">OPERATIONAL MILESTONES</span>
                        <h2 className="text-large" style={{ fontSize: '3rem', marginBottom: '3rem' }}>Execution Timeline</h2>

                        <div className="milestone-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem', height: '650px' }}>
                            {/* Timeline Selector */}
                            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', overflowY: 'auto' }}>
                                {USE_OF_FUNDS_CONFIG.milestones.map((m, i) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedMilestone(i)}
                                        className={`milestone-btn ${selectedMilestone === i ? 'active' : ''}`}
                                        style={{
                                            padding: '1.5rem',
                                            background: selectedMilestone === i ? 'rgba(228, 0, 40, 0.15)' : 'rgba(255,255,255,0.03)',
                                            border: selectedMilestone === i ? '1px solid var(--color-alert-red)' : '1px solid transparent',
                                            borderLeft: selectedMilestone === i ? '4px solid var(--color-alert-red)' : '4px solid transparent',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <span className="text-mono" style={{ fontSize: '0.8rem', color: selectedMilestone === i ? '#fff' : '#666' }}>{m.months}</span>
                                            {selectedMilestone === i && <span className="text-red">●</span>}
                                        </div>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 500, color: selectedMilestone === i ? '#fff' : '#999', transition: 'color 0.2s' }}>{m.title}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Details Dossier */}
                            <div className="glass-panel" style={{ padding: '0', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '3rem', flex: 1 }}>
                                    <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '1rem' }}>
                                        ACTIVE_PHASE: {USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].months}
                                    </div>
                                    <h3 className="text-large" style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1 }}>
                                        {USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].title}
                                    </h3>
                                    <p className="text-white" style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '900px', lineHeight: 1.4 }}>
                                        {USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].objective}
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                                        <div>
                                            <h4 className="text-mono text-muted" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>WHAT THIS UNLOCKS</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].unlocks.map((item, i) => (
                                                    <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', color: '#fff', fontSize: '1.1rem' }}>
                                                        <span className="text-red">✓</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-mono text-muted" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>CAPITAL DEPLOYED</h4>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].capitalDeployed.map((item, i) => (
                                                    <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', color: '#ccc', fontSize: '1.1rem' }}>
                                                        <span className="text-red">›</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem 3rem', background: 'rgba(228, 0, 40, 0.08)', borderTop: '1px solid var(--color-alert-red)' }}>
                                    <span className="text-mono text-red" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>TARGET_OUTCOME</span>
                                    <span className="text-white" style={{ fontSize: '1.2rem', fontWeight: 500 }}>{parseMarkdown(USE_OF_FUNDS_CONFIG.milestones[selectedMilestone].outcome)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SLIDE 4: Allocation (Budget Lens) */}
                <section className="brand-section">
                    <div className="grid-bg-overlay" />
                    <div className="animate-fade-in-up" style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                            <div>
                                <span className="label">BUDGET ALLOCATION</span>
                                <h2 className="text-large" style={{ fontSize: '3.5rem' }}>{USE_OF_FUNDS_CONFIG.allocation.title}</h2>
                            </div>
                            {/* Visual Toggle */}
                            <div className="toggle-container" style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-grid)', padding: '4px' }}>
                                <button
                                    onClick={() => setAllocationView('table')}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: allocationView === 'table' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: allocationView === 'table' ? '#fff' : '#666',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    TABLE
                                </button>
                                <button
                                    onClick={() => setAllocationView('bar')}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: allocationView === 'bar' ? 'var(--color-alert-red)' : 'transparent',
                                        color: allocationView === 'bar' ? '#fff' : '#666',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    VISUAL
                                </button>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '3rem' }}>
                            {allocationView === 'table' ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--color-grid)' }}>
                                            <th className="text-mono text-muted" style={{ textAlign: 'left', padding: '1rem', fontSize: '0.9rem' }}>CATEGORY</th>
                                            <th className="text-mono text-muted" style={{ textAlign: 'right', padding: '1rem', fontSize: '0.9rem' }}>ALLOCATION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {USE_OF_FUNDS_CONFIG.allocation.items.map((item, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1rem 1rem', color: '#fff', fontSize: '1.2rem' }}>{item.category}</td>
                                                <td className="text-mono" style={{ padding: '1rem 1rem', textAlign: 'right', color: 'var(--color-alert-red)', fontSize: '1.2rem' }}>{item.amount}</td>
                                            </tr>
                                        ))}
                                        <tr style={{ borderTop: '2px solid var(--color-grid)' }}>
                                            <td style={{ padding: '1rem 1rem', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>Total</td>
                                            <td className="text-mono" style={{ padding: '1rem 1rem', textAlign: 'right', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{USE_OF_FUNDS_CONFIG.allocation.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                                    <PieChart
                                        data={USE_OF_FUNDS_CONFIG.allocation.items.map((item, i) => ({
                                            label: item.category,
                                            value: item.value,
                                            color: i === 0 ? '#E40028' : `rgba(228, 0, 40, ${1 - (i * 0.15)})`
                                        }))}
                                        size={500}
                                        innerRadius={160}
                                    />
                                </div>
                            )}

                            <div style={{ marginTop: '3rem', marginBottom: '3rem', padding: '1.5rem', border: '1px dashed var(--color-grid)', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
                                <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>
                                    {USE_OF_FUNDS_CONFIG.allocation.note}
                                </p>
                            </div>
                        </div>
                    </div>
                </section >

                {/* SLIDE 5: Efficiency Metrics (Signal Chips) */}
                < section className="brand-section" >
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.15, right: '10%', top: '20%' }}>
                        <RadarNode size="600px" type="radar" />
                    </div>
                    <div className="animate-fade-in-up" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <span className="label">MEASUREMENT</span>
                        <h2 className="text-large" style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>{USE_OF_FUNDS_CONFIG.efficiencyMetrics.title}</h2>
                        <p className="text-muted" style={{ fontSize: '1.4rem', marginBottom: '4rem' }}>{USE_OF_FUNDS_CONFIG.efficiencyMetrics.intro}</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginBottom: '5rem' }}>
                            {USE_OF_FUNDS_CONFIG.efficiencyMetrics.metrics.map((metric, i) => (
                                <div
                                    key={i}
                                    className="signal-chip"
                                    style={{
                                        padding: '1rem 2rem',
                                        background: 'rgba(228, 0, 40, 0.1)(',
                                        border: '1px solid rgba(228, 0, 40, 0.3)',
                                        borderRadius: '4px', // Squared off to match chips
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        cursor: 'help',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                    title={metric}
                                >
                                    {metric}
                                </div>
                            ))}
                        </div>

                        <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '700px', margin: '0 auto', borderLeft: '4px solid var(--color-alert-red)' }}>
                            <p className="text-white" style={{ fontSize: '1.3rem', margin: 0, fontWeight: 500 }}>
                                {USE_OF_FUNDS_CONFIG.efficiencyMetrics.closing}
                            </p>
                        </div>
                    </div>
                    <style>{`
                        .signal-chip:hover {
                            background: rgba(228, 0, 40, 0.3) !important;
                            box-shadow: 0 0 15px rgba(228, 0, 40, 0.3);
                            transform: translateY(-2px);
                        }
                    `}</style>
                </section >

                {/* SLIDE 6: Summary & Discipline */}
                < section className="brand-section" >
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }}>
                        <RadarNode size="1000px" type="radar" />
                    </div>
                    <div className="animate-fade-in-up" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ marginBottom: '8rem' }}>
                            <span className="label text-red">INVESTOR SUMMARY</span>
                            <h2 className="text-large" style={{ fontSize: '3rem', lineHeight: 1.4, margin: '3rem 0', fontWeight: 300 }}>
                                "{parseMarkdown(USE_OF_FUNDS_CONFIG.investorSummary.content)}"
                            </h2>
                        </div>

                        <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--color-grid)', background: 'rgba(0,0,0,0.8)' }}>
                            <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {USE_OF_FUNDS_CONFIG.disciplineStatement.title.toUpperCase()}
                            </span>
                            <p className="text-muted" style={{ fontSize: '1.2rem', margin: 0 }}>
                                {parseMarkdown(USE_OF_FUNDS_CONFIG.disciplineStatement.content)}
                            </p>
                        </div>
                    </div>
                </section >

            </div >

            {/* Mobile Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .brand-section {
                        padding: 6rem 1.5rem 2rem !important;
                    }
                    .text-huge {
                        font-size: 2.5rem !important;
                    }
                    .text-large {
                        font-size: 1.8rem !important;
                    }
                    .nav-indicators {
                        bottom: 1.5rem !important;
                    }
                    .milestone-grid {
                        grid-template-columns: 1fr !important;
                        height: auto !important;
                        gap: 2rem !important;
                    }
                    /* Allocation Legend */
                    .allocation-legend {
                        grid-template-columns: 1fr !important;
                    }
                     /* Back link adjustment */
                     .back-link {
                        top: 1rem !important;
                        left: 1rem !important;
                        font-size: 0.8rem !important;
                     }
                     /* Hide large arrows on mobile */
                     .nav-arrow {
                        display: none !important;
                     }
                     /* Pie Chart Container */
                     svg {
                        max-width: 100%;
                        height: auto;
                     }
                }
            `}</style>

            {/* Navigation Dots */}
            < div className="nav-indicators" style={{ display: 'flex', gap: '8px', zIndex: 99 }}>
                {
                    SLIDE_TITLES.map((title, i) => (
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
                    ))
                }
            </div >

            <NavigationArrows
                onPrev={() => scrollByAmount(-window.innerWidth)}
                onNext={() => scrollByAmount(window.innerWidth)}
                showPrev={showPrev}
                showNext={showNext}
            />
        </>
    );
};

export default UseOfFunds;
