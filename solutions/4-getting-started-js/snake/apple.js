/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
const apple = (function () {
  let coordinates = [];
  let appleColor = 'red';

  const getType = () => {
    return Math.random() * 4;
  }

  const setCoordinates = () => {
    const x = 1 + Math.round(Math.random() * 37);
    const y = 1 + Math.round(Math.random() * 37);
    coordinates = [x, y];
  }

  const update = () => {
    var canvas = document.getElementById('game-layer');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = appleColor;
      ctx.fillRect(coordinates[0] * 10, coordinates[1] * 10, 10, 10);
    }
  }

  const returnCoordinates = () => {
    return coordinates;
  }

  const collisionUpdate = board => {
    changeColor();
    placeOnBoard(board);
  }

  const placeOnBoard = board => {
    const occupiedBoard = board[0].occupied;
    setCoordinates();
    while (occupiedBoard[0][0] === coordinates[0] ||
           occupiedBoard[0][1] === coordinates[1]) {
      setCoordinates();
    }
  }

  const changeColor = () => {
    eventObserver.fire('change snake', appleColor);
    const type = getType();
    if (type <= 1) {
      appleColor = 'red';
    }
    if (type > 1 && type <= 2) {
      appleColor = 'blue';
    }
    if (type > 2 && type <= 3) {
      appleColor = 'yellow';
    }
    if (type > 3 && type <= 4) {
      appleColor = 'purple';
    }
  }

  eventObserver.subscribe('apple update', update);
  eventObserver.subscribe('apple eaten', collisionUpdate);
  eventObserver.subscribe('apple place', placeOnBoard);

  return {
    coordinates: returnCoordinates,
    place: placeOnBoard
  }
})()
