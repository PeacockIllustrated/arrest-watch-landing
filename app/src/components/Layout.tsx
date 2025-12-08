import React from 'react';
import { Outlet } from 'react-router-dom';
import Cursor from './Cursor';

const Layout: React.FC = () => {
    return (
        <>
            <Cursor />
            <div className="bg-grid"></div>
            <Outlet />
        </>
    );
};

export default Layout;
