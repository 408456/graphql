import React, { useState, useEffect } from 'react';
import { validateUser } from '../utils/validation';
import { styles } from './UserForm.styles';

const UserForm = ({ user, onSubmit, onCancel, loading }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
        } else {
            setEmail('');
            setName('');
        }
        setErrors({});
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateUser(email, name);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ email, name });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    {user ? 'Редактировать пользователя' : 'Создать пользователя'}
                </h2>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Email <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                        disabled={loading}
                    />
                    {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Имя <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя"
                        style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                        disabled={loading}
                    />
                    {errors.name && <span style={styles.errorText}>{errors.name}</span>}
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
                        ) : user ? (
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

export default UserForm;