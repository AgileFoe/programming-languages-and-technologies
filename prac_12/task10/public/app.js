const $ = id => document.getElementById(id);

// Запросы к серверу
async function request(url, options = {}) {

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}

// Загрузка каталога
async function loadBooks() {

    const books = await request('/api/books');

    $('books').innerHTML = '';

    if (books.length === 0) {
        $('books').textContent = 'Каталог пока пуст.';
    }

    books.forEach(book => {

        const div = document.createElement('div');

        div.className = 'item';

        div.textContent =
            `${book.title} — ${book.author}, ${book.year}, ${book.genre}`;

        $('books').appendChild(div);
    });
}

// Проверка авторизации
async function updatePage() {

    const data = await request('/api/me');

    const loggedIn = Boolean(data.user);

    $('login').classList.toggle('hidden', loggedIn);

    $('editor').classList.toggle('hidden', !loggedIn);

    if (loggedIn) {

        $('user').textContent =
            'Пользователь: ' + data.user.username;
    }
}

// Вход
$('loginBtn').onclick = async () => {

    try {

        const data = await request('/api/login', {

            method: 'POST',

            body: JSON.stringify({
                username: $('username').value,
                password: $('password').value
            })
        });

        $('message').textContent = data.message;

        await updatePage();

    } catch (error) {

        $('message').textContent = error.message;
    }
};

// Добавление книги
$('addBook').onclick = async () => {

    try {

        await request('/api/books', {

            method: 'POST',

            body: JSON.stringify({

                title: $('title').value,
                author: $('author').value,
                year: $('year').value,
                genre: $('genre').value

            })
        });

        $('title').value = '';
        $('author').value = '';
        $('year').value = '';
        $('genre').value = '';

        await loadBooks();

        $('message').textContent = 'Книга добавлена';

    } catch (error) {

        $('message').textContent = error.message;
    }
};

// Выход
$('logout').onclick = async () => {

    const data = await request('/api/logout', {
        method: 'POST'
    });

    $('message').textContent = data.message;

    await updatePage();
};

// Запуск
loadBooks();
updatePage();