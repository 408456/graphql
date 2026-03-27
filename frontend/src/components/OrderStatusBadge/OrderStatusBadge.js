import React from 'react';

const statusColors = {
    PENDING: { bg: '#fef3c7', text: '#92400e', label: 'Ожидает' },
    PROCESSING: { bg: '#dbeafe', text: '#1e40af', label: 'В обработке' },
    SHIPPED: { bg: '#c7d2fe', text: '#3730a3', label: 'Отправлен' },
    DELIVERED: { bg: '#d1fae5', text: '#065f46', label: 'Доставлен' },
    CANCELLED: { bg: '#fee2e2', text: '#991b1b', label: 'Отменён' },
};

const OrderStatusBadge = ({ status }) => {
    const color = statusColors[status] || { bg: '#f3f4f6', text: '#374151', label: status };
    return (
        <span
            style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: color.bg,
                color: color.text,
            }}
        >
      {color.label}
    </span>
    );
};

export default OrderStatusBadge;