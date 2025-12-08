import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

// --- Types ---
interface Lead {
    id: string;
    created_at: string;
    name: string;
    organization: string;
}

interface VelocityBucket {
    count: number;
    label: string;
    dateRange: string;
}

// --- Components ---

const StatCard: React.FC<{ title: string; children: React.ReactNode; colSpan?: number }> = ({ title, children, colSpan = 1 }) => (
    <div className="stat-card" style={{
        border: '1px solid #333',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gridColumn: `span ${colSpan}`,
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            fontSize: '0.7rem',
            color: '#666',
            marginBottom: '1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
        }}>
            {title}
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
            {children}
        </div>
        {/* Corner Accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '1px solid #e40028', borderRight: '1px solid #e40028', opacity: 0.5 }} />
    </div>
);

export const DashboardWidgets: React.FC = () => {
    const [totalLeads, setTotalLeads] = useState<number>(0);
    const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
    const [velocityData, setVelocityData] = useState<VelocityBucket[]>([]);
    const [taskStats, setTaskStats] = useState({ completed: 0, inProgress: 0, total: 0 });
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        // 1. System Status (Ping) & Total Leads
        const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true });
        if (!error && count !== null) setTotalLeads(count);

        // 2. Recent Intercepts
        const { data: recent } = await supabase
            .from('leads')
            .select('id, created_at, name, organization')
            .order('created_at', { ascending: false })
            .limit(5);
        if (recent) setRecentLeads(recent);

        // 3. Lead Velocity (Real Data)
        const { data: timestamps } = await supabase
            .from('leads')
            .select('created_at')
            .order('created_at', { ascending: false })
            .limit(100);

        if (timestamps) {
            const now = new Date().getTime();
            // Default lookback 24h if no data, or start from oldest data point
            const oldest = timestamps.length > 0 ? new Date(timestamps[timestamps.length - 1].created_at).getTime() : now - 86400000;
            const range = Math.max(now - oldest, 1000);
            const bucketSize = range / 20;

            // Initialize buckets with time labels
            const buckets: VelocityBucket[] = new Array(20).fill(0).map((_, i) => {
                const startTime = new Date(oldest + i * bucketSize);
                // Simple formatting: HH:MM if recent, otherwise MM/DD
                const label = range < 86400000
                    ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : startTime.toLocaleDateString([], { month: 'short', day: 'numeric' });

                return {
                    count: 0,
                    label: label,
                    dateRange: startTime.toLocaleString()
                };
            });

            timestamps.forEach(t => {
                const time = new Date(t.created_at).getTime();
                const diff = time - oldest;
                const bucketIndex = Math.floor(diff / bucketSize);
                if (bucketIndex >= 0 && bucketIndex < 20) buckets[bucketIndex].count++;
                else if (bucketIndex >= 20) buckets[19].count++; // Catch edge case for 'now'
            });
            setVelocityData(buckets);
        }

        // 4. Project Progress Stats
        const { data: tasks } = await supabase
            .from('project_tasks')
            .select('status');

        if (tasks) {
            const total = tasks.length;
            const completed = tasks.filter(t => t.status === 'completed').length;
            const inProgress = tasks.filter(t => t.status === 'in_progress').length;
            setTaskStats({ completed, inProgress, total });
        }
    };

    // Calculate Percentages for Progress Circle
    const pctCompleted = taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0;
    const pctInProgress = taskStats.total > 0 ? (taskStats.inProgress / taskStats.total) * 100 : 0;

    return (
        <div className="dashboard-widgets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>

            {/* 1. Lead Velocity Graph */}
            <StatCard title="LEAD VELOCITY (ACTIVITY DENSITY)" colSpan={2}>
                <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '5px', position: 'relative' }}>
                    {velocityData.length > 0 ? velocityData.map((bucket, i) => {
                        const counts = velocityData.map(b => b.count);
                        const max = Math.max(...counts, 1);
                        const height = (bucket.count / max) * 100;
                        const isHovered = hoveredBar === i;

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredBar(i)}
                                onMouseLeave={() => setHoveredBar(null)}
                                style={{
                                    flex: 1,
                                    height: `${Math.max(height, 5)}%`, // Min height 5% for visibility
                                    background: isHovered ? '#ff3355' : '#e40028',
                                    opacity: isHovered ? 1 : (0.3 + (bucket.count / max) * 0.7),
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            />
                        );
                    }) : (
                        <div style={{ color: '#666', fontSize: '0.8rem', width: '100%', textAlign: 'center', alignSelf: 'center' }}>
                            INSUFFICIENT DATA FOR ANALYSIS
                        </div>
                    )}

                    {/* Tooltip Overlay */}
                    {hoveredBar !== null && velocityData[hoveredBar] && (
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            left: '50%', // Centered roughly (simplified)
                            transform: 'translateX(-50%)',
                            background: '#000',
                            border: '1px solid #e40028',
                            padding: '0.3rem 0.6rem',
                            fontSize: '0.7rem',
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                            pointerEvents: 'none',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center'
                        }}>
                            <span style={{ color: '#888' }}>{velocityData[hoveredBar].label}</span>
                            <span style={{ fontWeight: 'bold', color: '#e40028' }}>{velocityData[hoveredBar].count} LEADS</span>
                        </div>
                    )}
                </div>
            </StatCard>

            {/* 2. Total Intel */}
            <StatCard title="TOTAL INTEL">
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e40028', lineHeight: 1 }}>
                    {totalLeads}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                    RECORDS SECURED
                </div>
            </StatCard>

            {/* 3. Project Progress */}
            <StatCard title="PROJECT PROGRESS">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                        <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                            {/* Track (Pending/Background) */}
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#222"
                                strokeWidth="3"
                            />
                            {/* In Progress Segment (Grey) */}
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#666"
                                strokeWidth="3"
                                strokeDasharray={`${pctInProgress}, 100`}
                                strokeDashoffset={-pctCompleted} // Starts after completed segment
                                style={{ transition: 'stroke-dasharray 0.5s' }}
                            />
                            {/* Completed Segment (Red) */}
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e40028"
                                strokeWidth="3"
                                strokeDasharray={`${pctCompleted}, 100`}
                                strokeDashoffset="0"
                                style={{ transition: 'stroke-dasharray 0.5s' }}
                            />
                        </svg>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: "'Space Mono', monospace"
                        }}>
                            {Math.round(pctCompleted)}%
                        </div>
                    </div>
                </div>
            </StatCard>

            {/* 4. Recent Intercepts Feed */}
            <StatCard title="RECENT INTERCEPTS" colSpan={4}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {recentLeads.map((lead) => (
                        <div key={lead.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            paddingBottom: '0.2rem'
                        }}>
                            <span style={{ color: '#e40028' }}>{lead.organization || 'UNKNOWN'}</span>
                            <span style={{ color: '#666' }}>{new Date(lead.created_at).toLocaleTimeString()}</span>
                        </div>
                    ))}
                    {recentLeads.length === 0 && <div style={{ color: '#666', fontSize: '0.8rem' }}>NO RECENT ACTIVITY</div>}
                </div>
            </StatCard>
        </div>
    );
};
