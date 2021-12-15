var queue = {
  data: [],
  push: function (item) {
    this.data.push(item)
  },
  pop: function () {
    this.data.pop()
  },
  isEmpty: function () {
    return this.data.length === 0
  }
}

console.log(queue.isEmpty())
