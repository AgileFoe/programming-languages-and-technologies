const $ = id => document.getElementById(id);

// Отправка запросов серверу
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

// Сообщения
function message(text) {
    $('message').textContent = text;
}

// Загрузка заметок
async function loadNotes() {

    const notes = await request('/api/notes');

    $('notes').innerHTML = '';

    if (notes.length === 0) {
        $('notes').textContent = 'Заметок пока нет';
    }

    notes.forEach(note => {

        const div = document.createElement('div');

        div.className = 'item';
        div.textContent = note.text;

        $('notes').appendChild(div);
    });
}

// Проверка сессии
async function updatePage() {

    const data = await request('/api/me');

    const loggedIn = Boolean(data.user);

    $('login').classList.toggle('hidden', loggedIn);
    $('private').classList.toggle('hidden', !loggedIn);

    if (loggedIn) {

        $('user').textContent =
            'Пользователь: ' + data.user.username;

        await loadNotes();
    }
}

// Авторизация
$('loginBtn').onclick = async () => {

    try {

        const data = await request('/api/login', {
            method: 'POST',

            body: JSON.stringify({
                username: $('username').value,
                password: $('password').value
            })
        });

        message(data.message);

        await updatePage();

    } catch (error) {

        message(error.message);
    }
};

// Добавление заметки
$('addNote').onclick = async () => {

    try {

        await request('/api/notes', {
            method: 'POST',

            body: JSON.stringify({
                text: $('noteText').value
            })
        });

        $('noteText').value = '';

        await loadNotes();

        message('Заметка добавлена');

    } catch (error) {

        message(error.message);
    }
};

// Выход
$('logout').onclick = async () => {

    const data = await request('/api/logout', {
        method: 'POST'
    });

    message(data.message);

    await updatePage();
};

// Первоначальная проверка
updatePage().catch(error => message(error.message));