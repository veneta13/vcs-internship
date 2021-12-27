let coordinates

const getType = () => {
  return Math.random()
}

const getCoordinates = () => {
  const x = Math.random() * 390
  const y = Math.random() * 390
  return [x, y]
}

const placeOnBoard = board => {
  coordinates = getCoordinates()
  while (!board.isFree(coordinates)) {
    coordinates = getCoordinates()
  }
  board.place(coordinates)
  return board
}

const changeSnake = snake => {
  const type = getType()
  if (type <= 0.25) {
    snake.speed += 0.1
    return snake
  }
  if (type <= 0.5) {
    snake.speed -= 0.1
    return snake
  }
  if (type <= 0.75) {
    snake.shrink()
    return snake
  }
  if (type <= 1) {
    snake.elongate(coordinates)
    return snake
  }
}

const apple = {
  place: placeOnBoard,
  snake: changeSnake
}

export default apple
