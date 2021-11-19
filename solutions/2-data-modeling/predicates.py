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

def for_any(*other):
    return lambda x: True if any(func(x) == True for func in other) else False

def for_all(*other):
    return lambda x: True if all(func(x) == True for func in other) else False

oftype = OfType()
oftype1 = OfType()
oftype2 = OfType()
oftype3 = OfType()
gt = GreaterThan()
lt = LessThan()
eq0 = EqualTo()
eq1 = EqualTo()
eq2 = EqualTo()
pred = Pred()

digit = oftype(int) & gt(-1) & lt(10)
binary = eq0(0) | eq1(1)
number = for_any(oftype1(int), oftype2(float), oftype3(complex))
is_the_empty_string = pred(lambda x: x is "")
is_not_2 = ~eq2(2)

print(digit(-0.2))
print(binary(3))
print(number(5))
print(number(5))
print(is_the_empty_string(""))
print(is_not_2(3))
