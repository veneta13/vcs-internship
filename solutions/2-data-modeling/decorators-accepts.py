def accepts(*types):
    def inner_function(function):
        def wrapper(*args):
            for arg, type in zip(args, types):
                if not isinstance(arg, type):
                    raise TypeError("Argument {} of {} is not {}!"
                                    .format(args.index(arg) + 1,
                                            function.__name__,
                                            type.__name__))
            return function(*args)
        return wrapper
    return inner_function


@accepts(str)
def say_hello(name):
    return "Hello, I am {}".format(name)


# say_hello(4)
# TypeError: Argument 1 of say_hello is not str!

print(say_hello("Hacker"))


@accepts(str, int)
def deposit(name, money):
    print("{} sends {} $!".format(name, money))
    return True


deposit("RadoRado", 10)
