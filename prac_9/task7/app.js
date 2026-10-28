
const userIdInput = document.querySelector('#userId');
const searchButton = document.querySelector('#searchButton');
const status = document.querySelector('#status');
const result = document.querySelector('#result');

async function loadUser() {
  const id = userIdInput.value.trim();

  if (!id || !Number.isInteger(Number(id)) ||
      Number(id) < 1 || Number(id) > 10) {
    status.textContent = 'Введите ID от 1 до 10';
    status.className = 'error';
    result.replaceChildren();
    return;
  }

  searchButton.disabled = true;
  status.textContent = 'Загрузка...';
  status.className = '';
  result.replaceChildren();

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const user = await response.json();

    if (!user.id) {
      throw new Error('Пользователь не найден');
    }

    const card = document.createElement('div');
    card.className = 'user-card';

    const name = document.createElement('h2');
    name.textContent = user.name;

    const city = document.createElement('p');
    city.textContent = `Город: ${user.address.city}`;

    const company = document.createElement('p');
    company.textContent = `Компания: ${user.company.name}`;

    card.append(name, city, company);
    result.append(card);

    status.textContent = 'Пользователь успешно загружен!';
    status.className = 'success';

  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
    status.className = 'error';

  } finally {
    searchButton.disabled = false;
  }
}

searchButton.addEventListener('click', loadUser);
