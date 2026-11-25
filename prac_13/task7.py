
# Вариант 7. Учет посещаемости

attendance = {
    "Алия": True,
    "Дамир": False,
    "Мирас": True
}

def show_students():
    if not attendance:
        print("Список пуст.")
        return

    for name, status in attendance.items():
        if status:
            print(name, "- присутствует")
        else:
            print(name, "- отсутствует")


def add_student():
    name = input("Введите имя студента: ")

    if name in attendance:
        print("Такой студент уже существует.")
    elif not name.strip():
        print("Имя не может быть пустым.")
    else:
        attendance[name] = False
        print("Студент добавлен.")


def change_status():
    name = input("Введите имя студента: ")

    if name not in attendance:
        print("Студент не найден.")
        return

    status = input("1 - присутствует, 0 - отсутствует: ")

    if status == "1":
        attendance[name] = True
        print("Статус изменен.")
    elif status == "0":
        attendance[name] = False
        print("Статус изменен.")
    else:
        print("Неверный статус.")


def count_present():
    count = sum(attendance.values())
    print("Присутствуют:", count)


while True:
    print("\n--- Учет посещаемости ---")
    print("1. Показать студентов")
    print("2. Добавить студента")
    print("3. Изменить статус")
    print("4. Подсчитать присутствующих")
    print("0. Выход")

    choice = input("Выберите действие: ")

    if choice == "1":
        show_students()
    elif choice == "2":
        add_student()
    elif choice == "3":
        change_status()
    elif choice == "4":
        count_present()
    elif choice == "0":
        break
    else:
        print("Неверная команда.")
