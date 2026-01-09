
import React, { useRef, useState, useEffect } from 'react';
import BrandIntro from '../components/brand/BrandIntro';
import LogoSection from '../components/brand/LogoSection';
import ColorsSection from '../components/brand/ColorsSection';
import TypographySection from '../components/brand/TypographySection';
import GuidelinesSection from '../components/brand/GuidelinesSection';
import ComponentsSection from '../components/brand/ComponentsSection';
import DashboardSection from '../components/brand/DashboardSection';
import EffectsSection from '../components/brand/EffectsSection';
import NavigationArrows from '../components/NavigationArrows';
import { usePageTitle } from '../hooks/usePageTitle';

const BrandPack: React.FC = () => {
    usePageTitle('Brand Pack');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

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
                <BrandIntro />
                <LogoSection />
                <ColorsSection />
                <TypographySection />
                <GuidelinesSection />
                <ComponentsSection />
                <DashboardSection />
                <EffectsSection />
            </div>

            <div className="nav-indicators">
                {[...Array(8)].map((_, i) => (
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

export default BrandPack;
