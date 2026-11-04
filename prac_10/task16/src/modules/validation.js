export function validateName(name) {
    return name.trim().length >= 2;
}

export function validatePhone(phone) {
    return /^\+?[0-9]{10,15}$/.test(phone);
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateClient(client) {
    const errors = [];

    if (!validateName(client.name)) {
        errors.push("Имя должно содержать минимум 2 символа");
    }

    if (!validatePhone(client.phone)) {
        errors.push("Введите корректный номер телефона");
    }

    if (!validateEmail(client.email)) {
        errors.push("Введите корректный email");
    }

    return errors;
}