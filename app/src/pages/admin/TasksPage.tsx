import React, { useState, useEffect } from 'react';
import TaskCard from '../../components/admin/TaskCard';
import type { Task, TaskCategory, TaskPriority } from '../../components/admin/TaskCard';
import { supabase } from '../../lib/supabase';
import NewTaskModal from '../../components/admin/NewTaskModal';

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | 'me' | 'michael'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // MOCK DATA GENERATOR (Fallback)
    const MOCK_TASKS: Task[] = [
        {
            id: '1', title: 'Integrate Facial Recognition API',
            description: 'Connect AWS Rekognition endpoints and handle errors.',
            category: 'technical', priority: 'critical', status: 'in_progress', assignee: 'michael',
            meta: { branch: 'feature/aws-rekog', env: 'PROD' }
        },
        {
            id: '2', title: 'Dashboard Widget UI',
            description: 'Update widgets to match new HUD style.',
            category: 'design', priority: 'high', status: 'pending', assignee: 'me'
        }
    ];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await supabase
            .from('project_tasks')
            .select('*')
            .eq('phase', 'Ad-hoc')
            .order('created_at', { ascending: false });

        if (data && data.length > 0) {
            // Transform DB data to Task interface
            const loadedTasks: Task[] = data.map((item: any) => {
                let meta: any = {};
                if (item.technical_details) {
                    try {
                        meta = JSON.parse(item.technical_details);
                    } catch (e) {
                        // usage default if parse fails
                    }
                }

                const category: TaskCategory = meta.category || (item.phase === 'Tech' ? 'technical' : 'general');
                const priority: TaskPriority = meta.priority || 'medium';
                const assignee = meta.assignee || 'me';

                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                    category,
                    priority,
                    assignee,
                    due_date: meta.due_date,
                    meta,
                    created_at: item.created_at
                };
            });
            setTasks(loadedTasks);
        } else {
            // Fallback to Mocks if DB is empty to show the UI
            setTasks(MOCK_TASKS);
        }
    };

    const handleToggleStatus = async (task: Task) => {
        const nextStatus = task.status === 'completed' ? 'pending' : 'completed';

        // Optimistic Update
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));

        const { error } = await supabase
            .from('project_tasks')
            .update({ status: nextStatus })
            .eq('id', task.id);

        if (error) {
            // Revert on error
            console.error('Error updating status', error);
            fetchTasks();
        }
    };

    const handleDelete = async (task: Task) => {
        if (!window.confirm(`Delete directive: ${task.title}?`)) return;

        // Optimistic Update
        setTasks(prev => prev.filter(t => t.id !== task.id));

        const { error } = await supabase
            .from('project_tasks')
            .delete()
            .eq('id', task.id);

        if (error) {
            console.error('Error deleting task', error);
            fetchTasks();
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        return t.assignee === filter;
    });

    // Grouping Logic: Critical/High first, then others
    const activeTasks = filteredTasks.filter(t => t.status !== 'completed');
    const completedTasks = filteredTasks.filter(t => t.status === 'completed');

    const criticalTasks = activeTasks.filter(t => t.priority === 'critical' || t.priority === 'high');
    const standardTasks = activeTasks.filter(t => t.priority !== 'critical' && t.priority !== 'high');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>MISSION CONTROL</h1>
                    <div style={{ fontFamily: "'Space Mono', monospace", color: '#888', fontSize: '0.9rem' }}>
                        ACTIVE DIRECTIVES: {activeTasks.length}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', background: '#111', border: '1px solid #333', borderRadius: '4px' }}>
                        {(['all', 'me', 'michael'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    background: filter === f ? '#e40028' : 'transparent',
                                    color: filter === f ? 'white' : '#666',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    fontFamily: "'Space Mono', monospace",
                                    transition: 'all 0.2s'
                                }}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: 'white',
                            color: 'black',
                            border: 'none',
                            padding: '0.5rem 1.5rem',
                            fontWeight: 'bold',
                            fontFamily: "'Space Mono', monospace",
                            cursor: 'pointer'
                        }}
                    >
                        + NEW TASK
                    </button>
                </div>
            </div>

            {/* Vertical Content Stack */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* 1. Critical Section */}
                {criticalTasks.length > 0 && (
                    <div className="task-section">
                        <h3 style={{ borderBottom: '1px solid #e40028', color: '#e40028', paddingBottom: '0.5rem', marginBottom: '0', fontSize: '0.8rem', letterSpacing: '1px' }}>IMMEDIATE ACTION REQUIRED</h3>
                        <div style={{ background: 'rgba(228, 0, 40, 0.05)', border: '1px solid rgba(228,0,40,0.1)' }}>
                            {criticalTasks.map(t => (
                                <TaskCard key={t.id} task={t} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. Standard Ops */}
                {standardTasks.length > 0 && (
                    <div className="task-section">
                        <h3 style={{ borderBottom: '1px solid #333', color: '#888', paddingBottom: '0.5rem', marginBottom: '0', fontSize: '0.8rem', letterSpacing: '1px' }}>OPERATIONAL DIRECTIVES</h3>
                        <div style={{ border: '1px solid #222' }}>
                            {standardTasks.map(t => (
                                <TaskCard key={t.id} task={t} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Completed (Collapsed/Dimmed) */}
                {completedTasks.length > 0 && (
                    <div className="task-section" style={{ opacity: 0.6 }}>
                        <h3 style={{ borderBottom: '1px solid #333', color: '#444', paddingBottom: '0.5rem', marginBottom: '0', fontSize: '0.8rem', letterSpacing: '1px' }}>ARCHIVE ({completedTasks.length})</h3>
                        <div style={{ border: '1px solid #222' }}>
                            {completedTasks.map(t => (
                                <TaskCard key={t.id} task={t} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTasks.length === 0 && completedTasks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#444', border: '1px dashed #333' }}>
                        NO ACTIVE DIRECTIVES. SYSTEMS NOMINAL.
                    </div>
                )}

            </div>

            <NewTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskAdded={fetchTasks}
            />
        </div>
    );
};

export default TasksPage;
