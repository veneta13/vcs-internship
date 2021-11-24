def palindrome(a, b):
    return a == b[::-1]


print(palindrome("abc", "cba"))
print(palindrome("abba", "abaa"))
print(palindrome("r", "r"))
