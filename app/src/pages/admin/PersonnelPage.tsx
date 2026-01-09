import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import TimelinePhase from '../../components/admin/TimelinePhase';
import AddTaskModal from '../../components/admin/AddTaskModal';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    phase: string;
    order_index: number;
    technical_details?: string;
}

const PersonnelPage: React.FC = () => {
    usePageTitle('Timeline');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('project_tasks')
            .select('*')
            .neq('phase', 'Ad-hoc')
            .order('phase', { ascending: true })
            .order('order_index', { ascending: true });

        if (data) setTasks(data as Task[]);
        setLoading(false);
    };

    const handleTaskClick = async (task: Task) => {
        // Cycle status: pending -> in_progress -> completed -> pending
        const nextStatus = task.status === 'pending' ? 'in_progress'
            : task.status === 'in_progress' ? 'completed'
                : 'pending';

        // Optimistic update
        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));

        await supabase.from('project_tasks').update({ status: nextStatus }).eq('id', task.id);
    };

    // Group tasks by phase and sort alphabetically
    const phases = Array.from(new Set(tasks.map(t => t.phase))).sort();
    // Ensure we have at least one phase if empty
    if (phases.length === 0 && tasks.length === 0) phases.push('Phase 1: Initialization');

    // Calculate Stats for Progress Bar
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

    // Avoid division by zero
    const pctCompleted = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pctInProgress = totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

            {/* Dynamic Progress Bar */}
            <div style={{ padding: '0 1rem 1rem 0' }}>
                <div style={{ height: '20px', width: '100%', background: '#333', position: 'relative', marginBottom: '0.5rem' }}>
                    {/* Completed (Red) */}
                    <div style={{
                        height: '100%',
                        width: `${pctCompleted}%`,
                        background: '#e40028',
                        position: 'absolute',
                        left: 0,
                        transition: 'width 0.5s ease-out'
                    }}></div>

                    {/* In Progress (White) */}
                    <div style={{
                        height: '100%',
                        width: `${pctInProgress}%`,
                        background: '#fff',
                        position: 'absolute',
                        left: `${pctCompleted}%`,
                        transition: 'width 0.5s ease-out, left 0.5s ease-out'
                    }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: "'Space Mono', monospace", color: '#666' }}>
                    <span>PROGRESS: {Math.round(pctCompleted + pctInProgress)}%</span>
                    <span>TARGET: LAUNCH</span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                paddingRight: '1rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', color: 'white' }}>PROJECT TIMELINE</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'rgba(228, 0, 40, 0.1)',
                        border: '1px solid #e40028',
                        color: '#e40028',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.8rem'
                    }}
                >
                    + ADD DIRECTIVE
                </button>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '0 1rem 2rem 0', // Added right padding for scrollbar space
            }} className="brand-scroll-container">
                {loading ? (
                    <div style={{ padding: '2rem', color: '#666' }}>LOADING TIMELINE DATA...</div>
                ) : (
                    phases.map(phase => (
                        <TimelinePhase
                            key={phase}
                            phaseName={phase}
                            tasks={tasks.filter(t => t.phase === phase)}
                            onTaskClick={handleTaskClick}
                        />
                    ))
                )}
            </div>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskAdded={fetchTasks}
                phases={phases}
            />
        </div>
    );
};

export default PersonnelPage;
