import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationArrows from '../components/NavigationArrows';
import UberIntro from '../components/uber/UberIntro';
import UberProblem from '../components/uber/UberProblem';
import UberSolution from '../components/uber/UberSolution';
import UberCaseStudies from '../components/uber/UberCaseStudies';
import UberRealWorldCases from '../components/uber/UberRealWorldCases';
import UberTechSection from '../components/uber/UberTechSection';
import UberAsk from '../components/uber/UberAsk';

const UberPack: React.FC = () => {
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
            <Link to="/" className="back-link">← RETURN TO INTEL</Link>

            <div className="brand-scroll-container" id="scrollContainer" ref={scrollContainerRef}>
                <UberIntro />
                <UberProblem />
                <UberSolution />
                <UberCaseStudies />
                <UberRealWorldCases />
                <UberTechSection />
                <UberAsk />
            </div>

            <div className="nav-indicators">
                {[...Array(7)].map((_, i) => (
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

export default UberPack;
