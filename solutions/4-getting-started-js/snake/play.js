/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// eslint-disable-next-line prefer-const
let GameOver = false;
const BoardSize = 37;

function play () {
  eventObserver.fire('applePlace', board);

  (function repeat () {
    if (!GameOver) {
      eventObserver.fire('snakeUpdate');
      eventObserver.fire('appleUpdate');
      checkCollisions();
      timer = setTimeout(repeat, snake.speed());
    }
  })()
}

const checkCollisions = () => {
  for (let i = 0; i < snake.coordinates.length; i++) {
    if (snake.coordinates[i][0] > 39 ||
        snake.coordinates[i][0] < 1 ||
        snake.coordinates[i][1] > 39 ||
        snake.coordinates[i][1] < 1) {
      eventObserver.fire('gameOver');
    }
  }

  if (snake.coordinates[0][0] === apple.coordinates()[0] &&
      snake.coordinates[0][1] === apple.coordinates()[1]) {
    eventObserver.fire('appleEaten', board);
  }
}

document.addEventListener('keydown', (event) => {
  eventObserver.fire('changeSnakeDirection', event.key);
});
