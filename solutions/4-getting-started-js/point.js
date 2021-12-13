class Point {
  #x
  #y

  constructor (x, y) {
    this.#x = x
    this.#y = y
  }

  get x () {
    return this.#x
  }

  get y () {
    return this.#y
  }

  xInc () {
    this.#x += 1
  }

  xDec () {
    this.#x -= 1
  }

  yInc () {
    this.#y += 1
  }

  yDec () {
    this.#y -= 1
  }

  equals (point) {
    return this.#x === point.x && this.#y === point.y
  }

  toString () {
    return 'Point @ ' + this.#x + ', ' + this.#y
  }
}

const p1 = new Point(2, 1)
p1.xInc()
console.log(p1.toString())
