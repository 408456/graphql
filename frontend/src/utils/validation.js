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