def upper_letters(string):
    result = [x for x in string if x.isupper()]
    return ''.join(map(str, result))

print(upper_letters("StrING"))