import unittest


class Predicate:

    def __init__(self, func=None, arg=None):
        self.func = func
        self.func_arg = arg

    def __call__(self, x=None):
        if self.func == present_func:
            if self.func_arg is None:  # check if this is first iteration
                return Predicate(self.func, 0)  # use 0 as iteration flag
            else:
                return self.func()(x)
        else:
            if self.func_arg is None:
                return Predicate(self.func, x)
            else:
                return self.func(self.func_arg)(x)

    def __and__(self, other):
        if callable(other):  # when combining predicates
            return lambda x: True if other(x) and self(x) else False
        else:
            return lambda x: True if other and self(x) else False

    def __rand__(self, other):
        if callable(other):
            return lambda x: True if other(x) and self(x) else False
        else:
            return lambda x: True if other and self(x) else False

    def __or__(self, other):
        if callable(other):
            return lambda x: True if other(x) or self(x) else False
        else:
            return lambda x: True if other or self(x) else False

    def __ror__(self, other):
        if callable(other):
            return lambda x: True if other(x) or self(x) else False
        else:
            return lambda x: True if other or self(x) else False

    def __invert__(self):
        return lambda x: True if self(x) is False else False

    def __rshift__(self, other):
        return lambda x: True if not(self(x)) or other(x) else False


def for_any(*other):
    return lambda x: True if any(func(x) for func in other) else False


def for_all(*other):
    return lambda x: True if all(func(x) for func in other) else False


def gt_func(y):
    return lambda x: True if x > y else False


def lt_func(y):
    return lambda x: True if x < y else False


def eq_func(y):
    return lambda x: True if x == y else False


def oftype_func(t):
    return lambda x: True if isinstance(x, t) else False


def present_func():
    return lambda x: True if x is not None else False


def pred_func(func):
    return lambda x: True if func(x) else False


gt = Predicate(gt_func)
lt = Predicate(lt_func)
eq = Predicate(eq_func)
oftype = Predicate(oftype_func)
present = Predicate(present_func)
pred = Predicate(pred_func)


class PredicatesTest(unittest.TestCase):
    def test_simple_gt(self):
        self.assertTrue(gt(2)(4))
        self.assertFalse(gt(2)(0))

    def test_simple_lt(self):
        self.assertTrue(lt(2)(0))
        self.assertFalse(lt(2)(4))

    def test_combining_gt_and_lt(self):
        self.assertTrue((gt(2) & lt(4))(3))
        self.assertFalse((gt(2) & lt(4))(0))
        self.assertFalse((gt(2) & lt(4))(6))

    def test_combining_lt_and_gt(self):
        self.assertTrue((lt(4) & gt(2))(3))
        self.assertFalse((lt(4) & gt(2))(0))

    def test_pred(self):
        self.assertTrue(pred(lambda x: x > 2)(4))
        self.assertFalse(pred(lambda x: x > 2)(0))

    def test_combiding_pred_with_gt(self):
        self.assertTrue((pred(lambda x: x > 2) & lt(4))(3))

    def test_disjunction(self):
        self.assertTrue((gt(10) | lt(5))(0))
        self.assertTrue((gt(10) | lt(5))(15))

        self.assertFalse((gt(10) | lt(5))(7))

    def test_negation(self):
        self.assertTrue((~gt(10))(5))
        self.assertFalse((~gt(10))(15))

    def test_simple_eq(self):
        self.assertTrue(eq(10)(10))
        self.assertFalse(eq(10)(5))

    def test_implication(self):
        self.assertTrue((gt(10) >> eq(20))(20))
        self.assertTrue((gt(10) >> eq(20))(0))
        self.assertTrue((gt(10) >> eq(0))(0))

        self.assertFalse((gt(10) >> eq(20))(15))

    def test_oftype(self):
        self.assertTrue(oftype(complex)(1j))
        self.assertTrue(oftype(object)(1j))

        self.assertFalse(oftype(int)(1j))

    def test_for_any(self):
        self.assertTrue(for_any(eq(10), eq(5))(10))
        self.assertTrue(for_any(eq(10), eq(5), eq(0))(0))

        self.assertFalse(for_any(eq(10), eq(5), eq(0))(1))

    def test_for_all(self):
        self.assertTrue(for_all(gt(0), lt(10))(5))
        self.assertTrue(for_all(gt(0), lt(10), eq(5))(5))

        self.assertFalse(for_all(gt(0), lt(10), eq(5))(7))
        self.assertFalse(for_all(eq(0), eq(1))(0))

    def test_present(self):
        self.assertTrue(present()(0))
        self.assertFalse(present()(None))


if __name__ == '__main__':
    unittest.main()
