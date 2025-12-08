import React from 'react';

interface TaskNodeProps {
    task: {
        id: string;
        title: string;
        status: 'pending' | 'in_progress' | 'completed';
        description?: string;
        technical_details?: string;
    };
    onClick: () => void;
}

const TaskNode: React.FC<TaskNodeProps> = ({ task, onClick }) => {
    const [expanded, setExpanded] = React.useState(false);

    const getStatusColor = () => {
        switch (task.status) {
            case 'completed': return '#e40028'; // Red
            case 'in_progress': return '#ffffff'; // White
            case 'pending': return '#333333'; // Dark Grey
            default: return '#333333';
        }
    };

    const isCompleted = task.status === 'completed';
    const isInProgress = task.status === 'in_progress';

    return (
        <div
            className="task-node"
            style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                opacity: task.status === 'pending' ? 0.7 : 1,
                transition: 'all 0.2s',
                padding: '0.5rem',
                border: isInProgress ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                background: isInProgress ? 'rgba(255,255,255,0.02)' : 'transparent'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={onClick}>
                {/* Node Circle */}
                <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: `2px solid ${getStatusColor()}`,
                    background: isCompleted ? getStatusColor() : 'transparent',
                    position: 'relative',
                    boxShadow: isInProgress ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                    flexShrink: 0
                }}>
                    {isInProgress && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '6px',
                            height: '6px',
                            background: 'white',
                            borderRadius: '50%',
                            animation: 'pulse 1s infinite'
                        }} />
                    )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.9rem',
                        color: isCompleted ? '#888' : 'white',
                        textDecoration: isCompleted ? 'line-through' : 'none'
                    }}>
                        {task.title}
                    </div>
                    {task.description && (
                        <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>
                            {task.description}
                        </div>
                    )}
                </div>

                {/* Expand Toggle */}
                {task.technical_details && (
                    <div
                        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                        style={{
                            color: '#e40028',
                            fontSize: '0.7rem',
                            border: '1px solid #333',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flexShrink: 0,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {expanded ? 'HIDE SPECS' : 'VIEW SPECS'}
                    </div>
                )}
            </div>

            {/* Technical Details */}
            {expanded && task.technical_details && (
                <div style={{
                    marginTop: '0.8rem',
                    marginLeft: '2rem',
                    padding: '0.8rem',
                    background: 'rgba(0,0,0,0.5)',
                    borderLeft: '2px solid #e40028',
                    color: '#aaa',
                    fontSize: '0.75rem',
                    fontFamily: "'Space Mono', monospace",
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.4'
                }}>
                    <div style={{ color: '#e40028', marginBottom: '0.4rem', fontSize: '0.65rem', textTransform: 'uppercase' }}>Technical Specifications</div>
                    {task.technical_details}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.5); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                .task-node:hover {
                    background: rgba(255,255,255,0.05) !important;
                }
            `}</style>
        </div>
    );
};

export default TaskNode;
