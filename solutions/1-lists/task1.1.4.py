def events_count(list):
    count = 0

    for x in list:
        if (x % 2 == 0):
            count+=1

    return count

print(events_count([1, 2, 4, 6]))
print(events_count([1, 3, 7, 5]))