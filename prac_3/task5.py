import math

rad = int(input("введите радиус круга: "))

class Circle:
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return math.pi * (self.radius ** 2)
    def diametr(self):
        return 2 * self.radius
        
    def circum(self):
        return 2 * math.pi * self.radius
        
    
result = Circle(rad)

print(f" радиус круга {result.radius}см\n", f"площадь круга {result.area()}см\n", f"диаметр круга {result.diametr()}см\n", f"длина окружности {result.circum()}см")