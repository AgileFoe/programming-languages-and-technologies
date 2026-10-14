const orders = [
  { id: 1, client: "Айгерим", item: "Пицца Маргарита × 2", sum: 7200, status: "new" },
  { id: 2, client: "Руслан", item: "Бизнес-ланч", sum: 2500, status: "new" },
  { id: 3, client: "Ольга", item: "Торт «Медовик»", sum: 9800, status: "work" },
  { id: 4, client: "Нурлан", item: "Суши-сет", sum: 6400, status: "done" }
];
let nextId = 5;
let current = "new";

const LABELS = { new: "Новые", work: "В работе", done: "Готовые" };
const KEY = "lab7_v18_tab";
const content = document.querySelector("#content");
const tabs = [...document.querySelectorAll("[data-page]")];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setStatus(id, status) {
  const o = orders.find(x => x.id === id);
  if (o) o.status = status;
  render();
}

function actions(o) {
  const box = el("div");
  const add = (label, status, ghost) => {
    const b = el("button", "act" + (ghost ? " ghost" : ""), label);
    b.type = "button";
    b.addEventListener("click", () => setStatus(o.id, status));
    box.append(b);
  };
  if (o.status === "new") add("Взять в работу", "work");
  if (o.status === "work") { add("Готово", "done"); add("Вернуть в новые", "new", true); }
  if (o.status === "done") add("Вернуть в работу", "work", true);
  return box;
}

function updateCounters() {
  Object.keys(LABELS).forEach(s => {
    document.querySelector("#cnt-" + s).textContent = orders.filter(o => o.status === s).length;
  });
}

function render() {
  updateCounters();
  content.replaceChildren();
  const list = orders.filter(o => o.status === current);
  if (list.length === 0) {
    content.append(el("p", "empty", `В разделе «${LABELS[current]}» заказов нет.`));
    return;
  }
  const grid = el("div", "grid");
  list.forEach(o => {
    const card = el("article", "card");
    card.append(
      el("h3", "", "Заказ №" + o.id),
      el("p", "meta", o.client),
      el("p", "", o.item),
      el("p", "sum", o.sum.toLocaleString("ru-RU") + " ₸"),
      actions(o)
    );
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

document.querySelector("#add-form").addEventListener("submit", e => {
  e.preventDefault();
  const client = document.querySelector("#f-client").value.trim();
  const item = document.querySelector("#f-item").value.trim();
  const sum = Number(document.querySelector("#f-sum").value);
  const err = document.querySelector("#form-error");
  if (!client || !item || !(sum > 0)) {
    err.textContent = "Заполните все поля, сумма должна быть больше нуля.";
    return;
  }
  err.textContent = "";
  orders.push({ id: nextId++, client, item, sum, status: "new" });
  e.target.reset();
  show("new");
});

try {
  const saved = localStorage.getItem(KEY);
  if (saved && LABELS[saved]) current = saved;
} catch (e) {}
show(current);
