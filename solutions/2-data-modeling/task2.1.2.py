def encrypt(key):
    def inner_function(function):
        def wrapper():
            text = function()
            new_text = ""
            for character in text:
                if character.islower():
                    new_text += chr((ord(character) + key - 97) % 26 + 97)
                elif character.isupper():
                    new_text += chr((ord(character) + key - 65) % 26 + 65)
                else:
                    new_text += character
            return new_text
        wrapper.__name__ = function.__name__
        wrapper.__doc__ = function.__doc__
        return wrapper
    return inner_function


@encrypt(2)
def get_low():
    return "Get get get low"

print(get_low())
# Igv igv igv nqy
