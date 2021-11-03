def zip_with(func, *iterables):
    while True:
        if len(iterables) == 0:
            yield 0 
        else:
            for i in range(0, min([len(number) for number in iterables])):
                args = list()
                for element in iterables:
                    args.append(element[i])
                yield func(*args)

def concat3(x, y, z):
    return x + y + z

gen1 = zip_with(concat3, ('1', '2', '3', '4', '5'), ('1', '2'), ('1', '2', '3', '4', '5', '6'))
print(next(gen1))
gen2 = zip_with(concat3, ['John', 'Miles'], [' '] * 2 ,['Coltrane', 'Davis'])
print(next(gen2))
gen3 = zip_with(concat3, )
print(next(gen3))