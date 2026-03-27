import React from 'react';
import { formatDate } from '../../utils/date';
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge';
import { styles } from './OrderList.styles';

const OrderList = ({ orders, onUpdateStatus, onDelete, loading }) => {
    const handleDelete = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
            onDelete(id);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        onUpdateStatus(id, { status: newStatus });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Список заказов</h2>
                <div style={styles.count}>{orders.length} заказов</div>
            </div>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Пользователь</th>
                        <th style={styles.th}>Статус</th>
                        <th style={styles.th}>Сумма</th>
                        <th style={styles.th}>Товары</th>
                        <th style={styles.th}>Создан</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={styles.emptyState}>
                                <div style={styles.emptyIcon}>📋</div>
                                <p>Заказов не найдено</p>
                            </td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={order.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>
                                    <span style={styles.idBadge}>#{order.id}</span>
                                </td>
                                <td style={styles.td}>Пользователь {order.userId}</td>
                                <td style={styles.td}>
                                    <OrderStatusBadge status={order.status} />
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.totalAmount}>{order.totalAmount} ₽</span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.itemsList}>
                                        {order.items.map((item, i) => (
                                            <div key={i} style={styles.item}>
                                                Товар {item.productId} x{item.quantity} = {item.price * item.quantity} ₽
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td style={styles.td}>{formatDate(order.createdAt)}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={styles.statusSelect}
                                            disabled={loading}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            style={styles.deleteBtn}
                                            disabled={loading}
                                        >
                                            удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;