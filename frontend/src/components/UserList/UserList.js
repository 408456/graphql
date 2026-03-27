import React from 'react';
import { formatDate } from '../../utils/date'; // ← исправленный путь
import { styles } from './UserList.styles';

const UserList = ({ users, onEdit, onDelete, loading }) => {
    const handleDelete = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            onDelete(id);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Список пользователей</h2>
                <div style={styles.count}>{users.length} пользователей</div>
            </div>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Имя</th>
                        <th style={styles.th}>Создан</th>
                        <th style={styles.th}>Обновлен</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={styles.emptyState}>
                                <div style={styles.emptyIcon}>📭</div>
                                <p>Пользователей не найдено</p>
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>
                                    <span style={styles.idBadge}>#{user.id}</span>
                                </td>
                                <td style={styles.td}>
                                    <a href={`mailto:${user.email}`} style={styles.emailLink}>
                                        {user.email}
                                    </a>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.nameBadge}>{user.name}</span>
                                </td>
                                <td style={styles.td}>{formatDate(user.createdAt)}</td>
                                <td style={styles.td}>{formatDate(user.updatedAt)}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => onEdit(user)}
                                            style={styles.editBtn}
                                            disabled={loading}
                                        >
                                            редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
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

export default UserList;