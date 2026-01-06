import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fullWidth = false,
    id,
    style,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div style={{ width: fullWidth ? '100%' : 'auto' }}>
            {label && (
                <label
                    htmlFor={inputId}
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                    }}
                >
                    {label}
                </label>
            )}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {leftIcon && (
                    <span
                        style={{
                            position: 'absolute',
                            left: '12px',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {leftIcon}
                    </span>
                )}
                <input
                    id={inputId}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        paddingLeft: leftIcon ? '44px' : '16px',
                        paddingRight: rightIcon ? '44px' : '16px',
                        background: 'var(--input-bg)',
                        border: `1px solid ${error ? 'var(--danger)' : 'var(--input-border)'}`,
                        borderRadius: 'var(--border-radius, 0px)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono, var(--font-body, sans-serif))',
                        fontSize: '0.875rem',
                        letterSpacing: 'var(--letter-spacing-tight, -0.02em)',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        outline: 'none',
                        ...style,
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = error ? 'var(--danger)' : 'var(--accent)';
                        e.target.style.boxShadow = 'var(--glow-subtle, 0 0 15px rgba(228, 0, 40, 0.2))';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? 'var(--danger)' : 'var(--input-border)';
                        e.target.style.boxShadow = 'none';
                    }}
                    {...props}
                />
                {rightIcon && (
                    <span
                        style={{
                            position: 'absolute',
                            right: '12px',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
            {(error || hint) && (
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '0.75rem',
                        fontFamily: "'Roboto Mono', monospace",
                        color: error ? 'var(--danger)' : 'var(--text-muted)',
                    }}
                >
                    {error || hint}
                </p>
            )}
        </div>
    );
};

export default Input;

