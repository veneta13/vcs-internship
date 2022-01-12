/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

const board = (function () {
  let gameSpeed = 0;

  const update = () => {
    gameSpeed = snake.speed();
  }

  const getSnakeCoordinates = () => {
    return snake.coordinates;
  }

  const getSpeed = () => {
    return gameSpeed;
  }

  return {
    gameSpeed: getSpeed,
    update,
    getSnakeCoordinates
  }
})()
