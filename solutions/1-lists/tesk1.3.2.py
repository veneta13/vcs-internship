def function(a, b):
    keys = [x for x in range(a,b)]
    values = [x%5 for x in range(a,b)]
    return {k:v for (k, v) in zip(keys, values)}

print(function(1, 10))