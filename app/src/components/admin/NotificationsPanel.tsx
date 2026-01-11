/**
 * NotificationsPanel Component
 * 
 * Slideout panel for admin notifications.
 * Shows new signups and deck access requests with quick actions.
 */

import React, { useState } from 'react';
import { useAdminNotifications, type AdminNotification } from '../../hooks/useAdminNotifications';
import { DECKS } from '../../lib/decks';

// ============ NOTIFICATION ICONS ============
const UserPlusIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
);

const KeyIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const BellIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const CheckIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ============ HELPER FUNCTIONS ============
function getDeckTitle(deckId: string): string {
    const deck = DECKS.find(d => d.id === deckId);
    return deck?.title || deckId;
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// ============ SINGLE NOTIFICATION ITEM ============
interface NotificationItemProps {
    notification: AdminNotification;
    onApprove?: (requestId: string) => void;
    onDeny?: (requestId: string) => void;
    onGrantAll?: (userId: string) => void;
    onDismiss: (notificationId: string) => void;
    isActioning?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    notification,
    onApprove,
    onDeny,
    onGrantAll,
    onDismiss,
    isActioning
}) => {
    const isSignup = notification.type === 'new_signup';
    const isAccessRequest = notification.type === 'deck_access_request';

    return (
        <div
            style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: notification.is_read ? 'transparent' : 'rgba(228, 0, 40, 0.05)',
                transition: 'background 0.2s'
            }}
        >
            {/* Header Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                {/* Icon */}
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSignup ? 'rgba(76, 175, 80, 0.15)' : 'rgba(228, 0, 40, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSignup ? '#4CAF50' : '#e40028',
                    flexShrink: 0
                }}>
                    {isSignup ? <UserPlusIcon size={16} /> : <KeyIcon size={16} />}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: '#fff',
                        marginBottom: '0.25rem'
                    }}>
                        {notification.title}
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#888',
                        marginBottom: '0.25rem'
                    }}>
                        {notification.user_email}
                    </div>
                    {isAccessRequest && notification.metadata?.deck_id && (
                        <div style={{
                            fontSize: '0.7rem',
                            color: '#e40028',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.05em'
                        }}>
                            Deck: {getDeckTitle(notification.metadata.deck_id)}
                        </div>
                    )}
                </div>

                {/* Time */}
                <div style={{
                    fontSize: '0.65rem',
                    color: '#666',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap'
                }}>
                    {formatTimeAgo(notification.created_at)}
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.75rem',
                marginLeft: '2.5rem'
            }}>
                {isAccessRequest && onApprove && notification.metadata?.request_id && (
                    <button
                        onClick={() => onApprove(notification.metadata.request_id!)}
                        disabled={isActioning}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.4rem 0.6rem',
                            background: 'rgba(76, 175, 80, 0.15)',
                            border: '1px solid #4CAF50',
                            color: '#4CAF50',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: isActioning ? 'wait' : 'pointer',
                            opacity: isActioning ? 0.5 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        <CheckIcon size={12} /> APPROVE
                    </button>
                )}
                {isAccessRequest && onDeny && notification.metadata?.request_id && (
                    <button
                        onClick={() => onDeny(notification.metadata.request_id!)}
                        disabled={isActioning}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.4rem 0.6rem',
                            background: 'transparent',
                            border: '1px solid #666',
                            color: '#888',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: isActioning ? 'wait' : 'pointer',
                            opacity: isActioning ? 0.5 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        <XIcon size={12} /> DENY
                    </button>
                )}
                {isSignup && onGrantAll && notification.user_id && (
                    <button
                        onClick={() => onGrantAll(notification.user_id!)}
                        disabled={isActioning}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.4rem 0.6rem',
                            background: 'rgba(76, 175, 80, 0.15)',
                            border: '1px solid #4CAF50',
                            color: '#4CAF50',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: isActioning ? 'wait' : 'pointer',
                            opacity: isActioning ? 0.5 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        <CheckIcon size={12} /> GRANT ALL DECKS
                    </button>
                )}
                <button
                    onClick={() => onDismiss(notification.id)}
                    style={{
                        padding: '0.4rem 0.6rem',
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#666',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    DISMISS
                </button>
            </div>
        </div>
    );
};

// ============ MAIN NOTIFICATIONS PANEL ============
export const NotificationsPanel: React.FC = () => {
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        approveRequest,
        denyRequest,
        grantAllDecks
    } = useAdminNotifications();

    const [isOpen, setIsOpen] = useState(false);
    const [actioningId, setActioningId] = useState<string | null>(null);

    const handleApprove = async (requestId: string) => {
        setActioningId(requestId);
        const result = await approveRequest(requestId);
        if (!result.success) {
            console.error('Failed to approve:', result.error);
        }
        setActioningId(null);
    };

    const handleDeny = async (requestId: string) => {
        setActioningId(requestId);
        const result = await denyRequest(requestId);
        if (!result.success) {
            console.error('Failed to deny:', result.error);
        }
        setActioningId(null);
    };

    const handleGrantAll = async (userId: string) => {
        setActioningId(userId);
        const result = await grantAllDecks(userId);
        if (!result.success) {
            console.error('Failed to grant all decks:', result.error);
        }
        setActioningId(null);
    };

    const handleDismiss = async (notificationId: string) => {
        await markAsRead(notificationId);
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: isOpen ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                    border: `1px solid ${isOpen ? '#e40028' : '#333'}`,
                    borderRadius: '6px',
                    color: isOpen ? '#e40028' : '#888',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                <BellIcon size={18} />
                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        minWidth: '18px',
                        height: '18px',
                        background: '#e40028',
                        borderRadius: '9px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                        fontFamily: 'var(--font-mono)'
                    }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Panel Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 998
                        }}
                    />

                    {/* Panel */}
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        width: '380px',
                        maxHeight: '500px',
                        background: 'rgba(10, 10, 10, 0.98)',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        zIndex: 999
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            borderBottom: '1px solid #222'
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.1em',
                                color: '#e40028'
                            }}>
                                NOTIFICATIONS
                            </span>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#666',
                                        fontSize: '0.65rem',
                                        fontFamily: 'var(--font-mono)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    MARK ALL READ
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                            {loading ? (
                                <div style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: '#666',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem'
                                }}>
                                    LOADING...
                                </div>
                            ) : notifications.length === 0 ? (
                                <div style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: '#666',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem'
                                }}>
                                    NO NOTIFICATIONS
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onApprove={handleApprove}
                                        onDeny={handleDeny}
                                        onGrantAll={handleGrantAll}
                                        onDismiss={handleDismiss}
                                        isActioning={actioningId === notification.metadata?.request_id || actioningId === notification.user_id}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationsPanel;
