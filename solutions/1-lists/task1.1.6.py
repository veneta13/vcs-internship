def count_substrings(haystack, needle):
    return haystack.count(needle)


print(count_substrings("This is a test string", "is"))
# 2
print(count_substrings("babababa", "baba"))
# 2
print(count_substrings("Python is an awesome language to program in!", "o"))
# 4
print(count_substrings("We have nothing in common!", "really?"))
# 0
print(count_substrings("This is this and that is this", "this"))
# 2
