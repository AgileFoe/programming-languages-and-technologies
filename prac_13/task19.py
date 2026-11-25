
# Вариант 19. Граф маршрутов и алгоритм BFS

from collections import deque

# Словарь смежности
graph = {}


def add_route(city1, city2):
    if not city1 or not city2:
        print("Названия городов не могут быть пустыми.")
        return

    graph.setdefault(city1, [])
    graph.setdefault(city2, [])

    if city2 not in graph[city1]:
        graph[city1].append(city2)

    if city1 not in graph[city2]:
        graph[city2].append(city1)

    print("Маршрут добавлен.")


def show_graph():
    if not graph:
        print("Граф пуст.")
        return

    print("\nСписок маршрутов:")

    for city, neighbors in graph.items():
        print(city, "->", neighbors)


def bfs(start, finish):
    if start not in graph or finish not in graph:
        return None

    if start == finish:
        return [start]

    queue = deque([start])

    visited = {start}

    previous = {start: None}

    while queue:
        current = queue.popleft()

        for neighbor in graph[current]:

            if neighbor not in visited:
                visited.add(neighbor)

                previous[neighbor] = current

                if neighbor == finish:
                    path = []
                    node = finish

                    while node is not None:
                        path.append(node)
                        node = previous[node]

                    return path[::-1]

                queue.append(neighbor)

    return None


# Демонстрационные маршруты
add_route("Алматы", "Конаев")
add_route("Алматы", "Талдыкорган")
add_route("Конаев", "Талдыкорган")
add_route("Талдыкорган", "Уштобе")
add_route("Конаев", "Капшагай")


while True:
    print("\n--- Граф маршрутов ---")
    print("1. Показать граф")
    print("2. Добавить маршрут")
    print("3. Найти кратчайший путь")
    print("0. Выход")

    choice = input("Выберите действие: ")

    if choice == "1":
        show_graph()

    elif choice == "2":
        city1 = input("Первый город: ").strip()
        city2 = input("Второй город: ").strip()

        add_route(city1, city2)

    elif choice == "3":
        start = input("Начальный город: ").strip()
        finish = input("Конечный город: ").strip()

        path = bfs(start, finish)

        if path:
            print("Кратчайший путь:")
            print(" -> ".join(path))
            print("Количество переходов:", len(path) - 1)
        else:
            print("Маршрут не найден.")

    elif choice == "0":
        break

    else:
        print("Неверная команда.")
