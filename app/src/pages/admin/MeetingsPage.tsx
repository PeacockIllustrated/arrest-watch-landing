/**
 * MeetingsPage - Admin page for managing meeting requests
 */

import React, { useState } from 'react';
import { useAdminNotifications } from '../../hooks/useAdminNotifications';

// ============ ICONS ============
const CalendarIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const RefreshIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
);



function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

const MeetingsPage: React.FC = () => {
    const { notifications, loading, refresh, markAsRead } = useAdminNotifications();
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread'>('all');

    // Filter for meeting requests only
    const meetingRequests = notifications.filter(n => n.type === 'meeting_request');

    // Apply secondary filters
    const filteredRequests = meetingRequests.filter(req => {
        if (statusFilter === 'unread') return !req.is_read;
        return true;
    });

    const unreadCount = meetingRequests.filter(n => !n.is_read).length;

    const handleMarkDone = async (id: string) => {
        await markAsRead(id);
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{
                        color: '#fff',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <CalendarIcon size={24} />
                        Meeting Requests
                    </h1>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        Manage inbound meeting requests from the Data Room
                    </p>
                </div>

                <button
                    onClick={refresh}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        border: '1px solid #e40028',
                        color: '#e40028',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer'
                    }}
                >
                    <RefreshIcon size={14} /> REFRESH
                </button>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid #222',
                paddingBottom: '1rem'
            }}>
                <button
                    onClick={() => setStatusFilter('all')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: statusFilter === 'all' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                        border: `1px solid ${statusFilter === 'all' ? '#e40028' : '#333'}`,
                        color: statusFilter === 'all' ? '#e40028' : '#666',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    ALL REQUESTS ({meetingRequests.length})
                </button>
                <button
                    onClick={() => setStatusFilter('unread')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: statusFilter === 'unread' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                        border: `1px solid ${statusFilter === 'unread' ? '#e40028' : '#333'}`,
                        color: statusFilter === 'unread' ? '#e40028' : '#666',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    UNREAD ({unreadCount})
                </button>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontFamily: 'var(--font-mono)' }}>
                        LOADING...
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: '#666',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid #333',
                        fontFamily: 'var(--font-mono)'
                    }}>
                        NO MEETING REQUESTS FOUND
                    </div>
                ) : (
                    filteredRequests.map(req => (
                        <div
                            key={req.id}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${req.is_read ? '#333' : '#e40028'}`,
                                padding: '1.5rem',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            {!req.is_read && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: '#e40028',
                                    color: 'white',
                                    fontSize: '0.6rem',
                                    padding: '0.2rem 0.5rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.05em'
                                }}>
                                    NEW
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                        {req.user_email || 'Unknown User'}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                                        {formatDate(req.created_at)}
                                    </div>
                                </div>

                                {!req.is_read && (
                                    <button
                                        onClick={() => handleMarkDone(req.id)}
                                        style={{
                                            background: 'rgba(76, 175, 80, 0.15)',
                                            border: '1px solid #4CAF50',
                                            color: '#4CAF50',
                                            padding: '0.4rem 0.8rem',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-mono)',
                                            marginRight: req.is_read ? 0 : '3rem' // Make space for badge if needed
                                        }}
                                    >
                                        MARK AS CONTACTED
                                    </button>
                                )}
                            </div>

                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '1rem',
                                borderLeft: '2px solid #666',
                                color: '#ccc',
                                fontSize: '0.95rem',
                                lineHeight: 1.5
                            }}>
                                {req.message || (req.metadata as any)?.message || 'No message provided.'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MeetingsPage;
