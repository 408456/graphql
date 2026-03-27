import React from 'react';
import { formatDate } from '../../utils/date';
import { styles } from './ProductList.styles';

const ProductList = ({ products, onEdit, onDelete, loading }) => {
    const handleDelete = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            onDelete(id);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Список товаров</h2>
                <div style={styles.count}>{products.length} товаров</div>
            </div>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Название</th>
                        <th style={styles.th}>Цена</th>
                        <th style={styles.th}>Кол-во</th>
                        <th style={styles.th}>Создан</th>
                        <th style={styles.th}>Обновлен</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={styles.emptyState}>
                                <div style={styles.emptyIcon}>📦</div>
                                <p>Товаров не найдено</p>
                            </td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <tr key={product.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>
                                    <span style={styles.idBadge}>#{product.id}</span>
                                </td>
                                <td style={styles.td}>
                                    <div>
                                        <div style={styles.productName}>{product.name}</div>
                                        {product.description && (
                                            <div style={styles.productDescription}>{product.description}</div>
                                        )}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.priceBadge}>{product.price} ₽</span>
                                </td>
                                <td style={styles.td}>
                    <span style={product.stock > 0 ? styles.stockBadge : styles.stockBadgeLow}>
                      {product.stock}
                    </span>
                                </td>
                                <td style={styles.td}>{formatDate(product.createdAt)}</td>
                                <td style={styles.td}>{formatDate(product.updatedAt)}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => onEdit(product)}
                                            style={styles.editBtn}
                                            disabled={loading}
                                        >
                                            редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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

export default ProductList;