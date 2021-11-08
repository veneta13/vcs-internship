from functools import wraps

def accepts(*types):
    def inner_function(function):
        @wraps(function)
        def wrapper(*args):
            for arg, type in zip(args, types):
                if not isinstance(arg, type):
                    raise TypeError("Argument {} of is not {}".format(arg, type))
        return wrapper
    return inner_function
 
@accepts(str)
def say_hello(name):
    return "Hello, I am {}".format(name)

say_hello(4)
# TypeError: Argument 1 of say_hello is not str!

say_hello("Hacker")

@accepts(str, int)
def deposit(name, money):
    print("{} sends {} $!".format(name, money))
    return True

deposit("RadoRado", 10)