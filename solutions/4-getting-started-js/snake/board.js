/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

const board = (function () {
  const occupied = snake.coordinates;

  const displayGameOver = () => {
    var canvas = document.getElementById('game-layer');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'yellow';
      ctx.font = '70px sans-serif';
      ctx.fillText('Game Over', 16, 220);
    }
  }
  eventObserver.subscribe('game over', displayGameOver);

  return {
    displayGameOver,
    occupied
  }
})()
