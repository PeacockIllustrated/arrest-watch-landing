import React, { useState } from 'react';

export type TaskCategory = 'technical' | 'design' | 'research' | 'general';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    category: TaskCategory;
    priority: TaskPriority;
    assignee?: 'me' | 'michael';
    due_date?: string;
    meta?: any;
    created_at?: string;
}

interface TaskCardProps {
    task: Task;
    onToggleStatus: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { category, priority, status } = task;

    // --- Config ---
    const getPriorityColor = (p: TaskPriority) => {
        switch (p) {
            case 'critical': return '#ff0033';
            case 'high': return '#e40028';
            case 'medium': return '#ffcc00';
            case 'low': return '#00ccff';
            default: return '#888';
        }
    };
    const priorityColor = getPriorityColor(priority);
    const isCompleted = status === 'completed';

    // --- Metaphor Icons ---
    const getIcon = () => {
        if (category === 'technical') return '>';
        if (category === 'design') return '✦';
        if (category === 'research') return '?';
        return '#';
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
                borderBottom: '1px solid #222',
                background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                transition: 'background 0.2s',
                opacity: isCompleted ? 0.5 : 1,
                gap: '1rem',
                position: 'relative',
                fontFamily: "'Space Mono', monospace"
            }}
        >
            {/* Status Checkbox (Custom) */}
            <div
                onClick={(e) => { e.stopPropagation(); onToggleStatus(task); }}
                style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${isCompleted ? priorityColor : '#444'}`,
                    background: isCompleted ? priorityColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0
                }}
            >
                {isCompleted && <span style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }}>✓</span>}
            </div>

            {/* Icon / Category Identifier */}
            <div style={{
                color: priorityColor,
                width: '30px',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                flexShrink: 0
            }}>
                {getIcon()}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    color: isCompleted ? '#666' : '#e0e0e0',
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '0.9rem'
                }}>
                    {task.title}
                </div>
                {/* Meta Row: Only visible if space permits or on desktop, kept minimal */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.7rem',
                    color: '#555',
                    marginTop: '0.2rem',
                    flexWrap: 'wrap'
                }}>
                    <span>{category.toUpperCase()}</span>
                    <span>•</span>
                    <span>{priority.toUpperCase()}</span>
                    {task.assignee && (
                        <>
                            <span>•</span>
                            <span style={{ color: task.assignee === 'me' ? '#fff' : '#888' }}>@{task.assignee.toUpperCase()}</span>
                        </>
                    )}
                    {/* Extra Info Rendering */}
                    {task.meta && Object.entries(task.meta).map(([key, val]) => {
                        if (['category', 'priority', 'assignee', 'due_date'].includes(key)) return null;
                        return (
                            <span key={key} style={{ color: '#444', border: '1px solid #333', padding: '0 4px', borderRadius: '2px' }}>
                                {key}: {String(val)}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Hover Actions */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: isHovered ? 'auto' : 'none'
            }}>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(task); }}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#444',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '0.5rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#e40028'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#444'}
                >
                    [ DELETE ]
                </button>
            </div>

            {/* Priority Line Indicator (Left Border) */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2px',
                background: priorityColor,
                opacity: isHovered || !isCompleted ? 1 : 0.3
            }} />
        </div>
    );
};

export default TaskCard;
