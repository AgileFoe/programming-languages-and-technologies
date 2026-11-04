
import {
    addTransaction,
    calculateBalance
} from "./modules/budget.js";

import { formatMoney } from "./modules/format.js";

let transactions = [];

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const balanceOutput = document.querySelector("#balance");
const list = document.querySelector("#list");

document.querySelector("#add").addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!description || amountInput.value === "" ||
        !Number.isFinite(amount) || amount <= 0) {
        alert("Введите правильное описание и сумму!");
        return;
    }

    transactions = addTransaction(
        transactions,
        description,
        amount,
        type
    );

    updateInterface();

    descriptionInput.value = "";
    amountInput.value = "";
});

function updateInterface() {
    const balance = calculateBalance(transactions);

    balanceOutput.textContent = formatMoney(balance);

    list.innerHTML = "";

    transactions.forEach(item => {
        const li = document.createElement("li");

        const sign = item.type === "income" ? "+" : "-";

        li.textContent =
            `${item.description}: ${sign}${formatMoney(item.amount)}`;

        list.appendChild(li);
    });
}
