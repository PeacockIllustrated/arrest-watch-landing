import React, { useEffect, useState } from 'react';

interface TextDecryptProps {
    text: string;
    className?: string; // e.g. "text-huge"
    style?: React.CSSProperties;
    startDelay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const TextDecrypt: React.FC<TextDecryptProps> = ({ text, className, style, startDelay = 0 }) => {
    const [displayedText, setDisplayedText] = useState(
        text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!started) return;

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayedText(() =>
                text.split('').map((char, i) => {
                    if (i < iterations) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('')
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 2; // Speed of decoding
        }, 30);

        return () => clearInterval(interval);
    }, [text, started]);

    // Initial flicker/scramble before start
    useEffect(() => {
        if (started) return;
        const interval = setInterval(() => {
            setDisplayedText(text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
        }, 100);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <span className={className} style={{ display: 'inline-block', ...style }}>
            {displayedText}
        </span>
    );
};

export default TextDecrypt;
