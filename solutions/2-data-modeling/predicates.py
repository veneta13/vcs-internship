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
        
    def __or__(self, other):
        return lambda x: True if other == True or self == True else False
    
class GreaterThan(Predicate):
    def __init__(self):
        self.funcs = lambda x: True if x > self.arg else False
    
    def __call__(self, arg):
        self.arg = arg
        return Predicate(self.funcs)

class LessThan(Predicate): 
    def __init__(self):
        self.funcs = lambda x: True if x < self.arg else False
    
    def __call__(self, arg):
        self.arg = arg
        return Predicate(self.funcs)

class EqualTo(Predicate): 
    def __init__(self):
        self.funcs = lambda x: True if x == self.arg else False
    
    def __call__(self, arg):
        self.arg = arg
        return Predicate(self.funcs)

class OfType(Predicate): 
    def __init__(self):
        self.funcs = lambda x: True if isinstance(x, self.arg) else False
    
    def __call__(self, arg):
        self.arg = arg
        return Predicate(self.funcs)
    
class Present(Predicate): 
    def __init__(self):
        self.funcs = lambda x: True if x is not None else False
    
    def __call__(self):
        return Predicate(self.funcs)

class Pred(Predicate): 
    def __init__(self):
        self.funcs = lambda x: True if self.arg(x) == True else False
    
    def __call__(self, arg):
        self.arg = arg
        return Predicate(self.funcs)

oftype = OfType()
gt = GreaterThan()
lt = LessThan()
digit = gt(-1) & lt(10)

# binary = eq(0) | eq(1)
# number = for_any(oftype(int), oftype(float), oftype(complex))
# is_the_empty_string = pred(lambda x: x is "")