class Predicate:
    
    def __init__(self, *funcs):
        self.funcs = [func for func in funcs]

    def __call__(self, x):
        for func in self.funcs:
            if func(x) == False:
                return False
        return True
    
    def __and__(self, other):
        if callable(other):
            return lambda x: True if other(x) == True and self(x) == True else False
        else:
            return lambda x: True if other == True and self(x) == True else False
        
    def __rand__(self, other):
        if callable(other):
            return lambda x: True if other(x) == True and self(x) == True else False
        else:
            return lambda x: True if other == True and self(x) == True else False
        
    def __or__(self, other):
        if callable(other):
            return lambda x: True if other(x) == True or self(x) == True else False
        else:
            return lambda x: True if other == True or self(x) == True else False
        
    def __ror__(self, other):
        if callable(other):
            return lambda x: True if other(x) == True or self(x) == True else False
        else:
            return lambda x: True if other == True or self(x) == True else False
        
    def __invert__(self):
        return lambda x: True if self(x) == False else False
    
    def __rshift__(self, other):
        return lambda x: True if not(self(x)) or other(x) else False

def for_any(*other):
    return lambda x: True if any(func(x) == True for func in other) else False

def for_all(*other):
    return lambda x: True if all(func(x) == True for func in other) else False

gt = lambda y: lambda x: True if x > y else False
lt = lambda y: lambda x: True if x < y else False
eq = lambda y: lambda x: True if x == y else False
oftype = lambda t: lambda x: True if isinstance(x, t) else False
present = lambda: lambda x: True if x is not None else False
pred = lambda func: lambda x: True if func(x) == True else False

gr_0 = Predicate(gt(0))
gr_5 = Predicate(gt(5))
is_int = Predicate(oftype(int))

g3 = Predicate()
g3 = gr_0 & gr_5 & is_int
print(g3(6))