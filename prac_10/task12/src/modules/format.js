
export function formatMoney(amount) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "KZT",
        maximumFractionDigits: 2
    }).format(amount);
}
