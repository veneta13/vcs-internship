def words_count(list, word):
    return len([answer for answer in list if answer == word])


print(words_count(['list', 'python', 'word'], 'word'))
print(words_count(['list', 'word', 'word'], 'word'))
