
import React from 'react';

interface NavigationArrowsProps {
    onPrev: () => void;
    onNext: () => void;
    showPrev: boolean;
    showNext: boolean;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ onPrev, onNext, showPrev, showNext }) => {
    return (
        <>
            <button
                className="nav-arrow prev"
                onClick={onPrev}
                aria-label="Previous Section"
                style={{
                    opacity: showPrev ? 1 : 0.3,
                    pointerEvents: showPrev ? 'auto' : 'none'
                }}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
            </button>
            <button
                className="nav-arrow next"
                onClick={onNext}
                aria-label="Next Section"
                style={{
                    opacity: showNext ? 1 : 0.3,
                    pointerEvents: showNext ? 'auto' : 'none'
                }}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
            </button>
        </>
    );
};

export default NavigationArrows;
