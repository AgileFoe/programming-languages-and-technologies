
const postIdInput = document.querySelector('#postId');
const loadBtn = document.querySelector('#loadBtn');
const status = document.querySelector('#status');
const results = document.querySelector('#results');

async function loadComments() {
  const id = postIdInput.value.trim();

  // Проверяем введённый ID
  if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 100) {
    status.textContent = 'Введите ID публикации от 1 до 100.';
    status.className = 'error';
    results.replaceChildren();
    return;
  }

  loadBtn.disabled = true;
  status.textContent = 'Загрузка комментариев...';
  status.className = '';
  results.replaceChildren();

  try {
    // Проверяем, существует ли публикация
    const postResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!postResponse.ok) {
      throw new Error(`Ошибка HTTP: ${postResponse.status}`);
    }

    const post = await postResponse.json();

    if (!post.id) {
      throw new Error('Публикация не найдена.');
    }

    // Получаем комментарии этой публикации
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const comments = await response.json();

    if (!Array.isArray(comments)) {
      throw new Error('Некорректный формат данных.');
    }

    if (comments.length === 0) {
      status.textContent = 'У этой публикации нет комментариев.';
      status.className = 'success';
      return;
    }

    for (const comment of comments) {
      const card = document.createElement('article');
      card.className = 'comment';

      const title = document.createElement('h3');
      title.textContent = comment.name;

      const email = document.createElement('p');
      email.textContent = `Автор: ${comment.email}`;

      const body = document.createElement('p');
      body.textContent = comment.body;

      card.append(title, email, body);
      results.append(card);
    }

    status.textContent =
      `Публикация №${post.id}. Загружено комментариев: ${comments.length}`;
    status.className = 'success';

  } catch (error) {
    status.textContent = `Ошибка загрузки: ${error.message}`;
    status.className = 'error';

  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener('click', loadComments);
