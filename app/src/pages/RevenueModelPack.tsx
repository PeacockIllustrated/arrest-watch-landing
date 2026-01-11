import React, { useRef, useState, useEffect } from 'react';
import NavigationArrows from '../components/NavigationArrows';
import Slide01_Outcome from '../components/investor/slides_revenue/Slide01_Outcome';
import Slide02_Assumptions from '../components/investor/slides_revenue/Slide02_Assumptions';
import Slide03_Timeline from '../components/investor/slides_revenue/Slide03_Timeline';
import Slide04_DealMix from '../components/investor/slides_revenue/Slide04_DealMix';
import Slide05_ARRBuild from '../components/investor/slides_revenue/Slide05_ARRBuild';
import Slide06_Pipeline from '../components/investor/slides_revenue/Slide06_Pipeline';
import Slide07_SalesCapacity from '../components/investor/slides_revenue/Slide07_SalesCapacity';
import Slide08_ChurnExpansion from '../components/investor/slides_revenue/Slide08_ChurnExpansion';
import Slide09_SanityCheck from '../components/investor/slides_revenue/Slide09_SanityCheck';
import Slide10_Scenarios from '../components/investor/slides_revenue/Slide10_Scenarios';
import Slide11_Summary from '../components/investor/slides_revenue/Slide11_Summary';
import Slide12_Positioning from '../components/investor/slides_revenue/Slide12_Positioning';
import { usePageTitle } from '../hooks/usePageTitle';

const SLIDE_TITLES = [
    "Outcome", "Assumptions", "Timeline", "Deal Mix", "ARR Build", "Pipeline",
    "Sales", "Churn", "Sanity", "Scenarios", "Summary", "Positioning"
];

const RevenueModelPack: React.FC = () => {
    usePageTitle('Revenue Model');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

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
            scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
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

    const scrollToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const width = window.innerWidth;
            scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" id="scrollContainer" ref={scrollContainerRef}>
                <Slide01_Outcome />
                <Slide02_Assumptions />
                <Slide03_Timeline />
                <Slide04_DealMix />
                <Slide05_ARRBuild />
                <Slide06_Pipeline />
                <Slide07_SalesCapacity />
                <Slide08_ChurnExpansion />
                <Slide09_SanityCheck />
                <Slide10_Scenarios />
                <Slide11_Summary />
                <Slide12_Positioning />
            </div>

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
        </>
    );
};

export default RevenueModelPack;
