import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskAdded: () => void;
    phases: string[];
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onTaskAdded, phases }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phase, setPhase] = useState(phases[0] || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('project_tasks')
            .insert([{ title, description, phase, status: 'pending' }]);

        setLoading(false);

        if (!error) {
            setTitle('');
            setDescription('');
            onTaskAdded();
            onClose();
        } else {
            alert('Error adding task: ' + error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                padding: '2rem',
                width: '400px',
                maxWidth: '90%'
            }}>
                <h2 style={{ color: 'white', marginBottom: '1.5rem', fontFamily: "'Space Mono', monospace" }}>ADD NEW DIRECTIVE</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>TASK TITLE</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                        />
                    </div>

                    <div>
                        <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>PHASE</label>
                        <input
                            type="text"
                            value={phase}
                            onChange={e => setPhase(e.target.value)}
                            list="phases-list"
                            required
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                        />
                        <datalist id="phases-list">
                            {phases.map(p => <option key={p} value={p} />)}
                        </datalist>
                    </div>

                    <div>
                        <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>DETAILS (OPTIONAL)</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white', resize: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #333', color: '#888', cursor: 'pointer' }}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ flex: 1, padding: '1rem', background: '#e40028', border: 'none', color: 'white', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'SAVING...' : 'CONFIRM'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
