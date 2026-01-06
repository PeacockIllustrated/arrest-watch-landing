import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: { label: string; href?: string }[];
    actions?: React.ReactNode;
    style?: React.CSSProperties;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    breadcrumbs,
    actions,
    style,
}) => {
    return (
        <div
            style={{
                marginBottom: '24px',
                ...style,
            }}
        >
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav style={{ marginBottom: '8px' }}>
                    <ol
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                        }}
                    >
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <li style={{ color: 'var(--text-muted)' }}>/</li>
                                )}
                                <li>
                                    {crumb.href ? (
                                        <a
                                            href={crumb.href}
                                            style={{
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                transition: 'color 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                        >
                                            {crumb.label}
                                        </a>
                                    ) : (
                                        <span style={{ color: 'var(--text-primary)' }}>{crumb.label}</span>
                                    )}
                                </li>
                            </React.Fragment>
                        ))}
                    </ol>
                </nav>
            )}

            {/* Header content */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                <div>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: '1.5rem',
                            fontFamily: 'var(--font-head, inherit)',
                            fontWeight: 'var(--font-weight-bold, 600)' as unknown as number,
                            color: 'var(--text-primary)',
                            textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                            letterSpacing: 'var(--letter-spacing-tight, -0.02em)',
                        }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p
                            style={{
                                margin: '4px 0 0 0',
                                fontSize: '0.875rem',
                                fontFamily: 'var(--font-body, inherit)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
