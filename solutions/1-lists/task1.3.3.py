def dict_len(*strings):
    keys = [string for string in strings]
    values = [len(string) for string in strings]
    result = {k:v for (k,v) in zip(keys, values)}
    return result

print(dict_len("", "alabala", "string"))