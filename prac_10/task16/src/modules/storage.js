const STORAGE_KEY = "crm_clients";

export function saveClients(clients) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(clients)
    );
}

export function loadClients() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        const clients = JSON.parse(data);

        return Array.isArray(clients) ? clients : [];

    } catch (error) {
        console.error("Ошибка загрузки данных:", error);

        return [];
    }
}

export function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}