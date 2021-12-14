import { Point } from './point.js'

class Robot {
  #startPoint

  constructor (point) {
    this.#startPoint = point
  }

  moveLeft (amount) {
    for (let i = 0; i < amount; i++) {
      this.#startPoint.xDec()
    }
  }

  moveRight (amount) {
    for (let i = 0; i < amount; i++) {
      this.#startPoint.xInc()
    }
  }

  moveUp (amount) {
    for (let i = 0; i < amount; i++) {
      this.#startPoint.yDec()
    }
  }

  moveDown (amount) {
    for (let i = 0; i < amount; i++) {
      this.#startPoint.yInc()
    }
  }

  getPosition () {
    return this.#startPoint
  }
}

const robot = new Robot(new Point(0, 0))

robot.moveLeft(10)
robot.moveDown(5)

console.log(robot.getPosition().toString()) // Point @ -10, 5
