
import json
import os
import re

GROUPS = ["Семья", "Друзья", "Работа", "Учёба", "Другое"]


def input_name():
    while True:
        name = input("Имя: ").strip()

        if not name:
            print("Ошибка: имя не может быть пустым.")
            continue

        return name


def input_phone():
    while True:
        phone = input("Телефон (11 цифр): ").strip()
        phone = re.sub(r"[\s()\-]", "", phone)

        digits = phone[1:] if phone.startswith("+") else phone

        if not digits.isdigit() or len(digits) != 11:
            print("Ошибка: телефон должен содержать 11 цифр.")
            continue

        return phone


def input_email():
    while True:
        email = input("E-mail (необязательно): ").strip().lower()

        if email and not re.fullmatch(
            r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+",
            email
        ):
            print("Ошибка: неправильный e-mail.")
            continue

        return email


def input_group(default="Другое"):
    while True:
        group = input(
            f"Группа ({', '.join(GROUPS)}) "
            f"[Enter — {default}]: "
        ).strip()

        if not group:
            return default

        for valid_group in GROUPS:
            if group.casefold() == valid_group.casefold():
                return valid_group

        print("Ошибка: выберите группу:", ", ".join(GROUPS))


class ContactBook:
    def __init__(self, filename="contacts.json"):
        self.filename = filename
        self.contacts = []

        if os.path.exists(self.filename):
            self.load()

    def save(self):
        try:
            with open(self.filename, "w", encoding="utf-8") as file:
                json.dump(
                    self.contacts,
                    file,
                    ensure_ascii=False,
                    indent=2
                )
        except OSError as error:
            raise ValueError(
                f"Не удалось сохранить контакты: {error}"
            )

    def load(self):
        try:
            with open(self.filename, "r", encoding="utf-8") as file:
                data = json.load(file)

            if not isinstance(data, list):
                raise ValueError("Неверный формат файла.")

            required = {"id", "name", "phone", "email", "group"}

            for contact in data:
                if (
                    not isinstance(contact, dict)
                    or not required.issubset(contact)
                ):
                    raise ValueError("Неверная структура контакта.")

                if (
                    not isinstance(contact["id"], int)
                    or contact["id"] < 1
                ):
                    raise ValueError("Неверный ID контакта.")

                if not all(
                    isinstance(contact[field], str)
                    for field in ("name", "phone", "email", "group")
                ):
                    raise ValueError("Неверные данные контакта.")

                digits = (
                    contact["phone"][1:]
                    if contact["phone"].startswith("+")
                    else contact["phone"]
                )

                if not digits.isdigit() or len(digits) != 11:
                    raise ValueError(
                        "В файле найден телефон не из 11 цифр."
                    )

            ids = [c["id"] for c in data]
            phones = [c["phone"] for c in data]

            if len(ids) != len(set(ids)):
                raise ValueError("Обнаружены повторяющиеся ID.")

            if len(phones) != len(set(phones)):
                raise ValueError("Обнаружены повторяющиеся телефоны.")

            self.contacts = data

        except (json.JSONDecodeError, OSError, TypeError, ValueError) as error:
            print(f"Ошибка загрузки контактов: {error}")
            self.contacts = []

    @staticmethod
    def normalize_phone(phone):
        phone = re.sub(r"[\s()\-]", "", phone.strip())
        digits = phone[1:] if phone.startswith("+") else phone

        if not digits.isdigit() or len(digits) != 11:
            raise ValueError(
                "Телефон должен содержать ровно 11 цифр."
            )

        return phone

    @staticmethod
    def validate_email(email):
        email = email.strip().lower()

        if email and not re.fullmatch(
            r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+",
            email
        ):
            raise ValueError("Неправильный e-mail.")

        return email

    @staticmethod
    def normalize_group(group):
        group = group.strip()

        if not group:
            return "Другое"

        for valid_group in GROUPS:
            if group.casefold() == valid_group.casefold():
                return valid_group

        raise ValueError(
            "Такой группы нет. Выберите: " + ", ".join(GROUPS)
        )

    def next_id(self):
        return max(
            (contact["id"] for contact in self.contacts),
            default=0
        ) + 1

    def add(self, name, phone, email="", group="Другое"):
        name = name.strip()

        if not name:
            raise ValueError("Введите имя.")

        phone = self.normalize_phone(phone)
        email = self.validate_email(email)
        group = self.normalize_group(group)

        if any(c["phone"] == phone for c in self.contacts):
            raise ValueError(
                "Контакт с таким телефоном уже существует."
            )

        contact = {
            "id": self.next_id(),
            "name": name,
            "phone": phone,
            "email": email,
            "group": group
        }

        self.contacts.append(contact)

        try:
            self.save()
        except ValueError:
            self.contacts.remove(contact)
            raise

        return contact

    def find(self, contact_id):
        for contact in self.contacts:
            if contact["id"] == contact_id:
                return contact

        raise ValueError("Контакт не найден.")

    def edit(self, contact_id):
        contact = self.find(contact_id)

        print("Введите новые данные.")
        print("Чтобы оставить прежнее значение, нажмите Enter.")

        # Каждое поле проверяется сразу после ввода
        while True:
            name = input(f'Имя [{contact["name"]}]: ').strip()

            if not name:
                break

            if name:
                break

        while True:
            phone_input = input(
                f'Телефон [{contact["phone"]}]: '
            ).strip()

            if not phone_input:
                break

            try:
                phone = self.normalize_phone(phone_input)
            except ValueError as error:
                print("Ошибка:", error)
                continue

            if any(
                c["id"] != contact_id and c["phone"] == phone
                for c in self.contacts
            ):
                print("Ошибка: контакт с таким телефоном уже существует.")
                continue

            break

        while True:
            email_input = input(
                f'E-mail [{contact["email"]}]: '
            ).strip()

            if not email_input:
                break

            try:
                email = self.validate_email(email_input)
            except ValueError as error:
                print("Ошибка:", error)
                continue

            break

        while True:
            group_input = input(
                f'Группа [{contact["group"]}]: '
            ).strip()

            if not group_input:
                break

            try:
                group = self.normalize_group(group_input)
            except ValueError as error:
                print("Ошибка:", error)
                continue

            break

        old_contact = contact.copy()

        if name:
            contact["name"] = name

        if phone_input:
            contact["phone"] = phone

        if email_input:
            contact["email"] = email

        if group_input:
            contact["group"] = group

        try:
            self.save()
        except ValueError:
            contact.update(old_contact)
            raise

        print("Контакт обновлён.")

    def delete(self, contact_id):
        contact = self.find(contact_id)
        self.contacts.remove(contact)

        try:
            self.save()
        except ValueError:
            self.contacts.append(contact)
            raise

        print("Контакт удалён.")

    def search(self, query):
        query = query.strip().casefold()

        if not query:
            raise ValueError("Введите данные для поиска.")

        return [
            c for c in self.contacts
            if query in c["name"].casefold()
            or query in c["phone"]
            or query in c["email"].casefold()
        ]

    def show(self, contacts=None):
        if contacts is None:
            contacts = self.contacts

        if not contacts:
            print("Контактов нет.")
            return

        for contact in sorted(
            contacts,
            key=lambda c: c["name"].casefold()
        ):
            print(
                f'{contact["id"]}. {contact["name"]} | '
                f'{contact["phone"]} | '
                f'{contact["email"] or "—"} | '
                f'{contact["group"]}'
            )


def read_id():
    while True:
        value = input("ID контакта: ").strip()

        try:
            contact_id = int(value)
            if contact_id < 1:
                raise ValueError
            return contact_id
        except ValueError:
            print("Ошибка: введите положительное целое число.")


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
                name = input_name()
                phone = input_phone()
                email = input_email()
                group = input_group()

                try:
                    contact = book.add(name, phone, email, group)
                    print("Добавлен контакт:", contact["name"])
                except ValueError as error:
                    print("Ошибка:", error)

            elif choice == "3":
                book.edit(read_id())

            elif choice == "4":
                book.delete(read_id())

            elif choice == "5":
                query = input(
                    "Введите имя, телефон или e-mail: "
                )
                book.show(book.search(query))

            elif choice == "6":
                for group in GROUPS:
                    print(f"\n{group}:")
                    group_contacts = [
                        c for c in book.contacts
                        if c["group"] == group
                    ]
                    book.show(group_contacts)

            elif choice == "0":
                print("До свидания!")
                break

            else:
                print("Ошибка: неизвестная команда.")

        except ValueError as error:
            print("Ошибка:", error)


if __name__ == "__main__":
    main()
