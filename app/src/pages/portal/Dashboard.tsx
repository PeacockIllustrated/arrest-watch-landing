import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, CardHeader, CardBody, Badge, SkeletonCard } from '../../components/ui';
import { SearchIcon, ListIcon, ChartIcon, PersonIcon } from '../../components/portal/Icons';
import DeepMapViz from '../../components/visuals/DeepMapViz';
import { usePageTitle } from '../../hooks/usePageTitle';

// =============================================================================
// TYPES - Ready for Supabase integration
// =============================================================================

interface DashboardStats {
    total_employees: number;
    open_incidents: number;
    active_alerts: number;
    risk_flags: number;
}

interface RecentIncident {
    id: string;
    employee_name: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    time: string;
}

// =============================================================================
// MOCK DATA - Replace with Supabase queries
// TODO: Connect to Supabase for real-time dashboard data
// =============================================================================

const mockStats: DashboardStats = {
    total_employees: 156,
    open_incidents: 12,
    active_alerts: 47,
    risk_flags: 8,
};

const mockRecentIncidents: RecentIncident[] = [
    { id: 'inc-001', employee_name: 'John Michael Smith', type: 'Arrest', severity: 'critical', time: '2 mins ago' },
    { id: 'inc-002', employee_name: 'Maria Garcia', type: 'Warrant', severity: 'high', time: '15 mins ago' },
    { id: 'inc-003', employee_name: 'Jane Anne Doe', type: 'Booking', severity: 'medium', time: '1 hour ago' },
    { id: 'inc-004', employee_name: 'Robert Wilson', type: 'Traffic Violation', severity: 'low', time: '2 hours ago' },
];

// =============================================================================
// QUICK ACTIONS
// =============================================================================

const quickActions = [
    { Icon: SearchIcon, label: 'Database Search', desc: 'Search criminal records', path: '/portal/database-search' },
    { Icon: PersonIcon, label: 'Add Employee', desc: 'Register new employee', path: '/portal/employees' },
    { Icon: ChartIcon, label: 'Generate Report', desc: 'Export compliance data', path: '/portal/reports' },
    { Icon: ListIcon, label: 'Risk Assessment', desc: 'Review risk factors', path: '/portal/risk-assessment' },
];

// =============================================================================
// COMPONENT
// =============================================================================

