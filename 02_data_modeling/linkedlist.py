class LinkedListIterator:
    def __init__(self, current):
        self.current = current

    def __iter__(self):
        return self

    def __next__(self):
        if self.current.data is None:
            raise StopIteration
        else:
            item = self.current.data
            self.current = self.current.next
            return item

class Cons:
    
    def __init__(self, data, next = None):
        self.data = data
        self.next = next
        self.lenght = 0 if next is None else next.lenght + 1

    def __getitem__(self, key, counter = 0):
        if key != counter:
            if key < 0:
                key = self.lenght + key
            return self.next.__getitem__(key, counter + 1)
        else: 
            return self.data
        
    def __iter__(self):
        return LinkedListIterator(self)

nil = Cons(None)

def make_list(*items):
    cons_list = [Cons(item) for item in items]
    cons_list.append(Cons(None, None))
    
    lenght_counter = 1
    for following, current in zip(cons_list[::-1], cons_list[-2::-1]):
        current.next = following
        current.lenght = lenght_counter
        lenght_counter += 1
        
    return cons_list[0]

# l = Cons(1, Cons(2, Cons(3, Cons(4, Cons(5, nil)))))
# print("l[1] = ", l[0])
# print("l[1] = ", l[-1])
# l_iter_list = [li + 1 for li in l]
# print("l iter list:", l_iter_list)

# m = make_list(1, 2, 3, 4, 5)
# print("m[1] = ", m[0])
# print("m[1] = ", m[-1])
# m_iter_list = [li + 1 for li in m]
# print("m iter list:", m_iter_list)

"""
Create a linked list with idiomatic python interface

Creation
========

    >>> l = Cons(1, Cons(2, Cons(3, Cons(4, Cons(5, nil)))))
    >>> l
    <1, 2, 3, 4, 5>
    >>> l = make_list(1, 2, 3, 4, 5)
    >>> l
    <1, 2, 3, 4, 5>

Iteration
=========

    >>> [li + 1 for li in l]
    [2, 3, 4, 5, 6]

Indexing:
=========

    >>> l[1]
    2
    >>> l[-2]
    4

"""


if __name__ == "__main__":
    import doctest

    doctest.testmod()