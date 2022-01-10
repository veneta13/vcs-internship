/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

const board = (function () {
  let gameSpeed = 0

  const initialize = () => {
    gameSpeed = snake.speed()
  }

  const update = () => {
    gameSpeed = snake.speed()
    snake.move()
    apple.draw()
  }

  const getSnakeCoordinates = () => {
    return snake.coordinates
  }

  const getAppleCoordinates = () => {
    return apple.coordinates
  }

  const changeSnakeDirection = direction => {
    snake.changeDirection(direction)
  }

  const getSpeed = () => {
    return gameSpeed
  }

  return {
    gameSpeed: getSpeed,
    initialize: initialize,
    update: update,
    getAppleCoordinates: getAppleCoordinates,
    getSnakeCoordinates: getSnakeCoordinates,
    changeSnakeDirection: changeSnakeDirection
  }
})()
