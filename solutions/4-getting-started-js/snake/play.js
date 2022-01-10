/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let direction = 'ArrowRight'

function play () {
  const timeObserver = new EventObserver()
  board.initialize()
  apple.place(board)
  timeObserver.subscribe(board);

  (function repeat () {
    board.changeSnakeDirection(direction)
    timeObserver.fire()
    checkCollisions()
    timer = setTimeout(repeat, board.gameSpeed())
  })()
}

const checkCollisions = () => {
  for (let i = 0; i < snake.coordinates.length; i++) {
    if (snake.coordinates[i][0] > 39 ||
          snake.coordinates[i][0] < 1 ||
          snake.coordinates[i][1] > 39 ||
          snake.coordinates[i][1] < 1) {
      alert('Game over!')
    }
  }

  if (snake.coordinates[0][0] === apple.coordinates()[0] &&
      snake.coordinates[0][1] === apple.coordinates()[1]) {
    snake = apple.changeSnake(snake)
    apple.place(board)
  }
}

document.addEventListener('keydown', (event) => {
  direction = event.key
})
