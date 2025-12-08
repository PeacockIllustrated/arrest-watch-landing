import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.2;
            cursorY += dy * 0.2;

            if (cursor) {
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
            }

            requestAnimationFrame(animateCursor);
        };

        document.addEventListener('mousemove', onMouseMove);
        const animationId = requestAnimationFrame(animateCursor);

        // Hover effects
        const handleMouseEnter = () => document.body.classList.add('hovering');
        const handleMouseLeave = () => document.body.classList.remove('hovering');

        const addHoverListeners = () => {
            document.querySelectorAll('a, button, .swatch, .input-field, .redacted, .toggle-switch, .checkbox-container, .tab-item, tr, .dash-nav-item, .metric-card, .panel, .cursor-pointer').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Add listeners initially and on route change
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationId);
            observer.disconnect();
            document.querySelectorAll('*').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [location]);

    return <div id="cursor" ref={cursorRef}></div>;
};

export default Cursor;
