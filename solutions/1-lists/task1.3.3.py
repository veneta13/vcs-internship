def dict_len(*strings):
    return {x: len(x) for x in strings}


print(dict_len("", "alabala", "string"))
