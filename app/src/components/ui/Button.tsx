import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
        background: 'var(--accent)',
        color: '#ffffff',
        border: '1px solid var(--accent)',
    },
    secondary: {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)',
    },
    ghost: {
        background: 'transparent',
        color: 'var(--text-muted)',
        border: '1px solid transparent',
    },
    danger: {
        background: 'transparent',
        color: 'var(--danger)',
        border: '1px solid var(--danger)',
    },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '0.7rem', gap: '6px' },
    md: { padding: '10px 20px', fontSize: '0.8rem', gap: '8px' },
    lg: { padding: '14px 28px', fontSize: '0.9rem', gap: '10px' },
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    style,
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            disabled={isDisabled}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--border-radius, 0px)',
                fontFamily: 'var(--font-mono, var(--font-body, sans-serif))',
                fontWeight: 'var(--font-weight-bold, 700)' as unknown as number,
                textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                letterSpacing: 'var(--letter-spacing-wide, 0.05em)',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                width: fullWidth ? '100%' : 'auto',
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!isDisabled) {
                    if (variant === 'primary') {
                        e.currentTarget.style.boxShadow = 'var(--glow-strong, 0 0 20px rgba(228, 0, 40, 0.4))';
                        e.currentTarget.style.background = 'var(--accent-hover)';
                    } else if (variant === 'secondary') {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.background = 'var(--accent-muted)';
                    } else if (variant === 'danger') {
                        e.currentTarget.style.background = 'var(--danger)';
                        e.currentTarget.style.color = '#ffffff';
                    }
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = variantStyles[variant].background as string;
                const borderValue = variantStyles[variant].border as string | undefined;
                e.currentTarget.style.borderColor = borderValue?.replace('1px solid ', '') || '';
                if (variant === 'danger') {
                    e.currentTarget.style.color = 'var(--danger)';
                }
            }}
            {...props}
        >
            {loading ? (
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid currentColor',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                    }}
                />
            ) : (
                <>
                    {leftIcon}
                    {children}
                    {rightIcon}
                </>
            )}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </button>
    );
};

export default Button;

