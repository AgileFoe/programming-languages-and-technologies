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

// Загрузка бронирований
async function loadBookings() {

    const bookings = await request('/api/bookings');

    $('bookings').innerHTML = '';

    if (bookings.length === 0) {

        $('bookings').textContent =
            'Бронирований пока нет.';
    }

    bookings.forEach(booking => {

        const div = document.createElement('div');

        div.className = 'item';

        const text = document.createElement('span');

        text.textContent =
            `ID: ${booking.id} | ${booking.service} | ${booking.date}`;

        const button = document.createElement('button');

        button.textContent = 'Удалить';

        button.onclick = async () => {

            try {

                await request(
                    '/api/bookings/' + booking.id,
                    { method: 'DELETE' }
                );

                await loadBookings();

                $('message').textContent =
                    'Бронирование удалено';

            } catch (error) {

                $('message').textContent = error.message;
            }
        };

        div.appendChild(text);
        div.appendChild(button);

        $('bookings').appendChild(div);
    });
}

// Проверка авторизации
async function updatePage() {

    const data = await request('/api/me');

    const loggedIn = Boolean(data.user);

    $('login').classList.toggle('hidden', loggedIn);

    $('panel').classList.toggle('hidden', !loggedIn);

    if (loggedIn) {

        $('user').textContent =
            'Пользователь: ' + data.user.username;

        await loadBookings();
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

// Создание бронирования
$('create').onclick = async () => {

    try {

        await request('/api/bookings', {

            method: 'POST',

            body: JSON.stringify({

                service: $('service').value,

                date: $('date').value
            })
        });

        $('service').value = '';
        $('date').value = '';

        await loadBookings();

        $('message').textContent =
            'Бронирование создано';

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

// Запуск приложения
updatePage();