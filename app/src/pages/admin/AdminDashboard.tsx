import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { DashboardWidgets } from '../../components/admin/DashboardWidgets';
import LeadTable from '../../components/admin/LeadTable';

const AdminDashboard: React.FC = () => {
    return (
        <AdminLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DashboardWidgets />
                <LeadTable />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
