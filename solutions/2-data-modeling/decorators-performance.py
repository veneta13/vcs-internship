import time
from datetime import datetime


def performance(file_name):
    def inner_function(function):
        start_time = datetime.now()
        text = function()
        time_needed = (datetime.now() - start_time).total_seconds()
        file = open(file_name, "a")
        file.write("{} was called and took {} seconds to complete \n"
                   .format(function.__name__, time_needed))
        file.close()
        return lambda x = text: x
    return inner_function


@performance('log.txt')
def something_heavy():
    time.sleep(2)
    return "I am done!"


print(something_heavy())
# I am done!
