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

    def next(self):
        return self.current.next.data

class Cons:
    
    def __init__(self, data, next = None):
        self.data = data
        self.next = next

    def __getitem__(self, key):
        itemCount = self.__countItems()
        
        if key < 0:
            key = itemCount + key
        if key >= itemCount:
            raise IndexError("Index out of range")
        
        current = self
        counter = 0
        while counter != key:
            current = current.next
            counter += 1
        return current.data

    def __iter__(self):
        return LinkedListIterator(self)

    def __countItems(self):
        current = self
        counter = 1
        while current.next.data is not None:
            current = current.next
            counter += 1
        return counter

nil = Cons(None)

def make_list(*items):
    cons_list = [Cons(item) for item in items]
    cons_list.append(Cons(None, None))
    for following, current in zip(cons_list[::-1], cons_list[-2::-1]):
        current.next = following
    return cons_list[0]

# l = Cons(1, Cons(2, Cons(3, Cons(4, Cons(5, nil)))))
# print("l[4] = ", l[4])
# print("l[0] = ", l[0])
# print("l[-4] = ", l[-4])

# myiter = iter(l)
# print("myiter.next() = ", myiter.next())

# print("next(myiter) = " ,next(myiter))
# print("next(myiter) = " ,next(myiter))

# l_iter_list = [li + 1 for li in l]
# print("l iter list:", l_iter_list)

# m = make_list(1, 2, 3, 4, 5)
# print("m[1] = ", m[1])
# print("m[-1] = ", m[-1])
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