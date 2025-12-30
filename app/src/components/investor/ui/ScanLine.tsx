import React from 'react';

const ScanLine: React.FC<{ active?: boolean }> = ({ active = true }) => {
    if (!active) return null;
    return <div className="animate-scan"></div>;
};

export default ScanLine;
