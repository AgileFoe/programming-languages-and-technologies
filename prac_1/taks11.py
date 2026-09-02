cost = int(input("введите стоимость товара: "))
q = int(input("введите количество товара: "))

sum = cost * q
nds = sum * 0.12

print(f" стоимость: {sum}$", f"  НДС: {nds}$\n", f"сумма: {sum + nds}$")