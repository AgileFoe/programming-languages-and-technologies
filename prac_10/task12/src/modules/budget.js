
export function addTransaction(list, description, amount, type) {
    const transaction = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        type: type
    };

    return [...list, transaction];
}

export function calculateBalance(list) {
    return list.reduce((total, item) => {
        if (item.type === "income") {
            return total + item.amount;
        }

        return total - item.amount;
    }, 0);
}
