from functools import reduce

def compose(*funcs):
    return reduce(lambda func1, func2: lambda *args: func1(func2(*args)), funcs)

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