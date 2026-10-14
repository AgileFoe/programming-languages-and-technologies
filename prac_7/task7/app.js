const data = {
  workouts: [
    { title: "Йога", meta: "Пн, Ср, 09:00", text: "Растяжка и дыхание. Уровень: начальный." },
    { title: "Кроссфит", meta: "Вт, Чт, 19:00", text: "Круговые функциональные тренировки. Уровень: средний." },
    { title: "Плавание", meta: "Сб, 11:00", text: "Занятие в бассейне 25 м с тренером." },
    { title: "Бокс", meta: "Пн, Пт, 20:00", text: "Техника, работа на мешках и в парах." }
  ],
  trainers: [
    { title: "Алия Сериккызы", meta: "Йога, стретчинг", text: "Стаж 8 лет, сертификат Yoga Alliance." },
    { title: "Дмитрий Орлов", meta: "Кроссфит", text: "Стаж 6 лет, мастер спорта." },
    { title: "Марат Жумабаев", meta: "Бокс", text: "Стаж 12 лет, тренер сборной города." }
  ],
  plans: [
    { title: "Разовый", meta: "3 000 ₸", text: "Одно посещение любого занятия." },
    { title: "Месяц", meta: "18 000 ₸", text: "12 занятий в месяц." },
    { title: "Безлимит", meta: "35 000 ₸", text: "Любые занятия без ограничений, 30 дней." }
  ]
};

const KEY = "lab7_v7_tab";
const content = document.querySelector("#content");
const tabs = [...document.querySelectorAll("[data-page]")];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render(name) {
  content.replaceChildren();
  const items = data[name];
  if (!items || items.length === 0) {
    content.append(el("p", "empty", "В этом разделе пока нет данных."));
    return;
  }
  const grid = el("div", "grid");
  items.forEach(i => {
    const card = el("article", "card");
    card.append(el("h3", "", i.title), el("p", "meta", i.meta), el("p", "", i.text));
    grid.append(card);
  });
  content.append(grid);
}

function show(name) {
  tabs.forEach(b => {
    const on = b.dataset.page === name;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on);
    b.tabIndex = on ? 0 : -1;
  });
  render(name);
  try { localStorage.setItem(KEY, name); } catch (e) { /* хранилище недоступно */ }
}

tabs.forEach(b => b.addEventListener("click", () => show(b.dataset.page)));

// клавиатурная навигация: стрелки, Home, End
document.querySelector("#tabs").addEventListener("keydown", e => {
  const i = tabs.indexOf(document.activeElement);
  if (i < 0) return;
  let n = i;
  if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
  else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = tabs.length - 1;
  else return;
  e.preventDefault();
  tabs[n].focus();
  show(tabs[n].dataset.page);
});

let start = "workouts";
try {
  const saved = localStorage.getItem(KEY);
  if (saved && data[saved]) start = saved;
} catch (e) {}
show(start);
