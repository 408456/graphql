export const validateUser = (email, name) => {
    const errors = {};
    if (!email.trim()) {
        errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Некорректный email';
    }
    if (!name.trim()) {
        errors.name = 'Имя обязательно';
    } else if (name.length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }
    return errors;
};

export const validateProduct = (name, description, price, stock) => {
    const errors = {};
    if (!name.trim()) errors.name = 'Название обязательно';
    if (price === '' || isNaN(price) || parseFloat(price) <= 0) errors.price = 'Цена должна быть положительным числом';
    if (stock === '' || isNaN(stock) || parseInt(stock, 10) < 0) errors.stock = 'Количество должно быть неотрицательным числом';
    return errors;
};

export const validateOrder = (userId, items) => {
    const errors = {};
    if (!userId) errors.userId = 'Выберите пользователя';
    if (!items.length) errors.items = 'Добавьте хотя бы один товар';
    items.forEach((item, idx) => {
        if (!item.productId) {
            errors[`item_${idx}_product`] = 'Выберите товар';
        }
        if (!item.quantity || item.quantity <= 0) {
            errors[`item_${idx}_quantity`] = 'Количество должно быть > 0';
        }
        if (!item.price || item.price <= 0) {
            errors[`item_${idx}_price`] = 'Цена должна быть > 0';
        }
    });
    return errors;
};
