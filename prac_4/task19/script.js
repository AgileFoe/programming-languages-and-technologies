const form = document.getElementById("internshipForm");

const motivation = document.getElementById("motivation");
const counter = document.getElementById("counter");

// Счётчик символов
motivation.addEventListener("input", function() {
    counter.textContent = motivation.value.length + " символов";
});

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const direction = document.getElementById("direction").value;
    const motivationText = motivation.value.trim();

    // Получаем все выбранные checkbox
    const selectedSkills = document.querySelectorAll(
        'input[name="skill"]:checked'
    );

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const courseError = document.getElementById("courseError");
    const directionError = document.getElementById("directionError");
    const skillsError = document.getElementById("skillsError");
    const motivationError = document.getElementById("motivationError");
    const result = document.getElementById("result");

    // Очищаем старые ошибки
    fullNameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    directionError.textContent = "";
    skillsError.textContent = "";
    motivationError.textContent = "";
    result.textContent = "";

    let isValid = true;

    // Проверяем ФИО
    if (fullName === "") {
        fullNameError.textContent = "Введите ФИО";
        isValid = false;
    }

    // Проверяем e-mail
    if (email === "") {
        emailError.textContent = "Введите e-mail";
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "E-mail должен содержать символ @";
        isValid = false;
    }

    // Проверяем курс
    if (course === "") {
        courseError.textContent = "Выберите курс";
        isValid = false;
    }

    // Проверяем направление
    if (direction === "") {
        directionError.textContent = "Выберите направление";
        isValid = false;
    }

    // Проверяем количество навыков
    if (selectedSkills.length < 2) {
        skillsError.textContent = "Выберите минимум два навыка";
        isValid = false;
    }

    // Проверяем мотивационный текст
    if (motivationText.length < 50) {
        motivationError.textContent =
            "Мотивационный текст должен содержать минимум 50 символов";
        isValid = false;
    }

    // Если все проверки пройдены
    if (isValid) {

        let skills = [];

        selectedSkills.forEach(function(skill) {
            skills.push(skill.value);
        });

        result.innerHTML =
            "<strong>Заявка успешно отправлена!</strong><br>" +
            "ФИО: " + fullName + "<br>" +
            "E-mail: " + email + "<br>" +
            "Курс: " + course + "<br>" +
            "Направление: " + direction + "<br>" +
            "Навыки: " + skills.join(", ") + "<br>" +
            "Мотивация: " + motivationText;
    }
});