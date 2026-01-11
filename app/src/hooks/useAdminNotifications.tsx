/**
 * useAdminNotifications Hook
 * 
 * Manages admin notifications for super admins.
 * Provides real-time updates, read status, and admin actions.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface AdminNotification {
    id: string;
    type: 'new_signup' | 'deck_access_request' | 'system';
    title: string;
    message: string | null;
    user_id: string | null;
    user_email: string | null;
    metadata: {
        deck_id?: string;
        request_id?: string;
        [key: string]: unknown;
    };
    is_read: boolean;
    created_at: string;
}

interface UseAdminNotificationsReturn {
    /** All notifications */
    notifications: AdminNotification[];
    /** Unread notifications only */
    unreadNotifications: AdminNotification[];
    /** Count of unread notifications */
    unreadCount: number;
    /** Loading state */
    loading: boolean;
    /** Mark a notification as read */
    markAsRead: (notificationId: string) => Promise<void>;
    /** Mark all notifications as read */
    markAllAsRead: () => Promise<void>;
    /** Approve a deck access request */
    approveRequest: (requestId: string) => Promise<{ success: boolean; error?: string }>;
    /** Deny a deck access request */
    denyRequest: (requestId: string) => Promise<{ success: boolean; error?: string }>;
    /** Grant all standard decks to a user */
    grantAllDecks: (userId: string) => Promise<{ success: boolean; error?: string }>;
    /** Refresh notifications from database */
    refresh: () => Promise<void>;
}

export const useAdminNotifications = (): UseAdminNotificationsReturn => {
    const [notifications, setNotifications] = useState<AdminNotification[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all notifications
    const fetchNotifications = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('admin_notifications')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                // If error is about missing table or unauthorized, silently fail
                if (error.code === '42P01' || error.code === 'PGRST116') {
                    console.warn('Admin notifications not available:', error.message);
                    setNotifications([]);
                } else {
                    console.error('Error fetching notifications:', error);
                }
            } else {
                setNotifications(data || []);
            }
        } catch (err) {
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    // Real-time subscription for new notifications
    useEffect(() => {
        const channel = supabase
            .channel('admin_notifications_changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'admin_notifications'
                },
                (payload) => {
                    // Add new notification to the top
                    setNotifications(prev => [payload.new as AdminNotification, ...prev]);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'admin_notifications'
                },
                (payload) => {
                    // Update existing notification
                    setNotifications(prev =>
                        prev.map(n => n.id === payload.new.id ? payload.new as AdminNotification : n)
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Computed values
    const unreadNotifications = notifications.filter(n => !n.is_read);
    const unreadCount = unreadNotifications.length;

    // Mark a notification as read
    const markAsRead = useCallback(async (notificationId: string) => {
        try {
            const { error } = await supabase
                .from('admin_notifications')
                .update({ is_read: true })
                .eq('id', notificationId);

            if (error) {
                console.error('Error marking notification as read:', error);
            } else {
                // Update local state
                setNotifications(prev =>
                    prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
                );
            }
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        try {
            const unreadIds = unreadNotifications.map(n => n.id);
            if (unreadIds.length === 0) return;

            const { error } = await supabase
                .from('admin_notifications')
                .update({ is_read: true })
                .in('id', unreadIds);

            if (error) {
                console.error('Error marking all as read:', error);
            } else {
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            }
        } catch (err) {
            console.error('Error marking all as read:', err);
        }
    }, [unreadNotifications]);

    // Approve a deck access request
    const approveRequest = useCallback(async (requestId: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase
                .rpc('approve_deck_access', { p_request_id: requestId });

            if (error) {
                console.error('Error approving request:', error);
                return { success: false, error: error.message };
            }

            if (data === 'success') {
                // Mark related notification as read
                const notification = notifications.find(
                    n => n.type === 'deck_access_request' && n.metadata?.request_id === requestId
                );
                if (notification) {
                    await markAsRead(notification.id);
                }
                return { success: true };
            } else {
                return { success: false, error: data };
            }
        } catch (err) {
            console.error('Error approving request:', err);
            return { success: false, error: 'Failed to approve request' };
        }
    }, [notifications, markAsRead]);

    // Deny a deck access request
    const denyRequest = useCallback(async (requestId: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase
                .rpc('deny_deck_access', { p_request_id: requestId });

            if (error) {
                console.error('Error denying request:', error);
                return { success: false, error: error.message };
            }

            if (data === 'success') {
                // Mark related notification as read
                const notification = notifications.find(
                    n => n.type === 'deck_access_request' && n.metadata?.request_id === requestId
                );
                if (notification) {
                    await markAsRead(notification.id);
                }
                return { success: true };
            } else {
                return { success: false, error: data };
            }
        } catch (err) {
            console.error('Error denying request:', err);
            return { success: false, error: 'Failed to deny request' };
        }
    }, [notifications, markAsRead]);

    // Grant all standard decks to a user
    const grantAllDecks = useCallback(async (userId: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase
                .rpc('grant_all_decks_to_user', { p_user_id: userId });

            if (error) {
                console.error('Error granting all decks:', error);
                return { success: false, error: error.message };
            }

            if (data === 'success') {
                // Mark related notification as read
                const notification = notifications.find(
                    n => n.type === 'new_signup' && n.user_id === userId
                );
                if (notification) {
                    await markAsRead(notification.id);
                }
                return { success: true };
            } else {
                return { success: false, error: data };
            }
        } catch (err) {
            console.error('Error granting all decks:', err);
            return { success: false, error: 'Failed to grant decks' };
        }
    }, [notifications, markAsRead]);

    return {
        notifications,
        unreadNotifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        approveRequest,
        denyRequest,
        grantAllDecks,
        refresh: fetchNotifications
    };
};

export default useAdminNotifications;
