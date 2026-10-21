import json
import os
import re

GROUPS = ["Семья", "Друзья", "Работа", "Учёба", "Другое"]


class ContactBook:
    def __init__(self, filename="contacts.json"):
        self.filename = filename
        self.contacts = []
        if os.path.exists(filename):
            self.load()

    def save(self):
        with open(self.filename, "w", encoding="utf-8") as file:
            json.dump(self.contacts, file, ensure_ascii=False, indent=2)

    def load(self):
        try:
            with open(self.filename, "r", encoding="utf-8") as file:
                self.contacts = json.load(file)
        except (json.JSONDecodeError, TypeError):
            print("Ошибка: файл контактов повреждён.")
            self.contacts = []

    def next_id(self):
        return max([c["id"] for c in self.contacts], default=0) + 1

    def add(self, name, phone, email, group):
        name = name.strip()
        phone = re.sub(r"[\s()\-]", "", phone.strip())
        email = email.strip().lower()
        group = group.strip().title() if group.strip() else "Другое"

        if not name:
            raise ValueError("Введите имя.")
        if not phone.lstrip("+").isdigit() or not 10 <= len(phone.lstrip("+")) <= 15:
            raise ValueError("Телефон должен содержать от 10 до 15 цифр.")
        if email and not re.fullmatch(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+", email):
            raise ValueError("Неправильный e-mail.")
        if group not in GROUPS:
            raise ValueError("Такой группы нет. Выберите: " + ", ".join(GROUPS))
        if any(c["phone"] == phone for c in self.contacts):
            raise ValueError("Контакт с таким телефоном уже существует.")

        contact = {
            "id": self.next_id(),
            "name": name,
            "phone": phone,
            "email": email,
            "group": group
        }
        self.contacts.append(contact)
        self.save()
        return contact

    def find(self, contact_id):
        for contact in self.contacts:
            if contact["id"] == contact_id:
                return contact
        raise ValueError("Контакт не найден.")

    def edit(self, contact_id):
        contact = self.find(contact_id)
        for field in ["name", "phone", "email", "group"]:
            new_value = input(f"{field} [{contact[field]}]: ").strip()
            if new_value:
                contact[field] = new_value
        self.save()
        print("Контакт обновлён.")

    def delete(self, contact_id):
        contact = self.find(contact_id)
        self.contacts.remove(contact)
        self.save()
        print("Контакт удалён.")

    def search(self, query):
        query = query.lower().strip()
        return [
            c for c in self.contacts
            if query in c["name"].lower()
            or query in c["phone"]
            or query in c["email"].lower()
        ]

    def show(self, contacts=None):
        if contacts is None:
            contacts = self.contacts
        if not contacts:
            print("Контактов нет.")
            return
        for c in sorted(contacts, key=lambda x: x["name"].lower()):
            print(f'{c["id"]}. {c["name"]} | {c["phone"]} | '
                  f'{c["email"]} | {c["group"]}')


def main():
    book = ContactBook()

    while True:
        print("""
--- МЕНЕДЖЕР КОНТАКТОВ ---
1. Показать все контакты
2. Добавить контакт
3. Изменить контакт
4. Удалить контакт
5. Найти контакт
6. Показать по группам
0. Выход
""")
        choice = input("Выберите действие: ").strip()

        try:
            if choice == "1":
                book.show()

            elif choice == "2":
                name = input("Имя: ")
                phone = input("Телефон: ")
                email = input("E-mail (необязательно): ")
                print("Группы:", ", ".join(GROUPS))
                group = input("Группа (Enter — Другое): ")
                contact = book.add(name, phone, email, group)
                print("Добавлен контакт:", contact["name"])

            elif choice == "3":
                contact_id = int(input("ID контакта: "))
                book.edit(contact_id)

            elif choice == "4":
                contact_id = int(input("ID контакта: "))
                book.delete(contact_id)

            elif choice == "5":
                query = input("Введите имя, телефон или e-mail: ")
                book.show(book.search(query))

            elif choice == "6":
                for group in GROUPS:
                    print(f"\n{group}:")
                    book.show([c for c in book.contacts if c["group"] == group])

            elif choice == "0":
                print("До свидания!")
                break

            else:
                print("Неизвестная команда.")

        except ValueError as error:
            print("Ошибка:", error)


if __name__ == "__main__":
    main()