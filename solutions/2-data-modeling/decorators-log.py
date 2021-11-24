from datetime import datetime


def encrypt(key):
    def inner_function(function):
        text = function()
        new_text = ""
        for character in text:
            if character.islower():
                new_text += chr((ord(character) + key - 97) % 26 + 97)
            elif character.isupper():
                new_text += chr((ord(character) + key - 65) % 26 + 65)
            else:
                new_text += character
        return lambda x = new_text: [x, function.__name__]
    return inner_function


def log(file_name):
    def inner_function(function):
        text = function()[0]
        file = open(file_name, "a")
        file.write("{} was called at {} \n"
                   .format(function()[1], datetime.now()))
        file.close()
        return lambda x = text: x
    return inner_function


@log('log.txt')
@encrypt(2)
def get_low():
    return "Get get get low"


print(get_low())
# Igv igv igv nqy
