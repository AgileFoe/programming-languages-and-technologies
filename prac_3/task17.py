class Library:
    def __init__(self):
        self.books = []

    def add_books(self, book):
        self.books.append(book)

    def delete_book(self, name):
        for book in self.books:
            if book == name:
                self.books.remove(book)
                return
        print(f"книга '{name}' не найдена")

    def search(self, name):
        for book in self.books:
            if book == name:
                return f"книга '{book}' есть"
        print(f"книга '{name}' не найдена")
result = Library()


result.add_books("Война и мир")
result.add_books("Гарри Поттер")
result.add_books("Властелин колец")
result.add_books("Преступление и наказание")
result.add_books("Мастер и Маргарита")

print(result.books)

print(result.search("Преступление и наказание"))
print(result.search("Зеленая миля"))

result.delete_book("Гарри Поттер")

print(result.books)