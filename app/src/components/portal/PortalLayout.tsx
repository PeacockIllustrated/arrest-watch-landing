import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';
import { DemoSimProvider } from '../../context/DemoSimContext';
import '../../styles/portal.css';

export const PortalLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <DemoSimProvider>
            <div
                className="portal-root"
                style={{
                    display: 'flex',
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                }}
            >
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="portal-mobile-overlay"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            zIndex: 999,
                            backdropFilter: 'blur(2px)',
                        }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`portal-sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}
                    style={{
                        flexShrink: 0,
                        height: '100%',
                        zIndex: 1000,
                    }}
                >
                    <PortalSidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Main Content */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        minWidth: 0,
                    }}
                >
                    <PortalTopbar onMenuClick={() => setSidebarOpen(true)} />
                    <main
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '24px',
                            background: 'var(--bg-base)',
                        }}
                    >
                        <Outlet />
                    </main>
                </div>

                <style>{`
            /* Sidebar responsive behaviour */
            @media (max-width: 768px) {
              .portal-sidebar-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
              }
              .portal-sidebar-wrapper.open {
                transform: translateX(0);
              }
            }
            @media (min-width: 769px) {
              .portal-mobile-overlay {
                display: none !important;
              }
            }
          `}</style>
            </div>
        </DemoSimProvider>
    );
};

export default PortalLayout;


