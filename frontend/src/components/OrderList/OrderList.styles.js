export const styles = {
    container: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    header: {
        padding: '20px 24px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        margin: 0,
    },
    count: {
        fontSize: '14px',
        color: '#6b7280',
        backgroundColor: '#f3f4f6',
        padding: '4px 12px',
        borderRadius: '20px',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
    },
    th: {
        padding: '12px 16px',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
    },
    td: {
        padding: '16px',
        fontSize: '14px',
        color: '#1f2937',
        borderBottom: '1px solid #f3f4f6',
        verticalAlign: 'top',
    },
    rowEven: {
        backgroundColor: 'white',
    },
    rowOdd: {
        backgroundColor: '#f9fafb',
    },
    emptyState: {
        textAlign: 'center',
        padding: '48px',
        color: '#9ca3af',
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
    },
    idBadge: {
        fontFamily: 'monospace',
        fontSize: '13px',
        backgroundColor: '#f3f4f6',
        padding: '2px 8px',
        borderRadius: '12px',
        display: 'inline-block',
    },
    totalAmount: {
        fontWeight: '600',
        color: '#10b981',
    },
    itemsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    item: {
        fontSize: '12px',
        color: '#6b7280',
    },
    actions: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
    },
    statusSelect: {
        padding: '6px 8px',
        fontSize: '12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
    },
    deleteBtn: {
        padding: '6px 12px',
        fontSize: '12px',
        backgroundColor: '#fee2e2',
        border: 'none',
        borderRadius: '6px',
        color: '#dc2626',
        cursor: 'pointer',
    },
};