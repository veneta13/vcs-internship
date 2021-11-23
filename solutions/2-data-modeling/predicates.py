class Predicate:

    def __init__(self, func=None):
        self.func = func

    def __get_func(self, x):
        if (self.func == present_func):
            return self.func()
        return lambda y = None: self.func(x) if y is None else self.func(x)(y)

    def __call__(self, x=None):
        return Predicate(self.__get_func(x))

    def __bool__(self):
        return self.func()

    def __and__(self, other):
        return Predicate(lambda y: self.func(y) and other.func(y))

    def __rand__(self, other):
        return Predicate(lambda y: other.func(y) and self.func(y))

    def __or__(self, other):
        return Predicate(lambda y: self.func(y) or other.func(y))

    def __ror__(self, other):
        return Predicate(lambda y: other.func(y) or self.func(y))

    def __invert__(self):
        return Predicate(lambda y: self.func(y) is False)

    def __rshift__(self, other):
        return Predicate(lambda y: not(self.func(y)) or other.func(y))


def for_any(*preds):
    return lambda y: any(item.func(y) for item in preds)


def for_all(*preds):
    return lambda y: all(item.func(y) for item in preds)


def gt_func(y):
    return lambda x: x > y


def lt_func(y):
    return lambda x: x < y


def eq_func(y):
    return lambda x: x == y


def oftype_func(t):
    return lambda x: isinstance(x, t)


def present_func():
    return lambda x: x is not None


def pred_func(func):
    return lambda x: func(x)


gt = Predicate(gt_func)
lt = Predicate(lt_func)
eq = Predicate(eq_func)
oftype = Predicate(oftype_func)
present = Predicate(present_func)
pred = Predicate(pred_func)
