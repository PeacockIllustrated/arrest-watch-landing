import React from 'react';

const SettingsPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'white' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>SYSTEM SETTINGS</h2>
            <div style={{ padding: '2rem', border: '1px solid #333', background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-mono">CONFIGURATION ACCESS: RESTRICTED</p>
                <p className="text-muted" style={{ marginTop: '0.5rem' }}>Global system settings are locked by administrator policy.</p>
            </div>
        </div>
    );
};

export default SettingsPage;
