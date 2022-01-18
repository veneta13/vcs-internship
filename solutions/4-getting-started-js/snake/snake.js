/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

let snake = (function () {
  let direction = 'ArrowRight';
  let speed = 400;
  const coordinates = [[19, 19], [19, 20], [19, 21]];

  const draw = () => {
    var canvas = document.getElementById('game-layer');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'yellow';
      for (let i = 0; i < coordinates.length; i++) {
        ctx.fillRect(coordinates[i][0] * 10, coordinates[i][1] * 10, 10, 10);
      }
    }
  }

  const changeDirection = newDirection => {
    direction = newDirection[0];
  }

  const returnSpeed = () => {
    return speed;
  }

  const update = () => {
    move();
    draw();
  }

  const move = () => {
    const head = [...coordinates[0]];
    switch (direction) {
      case 'ArrowRight':
        head[0] += 1;
        coordinates.unshift(head);
        coordinates.pop();
        break;
      case 'ArrowLeft':
        head[0] -= 1;
        coordinates.unshift(head);
        coordinates.pop();
        break;
      case 'ArrowDown':
        head[1] += 1;
        coordinates.unshift(head);
        coordinates.pop();
        break;
      case 'ArrowUp':
        head[1] -= 1;
        coordinates.unshift(head);
        coordinates.pop();
    }
  }

  const shrink = () => {
    coordinates.pop();
    if (coordinates.length === 0) {
      eventObserver.fire(this, 'gameOver');
    }
  }

  const grow = () => {
    const head = [...coordinates[0]];
    if (direction === 'ArrowRight') {
      coordinates.push([head[0] + 1, head[1]]);
    } else if (direction === 'ArrowLeft') {
      coordinates.push([head[0] - 1, head[1]]);
    } else if (direction === 'ArrowDown') {
      coordinates.push([head[0], head[1] - 1]);
    } else if (direction === 'ArrowUp') {
      coordinates.push([head[0] - 1, head[1] + 1]);
    }
  }

  const goFaster = () => {
    speed -= 100;
    if (speed < 1) {
      eventObserver.fire('gameOver');
    }
  }

  const goSlower = () => {
    speed += 100;
  }

  eventObserver.subscribe('changeSnakeDirection', changeDirection);
  eventObserver.subscribe('snakeUpdate', update);
  eventObserver.subscribe('goSlower', goSlower);
  eventObserver.subscribe('goFaster', goFaster);
  eventObserver.subscribe('grow', grow);
  eventObserver.subscribe('shrink', shrink);

  return {
    coordinates,
    speed: returnSpeed
  }
})()
