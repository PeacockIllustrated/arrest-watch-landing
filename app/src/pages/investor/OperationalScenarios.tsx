import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../components/NavigationArrows';

import RadarNode from '../../components/investor/ui/RadarNode';
import '../../styles/brand.css';
import { usePageTitle } from '../../hooks/usePageTitle';
import { OPERATIONAL_SCENARIOS_CONFIG } from '../../lib/operationalScenariosConfig';

const SLIDE_TITLES = OPERATIONAL_SCENARIOS_CONFIG.slideNavTitles;

const OperationalScenarios: React.FC = () => {
    usePageTitle('Operational Scenarios');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Scroll refs for carousel
    const scrollRefA = useRef<HTMLDivElement>(null);
    const scrollRefB = useRef<HTMLDivElement>(null);
    const scrollInterval = useRef<any>(null);

    // Hover Scroll Logic
    const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;

        const { left, width } = ref.current.getBoundingClientRect();
        const x = e.clientX - left;
        const zone = width * 0.25; // 25% zone

        // Clear existing interval
        if (scrollInterval.current) clearInterval(scrollInterval.current);

        if (x < zone) {
            // Scroll Left
            const speed = (1 - x / zone) * 10; // Simple speed curve
            scrollInterval.current = setInterval(() => {
                if (ref.current) ref.current.scrollLeft -= speed + 2;
            }, 10);
        } else if (x > width - zone) {
            // Scroll Right
            const speed = ((x - (width - zone)) / zone) * 10;
            scrollInterval.current = setInterval(() => {
                if (ref.current) ref.current.scrollLeft += speed + 2;
            }, 10);
        } else {
            // Stop
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
                scrollInterval.current = null;
            }
        }
    };

    const handleMouseLeave = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    };


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

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);



    // Interaction states











    return (
        <>
            <div className="brand-scroll-container" ref={scrollContainerRef} style={{ overflowY: isMobile ? 'visible' : 'hidden' }}> {/* Force no vertical scroll on main container */}

                {/* ========== PANEL 1: TITLE ========== */}
                <section className="brand-section" id="os-slide-01">
                    <div className="grid-bg-overlay" />
                    <div style={{ position: 'absolute', opacity: 0.2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <RadarNode size="800px" type="radar" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', margin: 'auto' }}>
                        <div className="animate-fade-in-up">
                            <span className="label" style={{ marginBottom: '2rem', display: 'block' }}>INVESTOR BRIEFING</span>
                            <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
                                {OPERATIONAL_SCENARIOS_CONFIG.pageTitle}
                            </h1>
                            <p className="text-muted" style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                                {OPERATIONAL_SCENARIOS_CONFIG.pageSubtitle}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button onClick={() => scrollToSlide(1)} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                                    View Scenario A: Risk Profile
                                </button>
                                <button onClick={() => scrollToSlide(2)} className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                                    View Scenario B: Decision Logic
                                </button>
                            </div>

                            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Link to="/investor-delta" className="text-link text-muted" style={{ fontSize: '0.9rem' }}>
                                    ← Back to Main Deck
                                </Link>
                                <span className="text-muted">|</span>
                                <Link to="/decks" className="text-link text-muted" style={{ fontSize: '0.9rem' }}>
                                    Data Room
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== PANEL 2: SCENARIO A (RISK) ========== */}
                <section className="brand-section" id="os-slide-02">
                    <div className="grid-bg-overlay" />
                    <div className="content-wrapper">

                        <div className="scenario-header">
                            <span className="label">{OPERATIONAL_SCENARIOS_CONFIG.scenarioA.eyebrow}</span>
                            <h2>{OPERATIONAL_SCENARIOS_CONFIG.scenarioA.headline}</h2>
                            <p>{OPERATIONAL_SCENARIOS_CONFIG.scenarioA.description}</p>
                        </div>

                        <div
                            className="cards-scroll-container"
                            ref={scrollRefA}
                            onMouseMove={(e) => handleMouseMove(e, scrollRefA)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {OPERATIONAL_SCENARIOS_CONFIG.scenarioA.before.steps.map((step, i) => (
                                <ScenarioCard
                                    key={i}
                                    index={i}
                                    before={{ title: step.title, bullets: step.bullets }}
                                    after={{
                                        title: OPERATIONAL_SCENARIOS_CONFIG.scenarioA.after.steps[i]?.title || "Resolution",
                                        bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioA.after.steps[i]?.bullets || []
                                    }}
                                />
                            ))}
                            {/* Result Card as the final item */}
                            <ScenarioCard
                                index={99}
                                isResult
                                before={{
                                    title: "RESULTING RISK",
                                    bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioA.before.result
                                }}
                                after={{
                                    title: "RESULTING OUTCOME",
                                    bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioA.after.result
                                }}
                            />
                        </div>

                        <div className="scenario-footer">
                            <span className="text-mono text-red">KEY SHIFT:</span>
                            <span className="text-white">{OPERATIONAL_SCENARIOS_CONFIG.scenarioA.keyShift}</span>
                        </div>
                    </div>
                </section>

                {/* ========== PANEL 3: SCENARIO B (DECISION) ========== */}
                <section className="brand-section" id="os-slide-03">
                    <div className="grid-bg-overlay" />
                    <div className="content-wrapper">

                        <div className="scenario-header">
                            <span className="label">{OPERATIONAL_SCENARIOS_CONFIG.scenarioB.eyebrow}</span>
                            <h2>{OPERATIONAL_SCENARIOS_CONFIG.scenarioB.headline}</h2>
                            <p>{OPERATIONAL_SCENARIOS_CONFIG.scenarioB.description}</p>
                        </div>

                        <div
                            className="cards-scroll-container"
                            ref={scrollRefB}
                            onMouseMove={(e) => handleMouseMove(e, scrollRefB)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {OPERATIONAL_SCENARIOS_CONFIG.scenarioB.before.steps.map((step, i) => (
                                <ScenarioCard
                                    key={i}
                                    index={i}
                                    before={{ title: step.title, bullets: step.bullets }}
                                    after={{
                                        title: OPERATIONAL_SCENARIOS_CONFIG.scenarioB.after.steps[i]?.title || "Resolution",
                                        bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioB.after.steps[i]?.bullets || []
                                    }}
                                />
                            ))}
                            {/* Result Card */}
                            <ScenarioCard
                                index={99}
                                isResult
                                before={{
                                    title: "RESULT",
                                    bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioB.before.result
                                }}
                                after={{
                                    title: "RESULT",
                                    bullets: OPERATIONAL_SCENARIOS_CONFIG.scenarioB.after.result
                                }}
                            />
                        </div>

                        <div className="scenario-footer">
                            <span className="text-mono text-red">KEY SHIFT:</span>
                            <span className="text-white">{OPERATIONAL_SCENARIOS_CONFIG.scenarioB.keyShift}</span>
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
                /* Layout & Grid */
                #os-slide-01, #os-slide-02, #os-slide-03 {
                    height: 100vh !important;
                    padding: 4rem 4rem 2rem !important; /* Nice generous padding */
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden !important;
                }

                .content-wrapper {
                    height: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                }

                .scenario-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    flex-shrink: 0;
                }
                .scenario-header h2 {
                    font-size: 2.2rem;
                    margin: 0.5rem 0;
                }
                .scenario-header p {
                    color: #888;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .cards-scroll-container {
                    display: flex;
                    gap: 2rem;
                    overflow-x: auto;
                    padding: 2rem 4rem;
                    width: 100%;
                    align-items: center;
                    scrollbar-width: none; /* Hide scrollbar Firefox */
                    -ms-overflow-style: none; /* Hide scrollbar IE/Edge */
                    scroll-behavior: smooth;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .cards-scroll-container::-webkit-scrollbar {
                    display: none; /* Hide scrollbar Chrome/Safari */
                }

                .scenario-footer {
                    margin-top: 2rem;
                    text-align: center;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    flex-shrink: 0;
                    font-size: 1.1rem;
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                /* Scenario Card Styles */
                .scenario-card-container {
                    perspective: 1000px;
                    width: 250px; /* Original width */
                    height: 400px; /* Adjusted height */
                    flex-shrink: 0; /* Prevent shrinking in flex */
                    margin: 0; 
                    cursor: pointer;
                }
                
                .scenario-card {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                
                /* Glitch classes applied during interaction */
                .scenario-card.glitch-active {
                    animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
                }
                .scenario-card.glitch-active .card-content {
                    opacity: 0.5;
                    filter: brightness(1.5);
                }

                /* States */
                .scenario-card.state-before {
                    border-left: 2px solid #444;
                }
                .scenario-card.state-after {
                    border-left: 2px solid var(--color-alert-red);
                    background: rgba(40, 0, 0, 0.2);
                }
                
                .card-content {
                    padding: 1.5rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .card-header {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                }

                .card-bullets {
                    font-size: 0.85rem;
                    color: #aaa;
                    line-height: 1.4;
                    flex: 1;
                }
                .card-bullets div {
                    margin-bottom: 0.5rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .click-hint {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    opacity: 0;
                    transition: opacity 0.3s;
                    font-size: 0.7rem;
                    color: #666;
                }
                .scenario-card:hover .click-hint {
                    opacity: 1;
                }

                /* Mobile Adjustment */
                @media (max-width: 768px) {
                    #os-slide-01, #os-slide-02, #os-slide-03 {
                        height: auto !important;
                        overflow: visible !important;
                        padding-top: 5rem !important;
                        padding-left: 1.5rem !important;
                        padding-right: 1.5rem !important;
                    }
                    .cards-scroll-container {
                        flex-direction: column;
                        overflow-x: visible;
                        padding: 0;
                        mask-image: none;
                    }
                    .scenario-card-container {
                        width: 100%;
                        height: 350px;
                        margin-bottom: 2rem;
                    }
                }

                /* Glitch Keyframes */
                @keyframes glitch-skew {
                    0% { transform: translate(0) }
                    20% { transform: translate(-2px, 2px) }
                    40% { transform: translate(-2px, -2px) }
                    60% { transform: translate(2px, 2px) }
                    80% { transform: translate(2px, -2px) }
                    100% { transform: translate(0) }
                }

            `}</style>
        </>
    );
};

// Internal Component for the Glitch Card
const ScenarioCard: React.FC<{
    index: number;
    before: { title: string, bullets: string[] };
    after: { title: string, bullets: string[] };
    isResult?: boolean;
}> = ({ index, before, after, isResult }) => {
    const [view, setView] = useState<'before' | 'after'>('before');
    const [isGlitching, setIsGlitching] = useState(false);

    const toggle = () => {
        if (isGlitching) return;
        setIsGlitching(true);

        // Swap state
        setTimeout(() => {
            setView(v => v === 'before' ? 'after' : 'before');
        }, 100);

        // End glitch
        setTimeout(() => {
            setIsGlitching(false);
        }, 500);
    };

    const isAfter = view === 'after';

    return (
        <div className="scenario-card-container" onClick={toggle}>

            {/* Container for the stack */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Back Card (Legacy / Before) - Always rendered, stays in back */}
                <div className={`panel ${isGlitching ? 'glitch-active' : ''}`} style={{
                    position: 'absolute', inset: 0,
                    background: '#151515', zIndex: 1, border: '1px dashed #444',
                    display: 'flex', flexDirection: 'column',
                    opacity: isAfter ? 0.3 : 1, // Dim when covered
                    transition: 'opacity 0.3s'
                }}>
                    <div style={{ padding: '0.25rem', borderBottom: '1px dashed #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>RISK SCENARIO</span>
                        <span className="text-mono" style={{ fontSize: '0.7rem', color: '#666' }}>UNVERIFIED</span>
                    </div>
                    <div style={{ padding: '0.35rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ccc' }}>
                            {before.title}
                        </div>
                        {before.bullets.map((b, i) => (
                            <div key={i} className="text-muted" style={{ fontSize: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                                <span>›</span> {b}
                            </div>
                        ))}
                    </div>
                    <div className="text-mono" style={{ padding: '1rem', marginTop: 'auto', fontSize: '0.7rem', color: '#555', textAlign: 'right' }}>
                        CLICK TO VERIFY_
                    </div>
                </div>

                {/* Front Card (ArrestDelta / After) - Enters on 'After' state */}
                <div className={`panel ${isGlitching ? 'glitch-active' : ''}`} style={{
                    position: 'absolute', inset: '10px -10px -10px 10px', // Offset position
                    background: '#050505', zIndex: 2, border: '1px solid var(--color-alert-red)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column',
                    opacity: isAfter ? 1 : 0,
                    transform: isAfter ? 'translate(0, 0)' : 'translate(-20px, 20px)',
                    pointerEvents: isAfter ? 'auto' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                }}>
                    <div style={{ padding: '0.25rem', borderBottom: '1px solid var(--color-grid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-mono text-white" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{isResult ? 'OUTCOME' : `STEP 0${index + 1}`}</span>
                        <div className="flex-row">
                            <div className="pulse-active" style={{ width: '6px', height: '6px', background: 'var(--color-alert-red)', borderRadius: '50%' }}></div>
                            <span className="text-mono text-red" style={{ fontSize: '0.7rem' }}>VERIFIED</span>
                        </div>
                    </div>
                    <div style={{ padding: '0.35rem', flex: 1, overflowY: 'auto' }}>
                        <div style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 'bold', color: 'white' }}>
                            {after.title}
                        </div>
                        {after.bullets.map((b, i) => (
                            <div key={i} style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', color: '#eee' }}>
                                <span className="text-red">›</span> {b}
                            </div>
                        ))}
                    </div>
                    <div className="text-mono text-red" style={{
                        fontSize: '0.7rem',
                        padding: '0.5rem',
                        margin: '0 0.35rem 0.35rem 0.35rem',
                        background: 'rgba(228, 0, 40, 0.05)',
                        alignSelf: 'flex-start',
                        border: '1px solid rgba(228, 0, 40, 0.2)'
                    }}>
                        &gt;&gt; REAL-TIME SYNC
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OperationalScenarios;
