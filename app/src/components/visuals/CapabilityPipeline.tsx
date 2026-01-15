import React from 'react';

const CapabilityPipeline: React.FC = () => {
    return (
        <div className="capability-pipeline">
            {/* Pipeline Track */}
            <div className="capability-track"></div>

            {/* Data Packet Animation */}
            <div className="capability-packet"></div>

            {/* Nodes */}
            {[
                { title: 'PUBLIC RECORDS SOURCES', sub: 'Fragmented - Noisy - Identity-ambiguous' },
                { title: 'ARRESTDELTA VERIFICATION LAYER', sub: 'Identity resolution - State verification - Confidence scoring' },
                { title: 'CLIENT SYSTEMS', sub: 'Alerts only when confidence thresholds are met' }
            ].map((node, i) => (
                <div key={i} className="panel capability-node">
                    <div className="text-mono text-red" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>0{i + 1}</div>
                    <div style={{ fontWeight: 'bold' }}>{node.title}</div>
                    <div className="text-muted text-mono" style={{ fontSize: '0.7rem', marginTop: 'auto' }}>{node.sub}</div>
                </div>
            ))}
        </div>
    );
};

export default CapabilityPipeline;
