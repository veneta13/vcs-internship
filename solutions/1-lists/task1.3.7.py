import operator
import functools


def sq(n):
    return n * n


def sq_sum(a, b):
    return functools.reduce(operator.add, list(map(sq, range(a, b))))


print(sq_sum(1, 4))
