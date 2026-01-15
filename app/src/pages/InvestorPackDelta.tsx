import React, { useRef, useState, useEffect } from 'react';
import NavigationArrows from '../components/NavigationArrows';
import Slide01_Problem from '../components/investor/slides_delta/Slide01_Problem';
import Slide02_Solution from '../components/investor/slides_delta/Slide02_Solution';
import Slide02b_MarketSize from '../components/investor/slides_delta/Slide02b_MarketSize';
import Slide03_Product from '../components/investor/slides_delta/Slide03_Product';
import Slide04_Customers from '../components/investor/slides_delta/Slide04_Customers';
import Slide05_MarketSize from '../components/investor/slides_delta/Slide05_MarketSize';
import Slide06_BusinessModel from '../components/investor/slides_delta/Slide06_BusinessModel';
import Slide07_Pricing from '../components/investor/slides_delta/Slide07_Pricing';
import Slide08_WhyWeWin from '../components/investor/slides_delta/Slide08_WhyWeWin';
import Slide09_ARR_Early from '../components/investor/slides_delta/Slide09_ARR_Early';
import Slide10_ARR_Platform from '../components/investor/slides_delta/Slide10_ARR_Platform';
import Slide11_ARR_Leader from '../components/investor/slides_delta/Slide11_ARR_Leader';
import Slide12_Valuation from '../components/investor/slides_delta/Slide12_Valuation';
import Slide13_Raise from '../components/investor/slides_delta/Slide13_Raise';
import Slide14_WhyNow from '../components/investor/slides_delta/Slide14_WhyNow';
import Slide15_Closing from '../components/investor/slides_delta/Slide15_Closing';
import { usePageTitle } from '../hooks/usePageTitle';

const SLIDE_TITLES = [
    "Problem", "Solution", "Market", "Product", "Customers", "Tech",
    "Model", "Pricing", "Advantage", "Traction", "Platform",
    "Leader", "Valuation", "Raise", "Timing", "Close"
];

const InvestorPackDelta: React.FC = () => {
    usePageTitle('Investor Deck');
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

            // Calc precise progress for bar
            const currentProgress = (scrollLeft / maxScroll) * 100;
            setProgress(currentProgress);

            // Update active index
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

        // Keyboard Support
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
            <div className="deck-progress-bar" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-alert-red)', transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--color-alert-red)' }} />
            </div>

            <div className="brand-scroll-container" id="scrollContainer" ref={scrollContainerRef}>
                <Slide01_Problem />
                <Slide02_Solution />
                <Slide02b_MarketSize />
                <Slide03_Product />
                <Slide04_Customers />
                <Slide05_MarketSize />
                <Slide06_BusinessModel />
                <Slide07_Pricing />
                <Slide08_WhyWeWin />
                <Slide09_ARR_Early />
                <Slide10_ARR_Platform />
                <Slide11_ARR_Leader />
                <Slide12_Valuation />
                <Slide13_Raise />
                <Slide14_WhyNow />
                <Slide15_Closing />
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

export default InvestorPackDelta;
