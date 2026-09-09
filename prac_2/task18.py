num = int(input("ведите пятизначное число:"))

if 9999 < num < 100000:
    first = num // 10000
    second = (num // 1000) % 10
    third =  (num // 100) % 10
    fourth = (num // 10) % 10
    fifth = num % 10

    sum = first + second + third + fourth + fifth
    reverse = (fifth * 10000) + (fourth * 1000) + (third * 100) + (second * 10) + first

    print(f"сумма 5-ти цифр числа - {sum}",f"обратный порядок чисел - {reverse}")
else:
    print("введите пятизначное число!")