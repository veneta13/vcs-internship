def upper_count(string):
    return len([x for x in string if x.isupper()])

print(upper_count("StrING"))
print(upper_count("alabala"))