const Dashboard: React.FC = () => {
    usePageTitle('Dashboard');
    const navigate = useNavigate();
    const [loading] = React.useState(false);

    // Stats display configuration aligned with MVP
    const statsDisplay = [
        { label: 'Total Employees', value: mockStats.total_employees.toLocaleString(), change: '+12', positive: true },
        { label: 'Open Incidents', value: mockStats.open_incidents.toString(), change: '+3', positive: false },
        { label: 'Active Alerts', value: mockStats.active_alerts.toString(), change: '+8', positive: false },
        { label: 'Risk Flags', value: mockStats.risk_flags.toString(), change: '-2', positive: true },
    ];

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Real-time overview of workforce safety and compliance intelligence"
            />

            {/* Map Section - Full Width, visible on all screens */}
            <div className="dashboard-map-section" style={{ marginBottom: '24px' }}>
                <Card style={{ overflow: 'hidden', padding: 0 }}>
                    {/* 
                        DeepMapViz - KEEP INTACT
                        Props available for future real data:
                        - incidents?: Incident[] - Array of incidents to display as markers
                        - employees?: Employee[] - Array of employees for location overlay
                        - heatmapData?: HeatmapPoint[] - For risk heatmap visualization
                        - onMarkerClick?: (id: string, type: 'incident' | 'employee') => void
                    */}
                    <DeepMapViz
                        isScanning={true}
                        height="28rem"
                        onStateSelect={() => { }}
                        onCountySelect={() => { }}
                    />
                </Card>
            </div>

            {/* Stats Grid - MVP KPIs */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                }}
                className="stats-grid"
            >
                {statsDisplay.map((stat) => (
                    <Card key={stat.label} padding="md">
                        <CardBody>
                            <div style={{
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-body, inherit)',
                                textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                                letterSpacing: '0.05em',
                                color: 'var(--text-muted)',
                                marginBottom: '8px'
                            }}>
                                {stat.label}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{
                                    fontSize: '2rem',
                                    fontFamily: 'var(--font-body, inherit)',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)'
                                }}>
                                    {stat.value}
                                </span>
                                <span
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: 'var(--font-body, inherit)',
                                        color: stat.positive ? 'var(--success)' : 'var(--danger)',
                                    }}
                                >
                                    {stat.change}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Content Grid: Recent Incidents + Quick Actions */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                }}
                className="alerts-actions-grid"
            >
                {/* Recent Incidents (replaces Recent Alerts) */}
                <Card>
                    <CardHeader actions={<Badge variant="accent" dot>Live</Badge>}>
                        Recent Incidents
                    </CardHeader>
                    <CardBody cardPadding="0">
                        {loading ? (
                            <div style={{ padding: '16px' }}>
                                <SkeletonCard />
                            </div>
                        ) : (
                            <div>
                                {mockRecentIncidents.map((incident) => (
                                    <div
                                        key={incident.id}
                                        onClick={() => navigate(`/portal/incidents/${incident.id}`)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '14px 16px',
                                            borderBottom: '1px solid var(--border-subtle)',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--sidebar-item-hover)';
                                            e.currentTarget.style.borderLeft = '2px solid var(--accent)';
                                            e.currentTarget.style.paddingLeft = '14px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderLeft = 'none';
                                            e.currentTarget.style.paddingLeft = '16px';
                                        }}
                                    >
                                        <div>
                                            <div style={{
                                                fontFamily: 'var(--font-body, inherit)',
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                marginBottom: '2px'
                                            }}>
                                                {incident.employee_name}
                                            </div>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                fontFamily: 'var(--font-body, inherit)',
                                                color: 'var(--text-muted)',
                                                textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                                            }}>
                                                {incident.type} • {incident.time}
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                incident.severity === 'critical' ? 'danger' :
                                                    incident.severity === 'high' ? 'warning' :
                                                        incident.severity === 'medium' ? 'info' : 'default'
                                            }
                                            size="sm"
                                        >
                                            {incident.severity}
                                        </Badge>
                                    </div>
                                ))}
                                <div style={{ padding: '12px 16px', textAlign: 'center' }}>
                                    <a
                                        href="/portal/incidents"
                                        style={{
                                            color: 'var(--accent)',
                                            fontSize: '0.75rem',
                                            fontFamily: 'var(--font-body, inherit)',
                                            textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                                            letterSpacing: '0.05em',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        View all incidents →
                                    </a>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>

                {/* Quick Actions - MVP aligned */}
                <Card>
                    <CardHeader>Quick Actions</CardHeader>
                    <CardBody>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {quickActions.map((action) => (
                                <div
                                    key={action.label}
                                    onClick={() => navigate(action.path)}
                                    style={{
                                        padding: '16px',
                                        background: 'transparent',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--border-radius, 0px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.background = 'var(--accent-muted)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <div style={{
                                        marginBottom: '12px',
                                        color: 'var(--accent)'
                                    }}>
                                        <action.Icon size={24} />
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-body, inherit)',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        marginBottom: '4px',
                                        fontSize: '0.8rem',
                                        textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                                        letterSpacing: '0.02em'
                                    }}>
                                        {action.label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        fontFamily: 'var(--font-body, inherit)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {action.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Activity Timeline Placeholder */}
            <Card style={{ marginTop: '24px' }}>
                <CardHeader>Activity Timeline</CardHeader>
                <CardBody>
                    <div style={{
                        padding: '32px',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        border: '1px dashed var(--border-default)',
                        borderRadius: '8px',
                    }}>
                        <span style={{ color: 'var(--accent)' }}><ChartIcon size={32} /></span>
                        <p style={{ margin: '12px 0 0 0', fontWeight: 500 }}>Activity Timeline & Trends</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>Coming soon - Real-time activity feed and trend analysis</p>
                    </div>
                </CardBody>
            </Card>

            {/* TODO placeholder */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--info-muted)', borderRadius: '0px', border: '1px solid var(--info)' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body, inherit)',
                    textTransform: 'uppercase',
                    color: 'var(--info)'
                }}>
                    <strong>TODO:</strong> Connect dashboard stats and recent incidents to Supabase with real-time subscriptions
                </p>
            </div>

            <style>{`
                @media (max-width: 1200px) {
                    .dashboard-map-section {
                        /* Map is now visible on all screen sizes, just smaller */
                    }
                    .dashboard-map-section .card {
                        max-height: 200px;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 900px) {
                    .alerts-actions-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
