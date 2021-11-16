from functools import reduce

def compose2(func1, func2):
    return lambda *args: func1(func2(*args))

def compose(*funcs):
    composition = lambda func1, func2: compose2(func1, func2)
    return reduce(composition, funcs)

def iterate(func):
    answer = lambda func: func
    while True:
        yield answer
        answer = compose(func, answer)

def double(x):
    return 2 * x

i = iterate(double)
f = next(i)
print(f(3))
# 3
f = next(i)
print(f(3))
# 6
f = next(i)
print(f(3))
# 12
f = next(i)
print(f(3))
# 24