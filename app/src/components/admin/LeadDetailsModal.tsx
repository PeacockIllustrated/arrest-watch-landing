import React from 'react';

interface Lead {
    id: string;
    created_at: string;
    name: string;
    organization: string;
    email: string;
    employee_count: string;
    message: string;
}

interface LeadDetailsModalProps {
    lead: Lead;
    onClose: () => void;
    onDelete: (id: string) => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ lead, onClose, onDelete }) => {
    const handleDelete = async () => {
        if (!window.confirm('CONFIRM PURGE? This action is irreversible.')) return;
        await onDelete(lead.id);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                width: '600px',
                maxWidth: '90%',
                background: '#0a0a0a',
                border: '1px solid #333',
                position: 'relative',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <div style={{ fontSize: '1.2rem', color: '#e40028', letterSpacing: '1px' }}>
                        DOSSIER // {lead.organization.toUpperCase()}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#666',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            lineHeight: 1
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', display: 'grid', gap: '1.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>IDENTITY</label>
                            <div style={{ fontSize: '1.1rem', color: 'white' }}>{lead.name}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>TIMESTAMP</label>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>{new Date(lead.created_at).toLocaleString()}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>CONTACT</label>
                            <div style={{ fontSize: '0.9rem', color: '#e40028' }}>{lead.email}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>WORKFORCE</label>
                            <div style={{ fontSize: '0.9rem', color: 'white' }}>{lead.employee_count}</div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>TRANSMISSION</label>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            border: '1px solid #333',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            color: '#ccc',
                            minHeight: '100px',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {lead.message || "NO MESSAGE CONTENT"}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: '1px solid #333',
                            color: '#888',
                            padding: '0.8rem 1.5rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: '0.8rem'
                        }}
                    >
                        CLOSE
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{
                            background: '#e40028',
                            border: 'none',
                            color: 'white',
                            padding: '0.8rem 1.5rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        PURGE RECORD
                    </button>
                </div>

                {/* Corner Accents */}
                <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: '2px solid #e40028', borderLeft: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: '2px solid #e40028', borderRight: '2px solid #e40028' }} />

            </div>
        </div>
    );
};

export default LeadDetailsModal;
