export function searchClients(clients, query) {
    const search = query.trim().toLowerCase();

    if (!search) {
        return clients;
    }

    return clients.filter(client =>
        client.name.toLowerCase().includes(search) ||
        client.phone.toLowerCase().includes(search) ||
        client.email.toLowerCase().includes(search)
    );
}