import React from 'react';
import { LEADERSHIP_BIOS, type LeadershipBio } from '../../lib/leadershipBios';
import founderImg from '../../assets/founder.png';
import cofounderImg from '../../assets/co-founder.png';

// Image map to resolve asset imports
const imageMap: Record<string, string> = {
    'founder.png': founderImg,
    'co-founder.png': cofounderImg,
};

/**
 * Monogram Avatar Component
 * Used as a placeholder for leaders without a photo (Mark Collins)
 */
const MonogramAvatar: React.FC<{ name: string }> = ({ name }) => {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(15,15,15,0.95) 100%)',
                border: '1px solid var(--color-grid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 15px rgba(228, 0, 40, 0.12)',
            }}
        >
            <span
                className="text-mono"
                style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                }}
            >
                {initials}
            </span>
        </div>
    );
};

/**
 * Styled Bio Component
 * Renders bio text with proper paragraph spacing and visual structure
 */
const StyledBio: React.FC<{ bio: string }> = ({ bio }) => {
    const paragraphs = bio.split('\n\n').filter(p => p.trim());

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {paragraphs.map((paragraph, idx) => (
                <p
                    key={idx}
                    style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.8,
                        color: idx === 0 ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)',
                        margin: 0,
                        paddingLeft: idx > 0 ? '1.25rem' : 0,
                        borderLeft: idx > 0 ? '2px solid rgba(228, 0, 40, 0.3)' : 'none',
                    }}
                >
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

/**
 * Accordion Chevron Component
 */
const AccordionChevron: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div
        style={{
            width: '32px',
            height: '32px',
            border: '1px solid var(--color-grid)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            background: isOpen ? 'rgba(228, 0, 40, 0.15)' : 'transparent',
            borderColor: isOpen ? 'var(--color-alert-red)' : 'var(--color-grid)',
        }}
    >
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? 'var(--color-alert-red)' : 'var(--color-text-muted)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke 0.3s ease' }}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    </div>
);

/**
 * Leadership Accordion Card Component
 * Collapsible card showing contact info, expanding to show full bio
 */
const LeadershipAccordionCard: React.FC<{ leader: LeadershipBio; index: number }> = ({ leader, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const imageSrc = leader.image ? imageMap[leader.image] : null;

    return (
        <article
            style={{
                position: 'relative',
                background: 'var(--glass-surface)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                transition: 'all 0.3s var(--ease-snap)',
                borderColor: isOpen ? 'rgba(228, 0, 40, 0.4)' : isHovered ? 'rgba(228, 0, 40, 0.25)' : 'var(--glass-border)',
                boxShadow: isOpen
                    ? '0 0 40px rgba(228, 0, 40, 0.1), inset 0 0 30px rgba(228, 0, 40, 0.02)'
                    : isHovered
                        ? '0 0 20px rgba(228, 0, 40, 0.05)'
                        : 'none',
                overflow: 'hidden',
            }}
        >
            {/* Corner Brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid var(--color-alert-red)', borderLeft: '2px solid var(--color-alert-red)', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid var(--color-alert-red)', borderRight: '2px solid var(--color-alert-red)', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid var(--color-alert-red)', borderLeft: '2px solid var(--color-alert-red)', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid var(--color-alert-red)', borderRight: '2px solid var(--color-alert-red)', zIndex: 1 }} />

            {/* Accordion Header - Always Visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    width: '100%',
                    padding: '1.75rem 2rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    textAlign: 'left',
                }}
            >
                {/* Photo or Monogram */}
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={leader.name}
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            border: '1px solid var(--color-grid)',
                            filter: 'grayscale(100%)',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                            boxShadow: isOpen ? '0 0 20px rgba(228, 0, 40, 0.2)' : 'none',
                        }}
                    />
                ) : (
                    <MonogramAvatar name={leader.name} />
                )}

                {/* Name, Role, Contact */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                        style={{
                            fontFamily: 'var(--font-head)',
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            color: 'var(--color-signal-white)',
                            marginBottom: '0.5rem',
                            textTransform: 'lowercase',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {leader.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span
                            style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '0.35rem 0.7rem',
                                border: '1px solid var(--color-alert-red)',
                                background: 'rgba(228, 0, 40, 0.1)',
                                color: 'var(--color-alert-red)',
                            }}
                        >
                            {leader.role}
                        </span>

                        {leader.email && (
                            <a
                                href={`mailto:${leader.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-mono"
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-alert-red)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                            >
                                <span style={{ fontSize: '0.9rem' }}>✉</span>
                                {leader.email}
                            </a>
                        )}
                    </div>
                </div>

                {/* Chevron */}
                <AccordionChevron isOpen={isOpen} />
            </button>

            {/* Accordion Content - Bio */}
            <div
                style={{
                    maxHeight: isOpen ? '1000px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease',
                    padding: isOpen ? '0 2rem 2rem 2rem' : '0 2rem',
                }}
            >
                <div
                    style={{
                        paddingTop: '1.5rem',
                        borderTop: '1px solid var(--color-grid)',
                    }}
                >
                    <StyledBio bio={leader.bio} />
                </div>
            </div>

            {/* Subtle glow line at bottom when open */}
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '20%',
                        right: '20%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--color-alert-red), transparent)',
                        opacity: 0.5,
                    }}
                />
            )}
        </article>
    );
};

/**
 * Leadership Bios Section
 * Full section component with header and vertically stacked accordion cards
 */
const LeadershipBiosSection: React.FC = () => {
    return (
        <section style={{ maxWidth: '900px', marginInline: 'auto', marginBottom: '4rem', marginTop: '3rem' }}>
            {/* Section Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '2px', background: 'var(--color-alert-red)' }} />
                <h2 className="text-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--color-signal-white)' }}>
                    LEADERSHIP
                </h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-grid)' }} />
            </div>

            {/* Subline */}
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '700px' }}>
                Operationally grounded leadership behind verified change.
            </p>

            {/* Leadership Accordion Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {LEADERSHIP_BIOS.map((leader, index) => (
                    <LeadershipAccordionCard key={leader.id} leader={leader} index={index} />
                ))}
            </div>
        </section>
    );
};

export default LeadershipBiosSection;
