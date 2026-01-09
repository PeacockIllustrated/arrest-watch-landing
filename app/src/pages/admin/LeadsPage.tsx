import React from 'react';
import LeadTable from '../../components/admin/LeadTable';
import { usePageTitle } from '../../hooks/usePageTitle';

const LeadsPage: React.FC = () => {
    usePageTitle('Leads');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>LEAD DATABASE</h2>
            <LeadTable />
        </div>
    );
};

export default LeadsPage;
