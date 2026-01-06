import React from 'react';

interface ComingSoonProps {
    title?: string;
    description?: string;
    style?: React.CSSProperties;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
    title = 'Coming Soon',
    description = 'This feature is currently in development and will be available in a future release.',
    style,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '64px 24px',
                textAlign: 'center',
                background: 'var(--bg-surface)',
                border: '1px dashed var(--border-default)',
                borderRadius: '12px',
                ...style,
            }}
        >
            {/* Construction icon */}
            <div
                style={{
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    borderRadius: '50%',
                    background: 'var(--accent-muted)',
                    color: 'var(--accent)',
                }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            </div>
            <h3
                style={{
                    margin: '0 0 8px 0',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '400px',
                    lineHeight: 1.6,
                }}
            >
                {description}
            </p>
        </div>
    );
};

export default ComingSoon;
