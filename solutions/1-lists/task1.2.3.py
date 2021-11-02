def zip_with(func, *iterables):
    if len(iterables) == 0:
        return 0 
    for i in range(0, min([len(number) for number in iterables])):
        args = list()
        for element in iterables:
            args.append(element[i])
        return concat3(*args)

def concat3(x, y, z):
        return x + y + z

print(zip_with(concat3, (1, 2, 3, 4, 5), (1, 2), (1, 2, 3, 4, 5, 6)))
print(zip_with(concat3, ['John', 'Miles'], [' '] * 2 ,['Coltrane', 'Davis']))
print(zip_with(concat3, ))