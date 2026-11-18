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

let books = [];

// Проверка авторизации
function auth(req, res, next) {

    if (!req.session.user) {
        return res.status(401).json({
            error: 'Войдите, чтобы добавлять книги'
        });
    }

    next();
}

// Авторизация
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

// Открытый просмотр каталога
app.get('/api/books', (req, res) => {

    res.json(books);
});

// Добавление книги только после авторизации
app.post('/api/books', auth, (req, res) => {

    const { title, author, year, genre } = req.body;

    if (!title || !author || !year || !genre) {
        return res.status(400).json({
            error: 'Заполните все поля книги'
        });
    }

    const book = {
        id: Date.now(),
        title: String(title).trim(),
        author: String(author).trim(),
        year: Number(year),
        genre: String(genre).trim()
    };

    books.push(book);

    res.status(201).json({
        message: 'Книга добавлена',
        book: book
    });
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