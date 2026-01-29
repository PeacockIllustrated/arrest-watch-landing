import React from 'react';
import type { RecordSearchResult } from '../../lib/types/viewModels';

// =============================================================================
// RECORD ROW - Individual record display for search results
// =============================================================================

interface RecordRowProps {
  record: RecordSearchResult;
  onClick?: () => void;
  showImage?: boolean;
}

/**
 * Placeholder for missing mugshots
 */
const ImagePlaceholder: React.FC = () => (
  <div
    style={{
      width: '48px',
      height: '48px',
      background: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.7rem',
      fontWeight: 500,
    }}
  >
    N/A
  </div>
);

export const RecordRow: React.FC<RecordRowProps> = ({
  record,
  onClick,
  showImage = true,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = 'var(--card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Mugshot */}
      {showImage && (
        <div
          style={{
            width: '48px',
            height: '48px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {record.imageUrl ? (
            <img
              src={record.imageUrl}
              alt={`${record.personName} mugshot`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                // Replace with placeholder on error
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.appendChild(
                  document.createElement('div')
                );
              }}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      )}

      {/* Name and county */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {record.personName}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginTop: '2px',
          }}
        >
          {record.countyName}
        </div>
      </div>

      {/* Top charge and badge */}
      <div
        style={{
          flex: 1.5,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {record.topCharge ? (
          <>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary, var(--text-primary))',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={record.topCharge}
            >
              {record.topCharge}
            </span>
            {record.chargeCount > 1 && (
              <span
                style={{
                  padding: '2px 6px',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  background: 'var(--accent-muted, rgba(228, 0, 40, 0.1))',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                +{record.chargeCount - 1}
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No charges listed
          </span>
        )}
      </div>

      {/* Bond amount */}
      <div
        style={{
          width: '100px',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            fontFamily: 'var(--font-mono)',
            color: record.bondTotal ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          {record.formattedBondTotal}
        </div>
      </div>

      {/* Booking date */}
      <div
        style={{
          width: '90px',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          {record.formattedBookingDate}
        </div>
      </div>

      {/* Arrow indicator */}
      {onClick && (
        <div
          style={{
            width: '20px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
          }}
        >
          →
        </div>
      )}
    </div>
  );
};

// =============================================================================
// RECORD LIST - Container for multiple record rows
// =============================================================================

interface RecordListProps {
  records: RecordSearchResult[];
  onRecordClick?: (record: RecordSearchResult) => void;
  showImages?: boolean;
  emptyMessage?: string;
}

export const RecordList: React.FC<RecordListProps> = ({
  records,
  onRecordClick,
  showImages = true,
  emptyMessage = 'No records found',
}) => {
  if (records.length === 0) {
    return (
      <div
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--surface)',
        }}
      >
        {showImages && <div style={{ width: '48px' }} />}
        <div
          style={{
            flex: 1,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          Name
        </div>
        <div
          style={{
            flex: 1.5,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          Top Charge
        </div>
        <div
          style={{
            width: '100px',
            textAlign: 'right',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          Bond
        </div>
        <div
          style={{
            width: '90px',
            textAlign: 'right',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          Date
        </div>
        {onRecordClick && <div style={{ width: '20px' }} />}
      </div>

      {/* Record rows */}
      {records.map((record) => (
        <RecordRow
          key={record.id}
          record={record}
          onClick={onRecordClick ? () => onRecordClick(record) : undefined}
          showImage={showImages}
        />
      ))}
    </div>
  );
};

export default RecordRow;
