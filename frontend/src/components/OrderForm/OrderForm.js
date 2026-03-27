import React, { useState, useEffect } from 'react';
import { validateOrder } from '../../utils/validation';
import { styles } from './OrderForm.styles';

const OrderForm = ({ users, products, onSubmit, onCancel, loading }) => {
    const [userId, setUserId] = useState('');
    const [items, setItems] = useState([{ productId: '', quantity: 1, price: 0 }]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // при выборе товара можно автоматически подставлять цену
        // для простоты оставляем ручной ввод
    }, []);

    const addItem = () => {
        setItems([...items, { productId: '', quantity: 1, price: 0 }]);
    };

    const removeItem = (index) => {
        if (items.length === 1) return;
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) : value;
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateOrder(userId, items);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ userId, items });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Создать заказ</h2>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Пользователь <span style={styles.required}>*</span>
                    </label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{ ...styles.select, ...(errors.userId ? styles.inputError : {}) }}
                        disabled={loading}
                    >
                        <option value="">Выберите пользователя</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                        ))}
                    </select>
                    {errors.userId && <span style={styles.errorText}>{errors.userId}</span>}
                </div>

                <div style={styles.itemsSection}>
                    <label style={styles.label}>Товары</label>
                    {items.map((item, idx) => (
                        <div key={idx} style={styles.itemRow}>
                            <select
                                value={item.productId}
                                onChange={(e) => updateItem(idx, 'productId', e.target.value)}
                                style={styles.itemSelect}
                                disabled={loading}
                            >
                                <option value="">Выберите товар</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.price} ₽)</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                step="1"
                                value={item.quantity}
                                onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                                placeholder="Кол-во"
                                style={styles.itemQuantity}
                                disabled={loading}
                            />
                            <input
                                type="number"
                                step="0.01"
                                value={item.price}
                                onChange={(e) => updateItem(idx, 'price', e.target.value)}
                                placeholder="Цена"
                                style={styles.itemPrice}
                                disabled={loading}
                            />
                            <button type="button" onClick={() => removeItem(idx)} style={styles.removeBtn} disabled={loading}>
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} style={styles.addBtn} disabled={loading}>
                        + Добавить товар
                    </button>
                </div>

                <div style={styles.buttonGroup}>
                    {onCancel && (
                        <button type="button" onClick={onCancel} style={styles.cancelBtn} disabled={loading}>
                            Отмена
                        </button>
                    )}
                    <button type="submit" style={styles.submitBtn} disabled={loading}>
                        {loading ? <span style={styles.loadingSpinner}></span> : 'Создать'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;