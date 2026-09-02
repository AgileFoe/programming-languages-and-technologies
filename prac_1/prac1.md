задание 3
Введите радиус круга. Найдите площадь круга и длину окружности. Используйте math.pi.
    import math

    r = int(input("введите радиус круга: "))
    pi = math.pi

    print(f" площадь круга: {(pi * (r**2))}мм\n", f"длина окружности: {(2 * pi * r)}мм")

    вывод:
    PS C:\Users\Student\Project\programming-languages--and-technologies> & C:/Users/Student/AppData/Local/Programs/Python/Python312/python.exe c:/Users/Student/Project/programming-languages--and-technologies/prac_1/task3.py
    введите радиус круга: 9
     площадь круга: 254.46900494077323мм
     длина окружности: 56.548667764616276мм
     

импорт модуля math
добавление переменной с возможностью ввода числа
создание переменной с числом пи из модуля
вывод результата через print: площадь круга по формуле "S = pi r^2" и длина окружности по формуле "C = 2 pi r"

Задание 11
Введите цену товара и его количество. Рассчитайте стоимость покупки, сумму НДС 12% и итоговую стоимость.
    cost = int(input("введите стоимость товара: "))
    q = int(input("введите количество товара: "))

    sum = cost * q
    nds = sum * 0.12

    print(f" стоимость: {sum}$", f"  НДС: {nds}$\n", f"сумма: {sum + nds}$")

    вывод:
    PS C:\Users\Student\Project\programming-languages--and-technologies> & C:/Users/Student/AppData/Local/Programs/Python/Python312/python.exe c:/Users/Student/Project/programming-languages--and-technologies/prac_1/taks11.py
    введите стоимость товара: 19
    введите количество товара: 5
     стоимость: 95$   НДС: 11.4$
     сумма: 106.4$
    
добавление двух переменных с возможностью ввода числа
еще переменная для произвеления стоимости и числа
переменная ндс для вычета 12 процентов
через print вывод стоимости, ндс и суммы товаров

задание 18
Введите трехзначное число. Сформируйте число, записанное теми же цифрами в обратном порядке. Например: 572 -> 275. Не использовать строки.
    num = int(input("введите трехзначное число: "))

    if 100 < num < 999:
        first = num % 10
        second = (num / 10) % 10
        third = (num / 100) % 10
        reverse = (int(first) * 100) + (int(second) * 10) + int(third)
    else:
        print("введите трехзначное число!")
        
    print("число в обраном порядке: ", reverse)

    вывод:
    PS C:\Users\Student\Project\programming-languages--and-technologies> & C:/Users/Student/AppData/Local/Programs/Python/Python312/python.exe c:/Users/Student/Project/programming-languages--and-technologies/prac_1/task18.py
    введите трехзначное число: 176
    число в обраном порядке:  671

переменная для ввода пользователем трехзначного числа
дольше условие для проверки является ли число трехзначным "100 < num < 999"
создание переменных для получения числа каждого десятка по отдельности "num % 10"
и переменная суммы чисел ("int" для удаления дроби чисел)
и вывод