mass = int(input("введите массу: "))
height = int(input("введите рост: "))

conv = height / 100
BMI = mass / (conv * conv)

print(f"индекс массы тела: {BMI}")

if BMI < 18.5:
    print("у вас дифицит веса!")
elif 18.5 <= BMI <= 24.9:
    print("у вас норма веса!")
else:
    print("у вас избыточный вес!")