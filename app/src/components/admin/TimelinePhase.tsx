import React from 'react';
import TaskNode from './TaskNode';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    phase: string;
    order_index: number;
}

interface TimelinePhaseProps {
    phaseName: string;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const TimelinePhase: React.FC<TimelinePhaseProps> = ({ phaseName, tasks, onTaskClick }) => {
    return (
        <div style={{
            width: '100%',
            borderLeft: '1px solid #333',
            padding: '0 0 0 2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            {/* Phase Header */}
            <div style={{
                marginBottom: '1rem',
                borderBottom: '1px solid #333',
                paddingBottom: '0.5rem'
            }}>
                <h3 style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '1rem',
                    color: '#e40028',
                    letterSpacing: '1px'
                }}>
                    {phaseName.toUpperCase()}
                </h3>
            </div>

            {/* Tasks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map(task => (
                    <TaskNode
                        key={task.id}
                        task={task}
                        onClick={() => onTaskClick(task)}
                    />
                ))}
                {tasks.length === 0 && (
                    <div style={{ color: '#444', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        NO TASKS ASSIGNED
                    </div>
                )}
            </div>

            {/* Connector Line (Visual Decoration) */}
            <div style={{
                position: 'absolute',
                left: '-1px',
                top: '0',
                bottom: '0',
                width: '1px',
                background: 'linear-gradient(to bottom, #e40028 0%, transparent 100%)',
                opacity: 0.5
            }} />
        </div>
    );
};

export default TimelinePhase;
