import React, { useRef, useState, useEffect } from 'react';
import NavigationArrows from '../components/NavigationArrows';
import Slide01_Problem from '../components/investor/slides/Slide01_Problem';
import Slide02_Solution from '../components/investor/slides/Slide02_Solution';
import Slide03_Product from '../components/investor/slides/Slide03_Product';
import Slide04_Customers from '../components/investor/slides/Slide04_Customers';
import Slide05_MarketSize from '../components/investor/slides/Slide05_MarketSize';
import Slide06_BusinessModel from '../components/investor/slides/Slide06_BusinessModel';
import Slide07_Pricing from '../components/investor/slides/Slide07_Pricing';
import Slide08_WhyWeWin from '../components/investor/slides/Slide08_WhyWeWin';
import Slide09_ARR_Early from '../components/investor/slides/Slide09_ARR_Early';
import Slide10_ARR_Platform from '../components/investor/slides/Slide10_ARR_Platform';
import Slide11_ARR_Leader from '../components/investor/slides/Slide11_ARR_Leader';
import Slide12_Valuation from '../components/investor/slides/Slide12_Valuation';
import Slide13_Raise from '../components/investor/slides/Slide13_Raise';
import Slide14_WhyNow from '../components/investor/slides/Slide14_WhyNow';
import Slide15_Closing from '../components/investor/slides/Slide15_Closing';

const InvestorPack: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const SLIDE_COUNT = 15;

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;

            setShowPrev(scrollLeft > 10);
            setShowNext(scrollLeft < maxScroll - 10);

            // Update active index
            const width = window.innerWidth;
            const height = window.innerHeight;
            let index;

            if (width <= 768) {
                const scrollPos = scrollContainerRef.current.scrollTop;
                index = Math.round(scrollPos / height);
            } else {
                const scrollPos = scrollLeft;
                index = Math.round(scrollPos / width);
            }
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
            // Initial check
            handleScroll();
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <div className="brand-scroll-container" id="scrollContainer" ref={scrollContainerRef}>
                <Slide01_Problem />
                <Slide02_Solution />
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

            <div className="nav-indicators">
                {[...Array(SLIDE_COUNT)].map((_, i) => (
                    <button
                        key={i}
                        className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => {
                            if (scrollContainerRef.current) {
                                const width = window.innerWidth;
                                scrollContainerRef.current.scrollTo({
                                    left: width * i,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    />
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

export default InvestorPack;
