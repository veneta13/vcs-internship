import operator
from functools import reduce


class Lazy:
    '''Lazy number class'''

    def __init__(self, data=0):
        if isinstance(data, Lazy):
            self.data = data.data
            self.left = None
            self.right = None
        else:
            self.data = data

    def __add__(self, other):
        temp = Lazy(operator.add)
        temp.left = self
        temp.right = other
        return temp

    def __radd__(self, other):
        return self + other

    def __sub__(self, other):
        temp = Lazy(operator.sub)
        temp.left = self
        temp.right = other
        return temp

    def __rsub__(self, other):
        temp = Lazy(operator.sub)
        temp.left = self
        temp.right = other
        return temp

    def __mul__(self, other):
        temp = Lazy(operator.mul)
        temp.left = self
        temp.right = other
        return temp

    def __rmul__(self, other):
        return self * other

    def __pow__(self, other):
        temp = Lazy(operator.pow)
        temp.left = self
        temp.right = other
        return temp

    def __rpow__(self, other):
        temp = Lazy(operator.pow)
        temp.left = self
        temp.right = other
        return temp

    def __truediv__(self, other):
        temp = Lazy(operator.truediv)
        temp.left = self
        temp.right = other
        return temp

    def __rtruediv__(self, other):
        temp = Lazy(operator.truediv)
        temp.left = self
        temp.right = other
        return temp

    def __floordiv__(self, other):
        temp = Lazy(operator.floordiv)
        temp.left = self
        temp.right = other
        return temp

    def __rfloordiv__(self, other):
        temp = Lazy(operator.floordiv)
        temp.left = self
        temp.right = other
        return temp

    def __mod__(self, other):
        temp = Lazy(operator.mod)
        temp.left = self
        temp.right = other
        return temp

    def __rmod__(self, other):
        temp = Lazy(operator.mod)
        temp.left = self
        temp.right = other
        return temp

    def __pos__(self):
        temp = Lazy(operator.pos)
        temp.left = self
        temp.right = 0
        return temp

    def __neg__(self):
        temp = Lazy(operator.pos)
        temp.left = self
        temp.right = 0
        return temp

    def force(self):
        if isinstance(self.data, (int, float, complex, Lazy)):
            return self.data
        else:
            if isinstance(self.left, Lazy):
                x = self.left.force()
            else:
                x = self.left

            if isinstance(self.right, Lazy):
                y = self.right.force()
            else:
                y = self.right

            return reduce(self.data, [x, y])

    def bool(self):
        return bool(self.force())

    def int(self):
        return int(self.force())

    def float(self):
        return float(self.force())

    def str(self):
        return str(self.force())


lazy_number = (Lazy(1) + 2) * (3 + Lazy(4)) - 8
print(lazy_number.force())
