class Shape {
  getType () {
    return this.type
  }
}

Shape.prototype.area = function () {}

class Rectangle extends Shape {
  constructor (a, b) {
    super()
    this.type = 'rectangle'
    this.a = a
    this.b = b
  }

  area () {
    return this.a * this.b
  }
}

class Triangle extends Shape {
  constructor (c, h) {
    super()
    this.type = 'triangle'
    this.c = c
    this.h = h
  }

  area () {
    return this.c * this.h / 2
  }
}

class Circle extends Shape {
  constructor (r) {
    super()
    this.type = 'circle'
    this.r = r
  }

  area () {
    return Math.PI * Math.pow(r, 2)
  }
}

var r = new Rectangle(4, 5)
var t = new Triangle(5, 6)
var c = new Circle(5)
console.log(r.getType())
console.log(t.getType())
console.log(c.getType())
