/* eslint-disable no-extend-native */
Object.defineProperty(Array.prototype, 'first', {
  value () {
    if (this.length === 0) {
      throw new ReferenceError('Error: The array is empty.')
    }
    return this[0]
  }
})

Object.defineProperty(Array.prototype, 'range', {
  value (from, to) {
    return Array(to - from + 1)
      .fill()
      .map((_, current) => from + current)
  }
})

Object.defineProperty(Array.prototype, 'sum', {
  value () {
    return this.reduce((previous, current) => previous + current, 0)
  }
})

Object.defineProperty(Array.prototype, 'average', {
  value () {
    return this.sum() / this.length
  }
})

console.log([1, 2, 3].first())
console.log([].range(1, 10))
console.log([1, 2, 3, 4].sum())
console.log([1, 2, 3, 4].average())
