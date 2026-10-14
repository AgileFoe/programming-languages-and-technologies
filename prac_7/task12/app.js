const data = {
  news: [
    { title: "Студенты факультета победили на хакатоне", date: "2026-10-08", text: "Команда второго курса заняла первое место в городском хакатоне.", tags: ["хакатон", "победа"] },
    { title: "Открыт набор в лабораторию ИИ", date: "2026-10-05", text: "Приглашаем студентов 3–4 курсов к участию в исследовательских проектах.", tags: ["наука", "ИИ"] },
    { title: "Обновлено расписание экзаменов", date: "2026-10-01", text: "Новое расписание сессии опубликовано на сайте деканата.", tags: ["экзамен", "расписание"] }
  ],
  events: [
    { title: "День открытых дверей", date: "2026-10-20", text: "Экскурсия по лабораториям и встреча с преподавателями, аудитория 301.", tags: ["абитуриенты"] },
    { title: "Лекция по кибербезопасности", date: "2026-10-25", text: "Приглашённый спикер расскажет о защите веб-приложений.", tags: ["лекция", "безопасность"] },
    { title: "Олимпиада по программированию", date: "2026-11-02", text: "Командный турнир, регистрация открыта до 28 октября.", tags: ["олимпиада"] }
  ],
  notices: [
    { title: "Сдача задолженностей", date: "2026-10-12", text: "Пересдача лабораторных работ проходит по четвергам в аудитории 214.", tags: ["лабораторные"] },
    { title: "Продление библиотечных абонементов", date: "2026-10-10", text: "Продлить абонемент можно в читальном зале до конца месяца.", tags: ["библиотека"] },
    { title: "Экзамен по технологии программирования", date: "2026-10-30", text: "Экзамен пройдёт в компьютерном классе, при себе иметь студенческий билет.", tags: ["экзамен"] }
  ]
};

const KEY = "lab7_v12_tab";
const content = document.querySelector("#content");
const search = document.querySelector("#search");
const count = document.querySelector("#count");
const tabs = [...document.querySelectorAll("[data-page]")];
let current = "news";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render() {
  const q = search.value.trim().toLowerCase();
  const all = data[current] || [];
  const items = all.filter(i =>
    !q || (i.title + " " + i.text + " " + i.tags.join(" ")).toLowerCase().includes(q));

  content.replaceChildren();
  count.textContent = `Найдено: ${items.length} из ${all.length}`;

  if (items.length === 0) {
    content.append(el("p", "empty", q ? `По запросу «${search.value.trim()}» ничего не найдено. Измените запрос.` : "В этом разделе пока нет записей."));
    return;
  }
  const grid = el("div", "grid");
  items.forEach(i => {
    const card = el("article", "card");
    const tags = el("p", "");
    i.tags.forEach(t => tags.append(el("span", "tag", t)));
    card.append(el("h3", "", i.title), el("p", "meta", i.date), el("p", "", i.text), tags);
    grid.append(card);
  });
  content.append(grid);
}

function show(name) {
  current = name;
  tabs.forEach(b => {
    const on = b.dataset.page === name;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on);
  });
  render();
  try { localStorage.setItem(KEY, name); } catch (e) {}
}

tabs.forEach(b => b.addEventListener("click", () => show(b.dataset.page)));
search.addEventListener("input", render);

try {
  const saved = localStorage.getItem(KEY);
  if (saved && data[saved]) current = saved;
} catch (e) {}
show(current);
