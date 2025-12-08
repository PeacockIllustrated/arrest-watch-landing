import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { TaskCategory, TaskPriority } from './TaskCard';

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskAdded: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<TaskCategory>('general');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [assignee, setAssignee] = useState<'me' | 'michael'>('me');
    const [extraInfo, setExtraInfo] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);
    const [loading, setLoading] = useState(false);

    const handleAddExtra = () => {
        setExtraInfo([...extraInfo, { key: '', value: '' }]);
    };

    const handleExtraChange = (index: number, field: 'key' | 'value', val: string) => {
        const newExtra = [...extraInfo];
        newExtra[index][field] = val;
        setExtraInfo(newExtra);
    };

    const handleRemoveExtra = (index: number) => {
        setExtraInfo(extraInfo.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty rows
        const validExtra = extraInfo.filter(x => x.key.trim() && x.value.trim());
        const extraObj = validExtra.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

        // Serialize advanced fields into technical_details
        const metaData = {
            category,
            priority,
            assignee,
            ...extraObj
        };

        const { error } = await supabase
            .from('project_tasks')
            .insert([{
                title,
                description,
                phase: 'Ad-hoc',
                status: 'pending',
                technical_details: JSON.stringify(metaData),
                order_index: 999
            }]);

        setLoading(false);

        if (!error) {
            setTitle('');
            setDescription('');
            setExtraInfo([{ key: '', value: '' }]);
            onTaskAdded();
            onClose();
        } else {
            console.error('Error adding task:', error);
            alert('Error adding task: ' + error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                padding: '2rem',
                width: '600px',
                maxWidth: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: 'white', margin: 0, fontFamily: "'Space Mono', monospace" }}>ISSUING DIRECTIVE</h2>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: NEW</div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {/* Title */}
                    <div>
                        <label style={{ color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>DIRECTIVE TITLE</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            autoFocus
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {/* Category */}
                        <div>
                            <label style={{ color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>CATEGORY</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value as TaskCategory)}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                            >
                                <option value="general">GENERAL</option>
                                <option value="technical">TECHNICAL</option>
                                <option value="design">DESIGN</option>
                                <option value="research">RESEARCH</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label style={{ color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>PRIORITY</label>
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value as TaskPriority)}
                                style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white' }}
                            >
                                <option value="low">LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                                <option value="critical">CRITICAL</option>
                            </select>
                        </div>
                    </div>

                    {/* Assignee */}
                    <div>
                        <label style={{ color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>ASSIGNEE</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {['me', 'michael'].map(person => (
                                <button
                                    key={person}
                                    type="button"
                                    onClick={() => setAssignee(person as 'me' | 'michael')}
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem',
                                        background: assignee === person ? '#e40028' : '#111',
                                        color: assignee === person ? 'white' : '#666',
                                        border: '1px solid #333',
                                        cursor: 'pointer',
                                        fontFamily: "'Space Mono', monospace"
                                    }}
                                >
                                    @{person.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <label style={{ color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>DETAILS</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '0.8rem', background: '#111', border: '1px solid #333', color: 'white', resize: 'none' }}
                        />
                    </div>

                    {/* Extra Info */}
                    <div>
                        <label style={{ color: '#888', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                            <span>EXTRA INTEL</span>
                            <button type="button" onClick={handleAddExtra} style={{ background: 'transparent', border: 'none', color: '#e40028', cursor: 'pointer', fontSize: '0.7rem' }}>+ ADD FIELD</button>
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {extraInfo.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        placeholder="KEY (e.g. Branch)"
                                        value={item.key}
                                        onChange={e => handleExtraChange(idx, 'key', e.target.value)}
                                        style={{ flex: 1, background: '#111', border: '1px solid #333', color: 'white', padding: '0.5rem', fontSize: '0.8rem' }}
                                    />
                                    <input
                                        placeholder="VALUE (e.g. feat/auth)"
                                        value={item.value}
                                        onChange={e => handleExtraChange(idx, 'value', e.target.value)}
                                        style={{ flex: 2, background: '#111', border: '1px solid #333', color: 'white', padding: '0.5rem', fontSize: '0.8rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExtra(idx)}
                                        style={{ background: 'transparent', border: '1px solid #333', color: '#666', cursor: 'pointer', padding: '0 0.5rem' }}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #333', color: '#888', cursor: 'pointer' }}
                        >
                            ABORT
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ flex: 1, padding: '1rem', background: '#e40028', border: 'none', color: 'white', cursor: 'pointer', opacity: loading ? 0.7 : 1, fontFamily: "'Space Mono', monospace", fontWeight: 'bold' }}
                        >
                            {loading ? 'TRANSMITTING...' : 'ISSUE DIRECTIVE'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTaskModal;
