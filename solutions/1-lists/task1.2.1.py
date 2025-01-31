def groupby(func, seq):
    dictionary = {}
    for x in seq:
        if func(x) in dictionary:
            if type(dictionary[func(x)]) != list:
                dictionary[func(x)] = [dictionary[func(x)], x]
            else:
                dictionary[func(x)].append(x)
        else:
            dictionary[func(x)] = x
    return dictionary


print(groupby(lambda x: x % 2, [0, 1, 2, 3, 4, 5, 6, 7]))
