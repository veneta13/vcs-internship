/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
const apple = (function () {
  let coordinates = [];
  const appleTypes = {
    1: {
      color: 'red',
      effect: 'goSlower'
    },
    2: {
      color: 'yellow',
      effect: 'grow'
    },
    3: {
      color: 'blue',
      effect: 'goFaster'
    },
    4: {
      color: 'purple',
      effect: 'shrink'
    }
  }
  let currentApple = appleTypes[1];

  const getType = () => {
    return appleTypes[Math.ceil(Math.random() * 4)];
  }

  const setCoordinates = () => {
    const x = 1 + Math.round(Math.random() * BOARD_SIZE);
    const y = 1 + Math.round(Math.random() * BOARD_SIZE);
    coordinates = [x, y];
  }

  const update = () => {
    const canvas = document.getElementById('game-layer');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = currentApple.color;
      ctx.fillRect(coordinates[0] * 10, coordinates[1] * 10, 10, 10);
    }
  }

  const returnCoordinates = () => {
    return coordinates;
  }

  const collisionUpdate = board => {
    changeApple();
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

  const changeApple = () => {
    eventObserver.fire(currentApple.effect);
    currentApple = getType();
  }

  eventObserver.subscribe('appleUpdate', update);
  eventObserver.subscribe('appleEaten', collisionUpdate);
  eventObserver.subscribe('applePlace', placeOnBoard);

  return {
    coordinates: returnCoordinates,
    place: placeOnBoard
  }
})()
