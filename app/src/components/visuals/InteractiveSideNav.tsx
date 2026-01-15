import React, { useEffect, useState } from 'react';

interface InteractiveSideNavProps {
    sections: { id: string; label: string }[];
}

const InteractiveSideNav: React.FC<InteractiveSideNavProps> = ({ sections }) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top/center
                threshold: 0
            }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (window.innerWidth < 1024) return null; // Hide on mobile

    return (
        <div style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'flex-end'
        }}>
            {/* HUD Line */}
            <div style={{
                position: 'absolute',
                right: '7px',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'rgba(255,255,255,0.1)',
                zIndex: -1
            }} />

            {sections.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                    <div
                        key={id}
                        onClick={() => scrollTo(id)}
                        className="nav-node"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            padding: '0.25rem 0',
                            position: 'relative',
                            height: '30px'
                        }}
                    >
                        {/* Label (Hidden unless active or hovered - handled by CSS group hover ideally, but doing inline/state for simplicity) */}
                        <span style={{
                            color: isActive ? 'var(--color-signal-white)' : 'var(--color-text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }} className="nav-label">
                            {label}
                        </span>

                        {/* Node Marker */}
                        <div style={{
                            width: '15px',
                            height: '15px',
                            border: isActive ? '1px solid var(--color-alert-red)' : '1px solid rgba(255,255,255,0.2)',
                            background: isActive ? 'rgba(228, 0, 40, 0.2)' : '#000',
                            transform: isActive ? 'rotate(45deg)' : 'rotate(45deg) scale(0.6)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {/* Center Dot */}
                            <div style={{
                                width: '3px',
                                height: '3px',
                                background: isActive ? 'var(--color-alert-red)' : 'transparent',
                                borderRadius: '50%'
                            }} />
                        </div>
                    </div>
                );
            })}

            <style>{`
                .nav-node:hover .nav-label {
                    opacity: 1 !important;
                    transform: translateX(0) !important;
                }
                .nav-node:hover > div {
                    border-color: var(--color-signal-white) !important;
                    transform: rotate(45deg) scale(0.9) !important;
                }
            `}</style>
        </div>
    );
};

export default InteractiveSideNav;
