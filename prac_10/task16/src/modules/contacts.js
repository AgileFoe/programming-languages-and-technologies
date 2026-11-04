let clients = [];

export function setClients(data) {
    clients = [...data];
}

export function getClients() {
    return [...clients];
}

export function addClient(client) {
    const newClient = {
        id: Date.now() + Math.random(),
        name: client.name,
        phone: client.phone,
        email: client.email
    };

    clients.push(newClient);

    return newClient;
}

export function updateClient(id, updatedData) {
    const index = clients.findIndex(
        client => client.id === id
    );

    if (index === -1) {
        return false;
    }

    clients[index] = {
        ...clients[index],
        ...updatedData
    };

    return true;
}

export function deleteClient(id) {
    const oldLength = clients.length;

    clients = clients.filter(
        client => client.id !== id
    );

    return clients.length !== oldLength;
}