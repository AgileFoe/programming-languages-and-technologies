
# Вариант 15. Мини-библиотека

library = {
    "101": {
        "title": "Мастер и Маргарита",
        "author": "М. Булгаков",
        "available": True
    },
    "102": {
        "title": "Преступление и наказание",
        "author": "Ф. Достоевский",
        "available": True
    },
    "103": {
        "title": "1984",
        "author": "Дж. Оруэлл",
        "available": False
    }
}


def show_books():
    if not library:
        print("Библиотека пуста.")
        return

    for book_id, book in library.items():
        status = "Доступна" if book["available"] else "Выдана"

        print(
            book_id,
            "-",
            book["title"],
            "-",
            book["author"],
            "-",
            status
        )


def checkout_book():
    book_id = input("Введите ID книги: ")

    if book_id not in library:
        print("Книга не найдена.")
    elif not library[book_id]["available"]:
        print("Книга уже выдана.")
    else:
        library[book_id]["available"] = False
        print("Книга выдана.")


def return_book():
    book_id = input("Введите ID книги: ")

    if book_id not in library:
        print("Книга не найдена.")
    elif library[book_id]["available"]:
        print("Книга уже находится в библиотеке.")
    else:
        library[book_id]["available"] = True
        print("Книга возвращена.")


def show_available():
    found = False

    for book_id, book in library.items():
        if book["available"]:
            print(book_id, "-", book["title"])
            found = True

    if not found:
        print("Нет доступных книг.")


def add_book():
    book_id = input("Введите ID книги: ")

    if book_id in library:
        print("Такой ID уже существует.")
        return

    title = input("Название книги: ").strip()
    author = input("Автор книги: ").strip()

    if not title or not author:
        print("Название и автор не могут быть пустыми.")
        return

    library[book_id] = {
        "title": title,
        "author": author,
        "available": True
    }

    print("Книга добавлена.")


while True:
    print("\n--- Мини-библиотека ---")
    print("1. Показать все книги")
    print("2. Выдать книгу")
    print("3. Вернуть книгу")
    print("4. Доступные книги")
    print("5. Добавить книгу")
    print("0. Выход")

    choice = input("Выберите действие: ")

    if choice == "1":
        show_books()
    elif choice == "2":
        checkout_book()
    elif choice == "3":
        return_book()
    elif choice == "4":
        show_available()
    elif choice == "5":
        add_book()
    elif choice == "0":
        break
    else:
        print("Неверная команда.")
