class Pair {
  constructor (left, right) {
    this.left = left
    this.right = right
  }

  equals (pair) {
    return this.left === pair.left && this.right === pair.right
  }

  toString () {
    return '(' + this.left + ', ' + this.right + ')'
  }

  toList () {
    return [this.left, this.right]
  }

  combine (f) {
    return f(this.left, this.right)
  }
}

var p = new Pair(4, 6)

console.log(p.combine(function (left, right) {
  return left + right
}))
