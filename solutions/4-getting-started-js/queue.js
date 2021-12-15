var queue = {
  data: [],
  push: function (item) {
    this.data.push(item)
  },
  pop: function () {
    return this.data.pop()
  },
  isEmpty: function () {
    return this.data.length === 0
  }
}

queue.push(5)
console.log(queue.pop())
