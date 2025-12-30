import React from 'react';

const GlitchTitle: React.FC<{ text: string; size?: 'large' | 'huge'; color?: string }> = ({ text, size = 'large', color = 'white' }) => {
    const className = size === 'huge' ? 'text-huge' : 'text-large';

    return (
        <h2 className={`${className} glitch-text`} data-text={text} style={{
            color: color === 'red' ? 'var(--color-alert-red)' : 'var(--color-signal-white)',
            position: 'relative',
            display: 'inline-block'
        }}>
            {text}
        </h2>
    );
};

export default GlitchTitle;
