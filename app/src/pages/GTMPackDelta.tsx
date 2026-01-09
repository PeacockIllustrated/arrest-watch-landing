import React, { useRef, useState, useEffect } from 'react';
import NavigationArrows from '../components/NavigationArrows';
import Slide01_Objective from '../components/investor/slides_gtm/Slide01_Objective';
import Slide02_ICP from '../components/investor/slides_gtm/Slide02_ICP';
import Slide03_Personas from '../components/investor/slides_gtm/Slide03_Personas';
import Slide04_Packaging from '../components/investor/slides_gtm/Slide04_Packaging';
import Slide05_Pricing from '../components/investor/slides_gtm/Slide05_Pricing';
import Slide06_SalesMotion from '../components/investor/slides_gtm/Slide06_SalesMotion';
import Slide07_Pipeline from '../components/investor/slides_gtm/Slide07_Pipeline';
import Slide08_Marketing from '../components/investor/slides_gtm/Slide08_Marketing';
import Slide09_NotDoing from '../components/investor/slides_gtm/Slide09_NotDoing';
import Slide10_Resourcing from '../components/investor/slides_gtm/Slide10_Resourcing';
import { usePageTitle } from '../hooks/usePageTitle';

const SLIDE_TITLES = [
    "Objective", "ICP", "Personas", "Packaging", "Pricing",
    "Sales", "Pipeline", "Marketing", "Exclusions", "Resourcing"
];

const GTMPackDelta: React.FC = () => {
    usePageTitle('GTM Strategy');
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
                <Slide01_Objective />
                <Slide02_ICP />
                <Slide03_Personas />
                <Slide04_Packaging />
                <Slide05_Pricing />
                <Slide06_SalesMotion />
                <Slide07_Pipeline />
                <Slide08_Marketing />
                <Slide09_NotDoing />
                <Slide10_Resourcing />
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

export default GTMPackDelta;
