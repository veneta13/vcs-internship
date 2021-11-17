def gt(x):
    return lambda y : True if y > x else False

def eq(x):
    return lambda y : True if y == x else False

def lt(x):
    return lambda y : True if y < x else False

def oftype(t):
    return lambda y : True if isinstance(y, t) else False

def present():
    return lambda y : True if y is not None else False

def pred(function):
    return lambda y: True if function(y) == True else False

# digit = oftype(int) & gt(-1) & lt(10)
# binary = eq(0) | eq(1)
# number = for_any(oftype(int), oftype(float), oftype(complex))
# is_the_empty_string = pred(lambda x: x is "")