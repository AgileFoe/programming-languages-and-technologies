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

let notes = [];

// Проверка авторизации
function auth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            error: 'Сначала войдите в систему'
        });
    }

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

// Получение личных заметок
app.get('/api/notes', auth, (req, res) => {
    const userNotes = notes.filter(
        n => n.userId === req.session.user.id
    );

    res.json(userNotes);
});

// Добавление заметки
app.post('/api/notes', auth, (req, res) => {
    const text = String(req.body.text || '').trim();

    if (!text) {
        return res.status(400).json({
            error: 'Введите текст заметки'
        });
    }

    const note = {
        id: Date.now(),
        userId: req.session.user.id,
        text: text
    };

    notes.push(note);

    res.status(201).json(note);
});

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