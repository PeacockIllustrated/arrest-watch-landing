import React from 'react';
import { useSuperAdminReview, type ReviewerName, type CheckField } from '../../hooks/useSuperAdminReview';

/**
 * ADMIN REVIEW PANEL
 * 
 * Dual-row checkbox panel for super admin review verification.
 * One row for Michael, one row for Tom.
 * Four checkboxes per row: Content, Design, Desktop, Mobile.
 * Plus a summary box showing all-complete status.
 * 
 * ONLY renders for super_admin users with review mode enabled.
 */

interface AdminReviewPanelProps {
    deckId: string;
}

const FIELDS: { key: CheckField; label: string }[] = [
    { key: 'content_ok', label: 'CONTENT' },
    { key: 'design_ok', label: 'DESIGN' },
    { key: 'desktop_ok', label: 'DESKTOP' },
    { key: 'mobile_ok', label: 'MOBILE' },
];

const ReviewCheckbox: React.FC<{
    checked: boolean;
    label: string;
    onChange: () => void;
}> = ({ checked, label, onChange }) => {
    const borderColor = checked ? '#4CAF50' : 'var(--color-alert-red)';

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange();
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.75rem',
                background: 'transparent',
                border: `2px solid ${borderColor}`,
                color: 'var(--color-signal-white)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                transition: 'all 0.2s ease',
            }}
        >
            <span style={{
                width: '14px',
                height: '14px',
                border: `2px solid ${borderColor}`,
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: checked ? borderColor : 'transparent',
            }}>
                {checked && (
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            {label}
        </button>
    );
};

const AllCompleteIndicator: React.FC<{ allComplete: boolean }> = ({ allComplete }) => {
    const borderColor = allComplete ? '#4CAF50' : 'var(--color-alert-red)';

    return (
        <div style={{
            width: '32px',
            height: '32px',
            border: `2px solid ${borderColor}`,
            borderRadius: '3px',
            background: allComplete ? '#4CAF50' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
        }}>
            {allComplete && (
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </div>
    );
};

const ReviewerRow: React.FC<{
    reviewer: ReviewerName;
    deckId: string;
}> = ({ reviewer, deckId }) => {
    const { getReviewStatus, setCheckbox } = useSuperAdminReview();
    const reviewStatus = getReviewStatus(deckId);
    const status = reviewStatus[reviewer];

    const allComplete = status.content_ok && status.design_ok && status.desktop_ok && status.mobile_ok;

    return (
        <div style={{ marginBottom: '0.75rem' }}>
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-signal-white)',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
            }}>
                {reviewer} - REVIEW
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
            }}>
                {FIELDS.map(({ key, label }) => (
                    <ReviewCheckbox
                        key={key}
                        checked={status[key]}
                        label={label}
                        onChange={() => setCheckbox(deckId, reviewer, key, !status[key])}
                    />
                ))}
                <AllCompleteIndicator allComplete={allComplete} />
            </div>
        </div>
    );
};

const AdminReviewPanel: React.FC<AdminReviewPanelProps> = ({ deckId }) => {
    const { isSuperAdmin, reviewModeEnabled } = useSuperAdminReview();

    // CRITICAL: Render absolutely nothing for non-super-admins
    if (!isSuperAdmin || !reviewModeEnabled) {
        return null;
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(228, 0, 40, 0.2)',
            }}
        >
            <ReviewerRow reviewer="MICHAEL" deckId={deckId} />
            <ReviewerRow reviewer="TOM" deckId={deckId} />
        </div>
    );
};

export default AdminReviewPanel;
