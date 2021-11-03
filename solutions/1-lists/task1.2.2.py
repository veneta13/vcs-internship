# TODO fix iterate 

def iterate(func):
    answer = lambda func: func
    while True:
        yield answer
        answer = func(func)

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