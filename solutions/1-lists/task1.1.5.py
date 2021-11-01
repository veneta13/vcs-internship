def words_count(list, word):
    count = 0

    for i in list:
        if i == word:
            count+=1

    return count

print (words_count(['list', 'python', 'word'], 'word'))
print (words_count(['list', 'word', 'word'], 'word'))