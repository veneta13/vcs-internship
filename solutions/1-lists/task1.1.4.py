def events_count(list):
    return len([number for number in list if number % 2 == 0])


print(events_count([1, 2, 4, 6]))
print(events_count([1, 3, 7, 5]))
