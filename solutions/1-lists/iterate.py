def compose(*funcs):
    if funcs:
        tail = compose(*funcs[1:])
        return lambda arg: funcs[0](tail(arg))
    else:
        return lambda func: func

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