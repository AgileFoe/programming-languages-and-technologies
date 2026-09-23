const form = document.getElementById("courseForm");

form.addEventListener("submit", function(event) {

    // Не перезагружаем страницу
    event.preventDefault();

    // Получаем значения полей
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const direction = document.getElementById("direction").value;

    // Получаем выбранный radio
    const selectedFormat = document.querySelector(
        'input[name="format"]:checked'
    );

    // Получаем элементы для ошибок
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const directionError = document.getElementById("directionError");
    const formatError = document.getElementById("formatError");
    const result = document.getElementById("result");

    // Очищаем старые сообщения
    nameError.textContent = "";
    phoneError.textContent = "";
    directionError.textContent = "";
    formatError.textContent = "";
    result.textContent = "";

    let isValid = true;

    // Проверяем имя
    if (name === "") {
        nameError.textContent = "Введите имя";
        isValid = false;
    }

    // Проверяем телефон
    if (phone === "") {
        phoneError.textContent = "Введите номер телефона";
        isValid = false;
    }

    // Проверяем направление
    if (direction === "") {
        directionError.textContent = "Выберите направление обучения";
        isValid = false;
    }

    // Проверяем формат
    if (selectedFormat === null) {
        formatError.textContent = "Выберите формат обучения";
        isValid = false;
    }

    // Если ошибок нет
    if (isValid) {
        result.textContent =
            "Заявка успешно отправлена! " +
            "Имя: " + name +
            ", телефон: " + phone +
            ", направление: " + direction +
            ", формат: " + selectedFormat.value;
    }
});