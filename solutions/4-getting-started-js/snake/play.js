/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function play () {
  timeObserver = new EventObserver();
  directionObserver = new DirectionObserver();
  collisionObserver = new CollisionObserver();
  timeObserver.subscribe(board);
  timeObserver.subscribe(snake);
  timeObserver.subscribe(apple);
  directionObserver.subscribe(snake);
  collisionObserver.subscribe(apple);

  board.update();
  apple.place(board);

  (function repeat () {
    checkCollisions();
    timeObserver.fire();
    timer = setTimeout(repeat, board.gameSpeed());
  })()
}

const checkCollisions = () => {
  for (let i = 0; i < snake.coordinates.length; i++) {
    if (snake.coordinates[i][0] > 39 ||
        snake.coordinates[i][0] < 1 ||
        snake.coordinates[i][1] > 39 ||
        snake.coordinates[i][1] < 1) {
      alert('Game over!');
    }
  }

  if (snake.coordinates[0][0] === apple.coordinates()[0] &&
      snake.coordinates[0][1] === apple.coordinates()[1]) {
    collisionObserver.fire(snake, board);
  }
}

document.addEventListener('keydown', (event) => {
  directionObserver.fire(event.key);
});
