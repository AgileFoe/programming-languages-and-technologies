import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    setClients
} from "./contacts.js";

import { validateClient } from "./validation.js";

import { searchClients } from "./search.js";

import {
    saveClients,
    loadClients
} from "./storage.js";

import { renderClients } from "./ui.js";

const form = document.getElementById("clientForm");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const clientId = document.getElementById("clientId");

const message = document.getElementById("message");

const searchInput = document.getElementById("search");

const submitButton = document.getElementById("submitButton");

const cancelButton = document.getElementById("cancelEdit");

// Загружаем сохранённых клиентов
setClients(loadClients());

renderClients();

// Добавление и редактирование клиента
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const client = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim()
    };

    const errors = validateClient(client);

    if (errors.length > 0) {
        message.textContent = errors.join(". ");
        return;
    }

    if (clientId.value) {
        const success = updateClient(
            Number(clientId.value),
            client
        );

        if (!success) {
            message.textContent = "Клиент не найден!";
            return;
        }

        message.textContent = "Данные клиента обновлены!";

    } else {
        addClient(client);

        message.textContent = "Клиент успешно добавлен!";
    }

    saveClients(getClients());

    form.reset();

    clientId.value = "";

    submitButton.textContent = "Добавить клиента";

    cancelButton.hidden = true;

    renderClients();
});

// Поиск клиентов
searchInput.addEventListener("input", function() {
    const result = searchClients(
        getClients(),
        searchInput.value
    );

    renderClients(result);
});

// Редактирование и удаление
document.getElementById("clientList")
    .addEventListener("click", function(event) {

        const id = Number(event.target.dataset.id);

        if (!id) {
            return;
        }

        if (event.target.classList.contains("delete-btn")) {

            const success = deleteClient(id);

            if (success) {
                saveClients(getClients());

                message.textContent = "Клиент удалён!";

                renderClients(
                    searchClients(
                        getClients(),
                        searchInput.value
                    )
                );
            }
        }

        if (event.target.classList.contains("edit-btn")) {

            const client = getClients().find(
                item => item.id === id
            );

            if (!client) {
                return;
            }

            clientId.value = client.id;

            nameInput.value = client.name;
            phoneInput.value = client.phone;
            emailInput.value = client.email;

            submitButton.textContent = "Сохранить изменения";

            cancelButton.hidden = false;

            message.textContent = "Режим редактирования";
        }
    });

// Отмена редактирования
cancelButton.addEventListener("click", function() {
    form.reset();

    clientId.value = "";

    submitButton.textContent = "Добавить клиента";

    cancelButton.hidden = true;

    message.textContent = "";

});

// Сохраняем изменения при закрытии не требуется:
// данные сохраняются после каждой операции.