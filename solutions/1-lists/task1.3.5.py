def pos_even_nums(num_list):
    return len([ x for x in num_list if x % 2 == 0 and x > 0])

print(pos_even_nums([1,2,3,5,-2,2,10,-4]))