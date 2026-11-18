const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());

app.use(session({
    secret: 'lab12-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}));

app.use(express.static('public'));

const users = [
    { id: 1, username: 'student1', password: 'demo123' },
    { id: 2, username: 'student2', password: 'demo123' }
];

let bookings = [];

// Проверка авторизации
function auth(req, res, next) {

    if (!req.session.user) {
        return res.status(401).json({
            error: 'Сначала войдите в систему'
        });
    }

    next();
}

// Проверка владельца бронирования
function checkOwner(req, res, next) {

    const booking = bookings.find(
        b => b.id === Number(req.params.id)
    );

    if (!booking) {
        return res.status(404).json({
            error: 'Бронирование не найдено'
        });
    }

    if (booking.userId !== req.session.user.id) {

        return res.status(403).json({
            error: 'Нет доступа к чужому бронированию'
        });
    }

    req.booking = booking;

    next();
}

// Вход
app.post('/api/login', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Заполните все поля'
        });
    }

    const user = users.find(
        u => u.username === username &&
             u.password === password
    );

    if (!user) {
        return res.status(401).json({
            error: 'Неверный логин или пароль'
        });
    }

    req.session.regenerate(err => {

        if (err) {
            return res.status(500).json({
                error: 'Ошибка сессии'
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };

        res.json({
            message: 'Вы успешно вошли'
        });
    });
});

// Проверка пользователя
app.get('/api/me', (req, res) => {

    res.json({
        user: req.session.user || null
    });
});

// Получение собственных бронирований
app.get('/api/bookings', auth, (req, res) => {

    const userBookings = bookings.filter(
        b => b.userId === req.session.user.id
    );

    res.json(userBookings);
});

// Создание бронирования
app.post('/api/bookings', auth, (req, res) => {

    const { service, date } = req.body;

    if (!service || !date) {
        return res.status(400).json({
            error: 'Укажите услугу и дату'
        });
    }

    const booking = {

        id: Date.now(),

        userId: req.session.user.id,

        service: String(service).trim(),

        date: date
    };

    bookings.push(booking);

    res.status(201).json({
        message: 'Бронирование создано',
        booking: booking
    });
});

// Просмотр конкретного бронирования
app.get(
    '/api/bookings/:id',
    auth,
    checkOwner,
    (req, res) => {

        res.json(req.booking);
    }
);

// Удаление бронирования
app.delete(
    '/api/bookings/:id',
    auth,
    checkOwner,
    (req, res) => {

        bookings = bookings.filter(
            b => b.id !== req.booking.id
        );

        res.json({
            message: 'Бронирование удалено'
        });
    }
);

// Выход
app.post('/api/logout', (req, res) => {

    req.session.destroy(() => {

        res.clearCookie('connect.sid');

        res.json({
            message: 'Вы вышли из системы'
        });
    });
});

app.listen(3000, () => {

    console.log('Сервер запущен: http://localhost:3000');

});