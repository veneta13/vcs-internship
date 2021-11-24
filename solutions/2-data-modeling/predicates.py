class Predicate:

    def __init__(self, func=None):
        self.func = func

    def __call__(self, x=None):
        return self.func(x)

    def __and__(self, other):
        return lambda x: self(x) & other(x)

    def __rand__(self, other):
        return lambda x: other(x) & self(x)

    def __or__(self, other):
        return lambda x: self(x) | other(x)

    def __ror__(self, other):
        return lambda x: other(x) | self(x)

    def __invert__(self):
        return lambda x: not self(x)

    def __rshift__(self, other):
        return lambda x: other(x) if self(x) else True


def for_any(*preds):
    return lambda x: any(item(x) for item in preds)


def for_all(*preds):
    return lambda x: all(item(x) for item in preds)


def gt(x):
    return Predicate(lambda y: y > x)


def lt(x):
    return Predicate(lambda y: y < x)


def eq(x):
    return Predicate(lambda y: y == x)


def oftype(t):
    return Predicate(lambda x: isinstance(x, t))


def present():
    return Predicate(lambda x: x is not None)


def pred(func):
    return Predicate(lambda x: func(x))
