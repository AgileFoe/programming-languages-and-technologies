minutes = int(input("введите количество минут:"))

hours = minutes // 60
res = minutes % 60

print(f"часов: {hours}", f"минуты: {res}")