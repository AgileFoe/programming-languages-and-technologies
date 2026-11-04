import { getClients } from "./contacts.js";

export function renderClients(clients = getClients()) {
    const clientList = document.getElementById("clientList");

    const clientCount = document.getElementById("clientCount");

    clientList.innerHTML = "";

    clientCount.textContent =
        `Всего клиентов: ${clients.length}`;

    if (clients.length === 0) {
        clientList.textContent = "Клиенты не найдены.";
        return;
    }

    clients.forEach(client => {
        const card = document.createElement("div");

        card.className = "client-card";

        const title = document.createElement("h3");
        title.textContent = client.name;

        const phone = document.createElement("p");
        phone.textContent = `Телефон: ${client.phone}`;

        const email = document.createElement("p");
        email.textContent = `Email: ${client.email}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.className = "edit-btn";
        editButton.dataset.id = client.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.id = client.id;

        card.append(
            title,
            phone,
            email,
            editButton,
            deleteButton
        );

        clientList.appendChild(card);
    });
}