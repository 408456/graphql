import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.alert} className="slide-in">
                <div style={styles.icon}>⚠️</div>
                <div style={styles.content}>
                    <h3 style={styles.title}>Ошибка</h3>
                    <p style={styles.message}>{message}</p>
                </div>
                <button onClick={onClose} style={styles.closeBtn}>
                    ✕
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease-out',
    },
    alert: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    },
    icon: {
        fontSize: '32px',
    },
    content: {
        flex: 1,
    },
    title: {
        color: '#dc2626',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    message: {
        color: '#374151',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#9ca3af',
        padding: '4px',
        transition: 'color 0.2s',
    },
};

export default ErrorAlert;