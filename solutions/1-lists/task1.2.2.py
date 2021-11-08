# TODO return values

import functools

def compose2(function1, function2):
    return lambda *a: function1(function2(*a))

def compose(*functions):
    return functools.reduce(compose2, *functions)

def iterate(func):
    answer = lambda func: func
    funcs = [func]
    while True:
        yield lambda x = answer: compose(funcs)
        funcs.append(func)

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