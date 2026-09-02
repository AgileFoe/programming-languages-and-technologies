num = int(input("введите трехзначное число: "))

if 100 < num < 999:
    first = num % 10
    second = (num / 10) % 10
    third = (num / 100) % 10
    reverse = (int(first) * 100) + (int(second) * 10) + int(third)
else:
    print("введите трехзначное число!")
    
print("число в обраном порядке: ", reverse)