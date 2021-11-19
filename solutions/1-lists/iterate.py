def identity(x):
    return x

def compose(f, g):
    return lambda x: g(f(x))

def iterate(func):
    current_func = identity
    
    while True:
        yield current_func
        current_func = compose(current_func, func)

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