// eslint-disable-next-line no-unused-vars
const apple = (function () {
  let coordinates = []

  const getType = () => {
    return Math.random()
  }

  const getCoordinates = () => {
    const x = 1 + Math.round(Math.random() * 37)
    const y = 1 + Math.round(Math.random() * 37)
    coordinates = [x, y]
  }

  const draw = () => {
    var canvas = document.getElementById('game-layer')
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'red'
      ctx.fillRect(coordinates[0] * 10, coordinates[1] * 10, 10, 10)
    }
  }

  const placeOnBoard = board => {
    const snakeCoord = board.getSnakeCoordinates()
    getCoordinates()
    while (snakeCoord[0][0] === coordinates[0] ||
           snakeCoord[0][1] === coordinates[1]) {
      getCoordinates()
    }
  }

  const changeSnake = snake => {
    const type = getType()
    if (type <= 0.25) {
      snake.goSLower()
      return snake
    }
    if (type <= 0.5) {
      snake.goFaster()
      return snake
    }
    if (type <= 0.75) {
      snake.shrink()
      return snake
    }
    if (type <= 1) {
      snake.elongate()
      return snake
    }
  }

  const returnCoordinates = () => {
    return coordinates
  }

  return {
    coordinates: returnCoordinates,
    place: placeOnBoard,
    changeSnake: changeSnake,
    draw: draw
  }
})()
