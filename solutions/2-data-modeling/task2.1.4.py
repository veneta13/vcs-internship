import time
from datetime import datetime
from functools import wraps

def performance(file_name):
    def inner_function(function):
        @wraps(function)
        def wrapper():
            
            start_time = datetime.now()
            text = function()
            time_needed = datetime.now() - start_time
            
            file = open(file_name, "a")
            file.write("{} was called and took {} to complete \n".format(function.__name__, time_needed))
            file.close()
            
            return text
        return wrapper
    return inner_function

@performance('log.txt')
def something_heavy():
    time.sleep(2)
    return "I am done!"

print(something_heavy())
# I am done!