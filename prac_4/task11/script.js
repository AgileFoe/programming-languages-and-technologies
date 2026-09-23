const form = document.getElementById("doctorForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const selectedVisitType = document.querySelector(
        'input[name="visitType"]:checked'
    );

    const fullNameError = document.getElementById("fullNameError");
    const doctorError = document.getElementById("doctorError");
    const dateError = document.getElementById("dateError");
    const timeError = document.getElementById("timeError");
    const visitTypeError = document.getElementById("visitTypeError");
    const result = document.getElementById("result");

    fullNameError.textContent = "";
    doctorError.textContent = "";
    dateError.textContent = "";
    timeError.textContent = "";
    visitTypeError.textContent = "";
    result.textContent = "";

    let isValid = true;

    if (fullName === "") {
        fullNameError.textContent = "Введите ФИО";
        isValid = false;
    }

    if (doctor === "") {
        doctorError.textContent = "Выберите специальность врача";
        isValid = false;
    }

    if (date === "") {
        dateError.textContent = "Выберите дату";
        isValid = false;
    }

    if (time === "") {
        timeError.textContent = "Выберите время";
        isValid = false;
    }

    if (selectedVisitType === null) {
        visitTypeError.textContent = "Выберите тип приёма";
        isValid = false;
    }

    if (isValid) {
        result.textContent =
            "Вы успешно записались! " +
            "ФИО: " + fullName +
            ", врач: " + doctor +
            ", дата: " + date +
            ", время: " + time +
            ", тип приёма: " + selectedVisitType.value;
    }
});
