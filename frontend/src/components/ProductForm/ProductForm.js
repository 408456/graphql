import React, { useState, useEffect } from 'react';
import { validateProduct } from '../../utils/validation';
import { styles } from './ProductForm.styles';

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description || '');
            setPrice(product.price.toString());
            setStock(product.stock.toString());
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
        }
        setErrors({});
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateProduct(name, description, price, stock);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
            });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    {product ? 'Редактировать товар' : 'Создать товар'}
                </h2>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Название <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название"
                        style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                        disabled={loading}
                    />
                    {errors.name && <span style={styles.errorText}>{errors.name}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание"
                        style={styles.textarea}
                        rows="3"
                        disabled={loading}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Цена <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        style={{ ...styles.input, ...(errors.price ? styles.inputError : {}) }}
                        disabled={loading}
                    />
                    {errors.price && <span style={styles.errorText}>{errors.price}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Количество <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        step="1"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="0"
                        style={{ ...styles.input, ...(errors.stock ? styles.inputError : {}) }}
                        disabled={loading}
                    />
                    {errors.stock && <span style={styles.errorText}>{errors.stock}</span>}
                </div>

                <div style={styles.buttonGroup}>
                    {onCancel && (
                        <button type="button" onClick={onCancel} style={styles.cancelBtn} disabled={loading}>
                            Отмена
                        </button>
                    )}
                    <button type="submit" style={styles.submitBtn} disabled={loading}>
                        {loading ? (
                            <span style={styles.loadingSpinner}></span>
                        ) : product ? (
                            'Обновить'
                        ) : (
                            'Создать'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;