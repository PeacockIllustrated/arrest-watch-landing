import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import type { Theme } from './ThemeProvider';
import { DeltaIcon, SunIcon, UberIcon, ContrastIcon } from './Icons';

const THEME_INFO: Record<Theme, { label: string; Icon: React.FC<{ size?: number; color?: string }> }> = {
    'intel-dark': { label: 'ArrestDelta', Icon: DeltaIcon },
    'intel-light': { label: 'Light Mode', Icon: SunIcon },
    'stealth': { label: 'Uber', Icon: UberIcon },
    'high-contrast': { label: 'High Contrast', Icon: ContrastIcon },
};

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme, themes } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const CurrentIcon = THEME_INFO[theme].Icon;

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Switch theme"
                aria-expanded={open}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    background: 'transparent',
                    border: '1px solid var(--border-default)',
                    borderRadius: '0px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.background = 'rgba(228, 0, 40, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                <CurrentIcon size={14} />
                <span style={{ color: 'var(--text-muted)' }}>Theme</span>
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease',
                    }}
                >
                    <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            </button>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '4px',
                        minWidth: '180px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '0px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        zIndex: 100,
                        overflow: 'hidden',
                    }}
                >
                    {themes.map((t) => {
                        const { Icon, label } = THEME_INFO[t];
                        return (
                            <button
                                key={t}
                                onClick={() => {
                                    setTheme(t);
                                    setOpen(false);
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    padding: '12px 16px',
                                    background: theme === t ? 'var(--accent-muted)' : 'transparent',
                                    border: 'none',
                                    borderLeft: theme === t ? '2px solid var(--accent)' : '2px solid transparent',
                                    color: theme === t ? 'var(--text-primary)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    textAlign: 'left',
                                    transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (theme !== t) {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (theme !== t) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                    }
                                }}
                            >
                                <Icon size={14} />
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;

