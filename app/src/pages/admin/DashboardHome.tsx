import React from 'react';
import { DashboardWidgets } from '../../components/admin/DashboardWidgets';
import LeadTable from '../../components/admin/LeadTable';
import { usePageTitle } from '../../hooks/usePageTitle';

const DashboardHome: React.FC = () => {
    usePageTitle('Admin Dashboard');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DashboardWidgets />
            <LeadTable />
        </div>
    );
};

export default DashboardHome;
