/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let gameOver = false;

function play () {
  eventObserver.fire('apple place', board);

  (function repeat () {
    if (!gameOver) {
      eventObserver.fire('snake update');
      eventObserver.fire('apple update');
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
      eventObserver.fire('game over');
      gameOver = true;
    }
  }

  if (snake.coordinates[0][0] === apple.coordinates()[0] &&
      snake.coordinates[0][1] === apple.coordinates()[1]) {
    eventObserver.fire('apple eaten', board);
  }
}

document.addEventListener('keydown', (event) => {
  eventObserver.fire('change snake direction', event.key);
});
