def anagram(a, b):
    a = a.lower()
    b = b.lower()
    a_sorted = sorted(a)
    a = "".join(a_sorted)
    b_sorted = sorted(b)
    b = "".join(b_sorted)
    return a == b


print(anagram("AbCd", "AABb"))
print(anagram("BRADE", "BEARD"))
print(anagram("RaCe", "caRE"))