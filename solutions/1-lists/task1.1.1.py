def triangle_type(a, b, c):

    if a == b and b == c:
        return "равностранен"
    elif a == b or b == c or c == a:
        return "равнобедрен"
    else:
        return "разностранен"


triangle_type(1, 1, 1)
# равностранен

triangle_type(1.41, 1.41, 2)
# равнобедрен

triangle_type(3, 4, 5)
# разностранен
