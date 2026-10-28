
const userIdInput = document.querySelector('#userId');
const userBtn = document.querySelector('#userBtn');

const mainStatus = document.querySelector('#mainStatus');
const postsStatus = document.querySelector('#postsStatus');
const commentsStatus = document.querySelector('#commentsStatus');

const userInfo = document.querySelector('#userInfo');
const postsContainer = document.querySelector('#posts');
const commentsContainer = document.querySelector('#comments');
const postCount = document.querySelector('#postCount');

let currentUserId = null;

async function loadUser() {
  const id = userIdInput.value.trim();

  if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 10) {
    mainStatus.textContent = 'Введите ID от 1 до 10.';
    mainStatus.className = 'status error';
    return;
  }

  userBtn.disabled = true;
  mainStatus.textContent = 'Загрузка...';
  mainStatus.className = 'status';
  postsStatus.textContent = '';
  commentsStatus.textContent = '';
  userInfo.replaceChildren();
  postsContainer.replaceChildren();
  commentsContainer.replaceChildren();
  postCount.textContent = '';
  currentUserId = null;

  try {
    // 1. Загружаем пользователя
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!userResponse.ok) {
      throw new Error(`HTTP ${userResponse.status}`);
    }

    const user = await userResponse.json();

    if (!user.id) {
      throw new Error('Пользователь не найден.');
    }

    currentUserId = user.id;

    const info = document.createElement('div');
    info.className = 'user-info';

    const name = document.createElement('strong');
    name.textContent = user.name;

    const email = document.createElement('div');
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement('div');
    city.textContent = `Город: ${user.address.city}`;

    const company = document.createElement('div');
    company.textContent = `Компания: ${user.company.name}`;

    info.append(name, email, city, company);
    userInfo.append(info);

    // 2. Загружаем публикации пользователя
    postsStatus.textContent = 'Загрузка публикаций...';

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );

    if (!postsResponse.ok) {
      throw new Error(`Ошибка публикаций: HTTP ${postsResponse.status}`);
    }

    const userPosts = await postsResponse.json();

    if (!Array.isArray(userPosts)) {
      throw new Error('Некорректный ответ сервера.');
    }

    postCount.textContent = `(${userPosts.length})`;

    for (const post of userPosts) {
      const article = document.createElement('article');
      article.className = 'post';

      const title = document.createElement('h3');
      title.className = 'post-title';
      title.textContent = `${post.id}. ${post.title}`;

      const body = document.createElement('p');
      body.className = 'post-body';
      body.textContent = post.body;

      const button = document.createElement('button');
      button.className = 'small-btn';
      button.textContent = 'Комментарии';

      button.addEventListener('click', () => {
        loadComments(post.id, user.id);
      });

      article.append(title, body, button);
      postsContainer.append(article);
    }

    postsStatus.textContent = userPosts.length
      ? 'Выберите публикацию, чтобы посмотреть комментарии.'
      : 'Публикаций нет.';

    mainStatus.textContent = 'Данные успешно загружены.';
    mainStatus.className = 'status success';

  } catch (error) {
    mainStatus.textContent = `Ошибка: ${error.message}`;
    mainStatus.className = 'status error';

  } finally {
    userBtn.disabled = false;
  }
}

// 3. Загружаем комментарии выбранной публикации
async function loadComments(postId, userId) {
  if (currentUserId !== userId) {
    return;
  }

  commentsContainer.replaceChildren();
  commentsStatus.textContent = 'Загрузка комментариев...';
  commentsStatus.className = 'status';

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Некорректный ответ сервера.');
    }

    if (data.length === 0) {
      commentsStatus.textContent = 'Комментариев нет.';
      return;
    }

    for (const item of data) {
      const article = document.createElement('article');
      article.className = 'comment';

      const title = document.createElement('h3');
      title.textContent = item.name;

      const email = document.createElement('p');
      email.className = 'comment-email';
      email.textContent = item.email;

      const body = document.createElement('p');
      body.textContent = item.body;

      article.append(title, email, body);
      commentsContainer.append(article);
    }

    commentsStatus.textContent =
      `Комментариев: ${data.length}`;
    commentsStatus.className = 'status success';

  } catch (error) {
    commentsStatus.textContent = `Ошибка: ${error.message}`;
    commentsStatus.className = 'status error';

  }
}

userBtn.addEventListener('click', loadUser);
