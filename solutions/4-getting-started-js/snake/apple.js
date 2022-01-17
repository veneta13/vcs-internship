/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
const apple = (function () {
  let coordinates = [];
  let appleColor = 'red';
  const appleColors = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'purple'
  }
  const appleEffect = {
    'red': 'goSLower',
    'blue': 'goFaster',
    'yellow': 'grow',
    'purple': 'shrink'
  };

  const getType = () => {
    return appleColors[Math.ceil(Math.random() * 4)];
  }

  const setCoordinates = () => {
    const x = 1 + Math.round(Math.random() * BoardSize);
    const y = 1 + Math.round(Math.random() * BoardSize);
    coordinates = [x, y];
  }

  const update = () => {
    const canvas = document.getElementById('game-layer');
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
    eventObserver.fire(appleEffect[appleColor]);
    appleColor = getType();
  }

  eventObserver.subscribe('appleUpdate', update);
  eventObserver.subscribe('appleEaten', collisionUpdate);
  eventObserver.subscribe('applePlace', placeOnBoard);

  return {
    coordinates: returnCoordinates,
    place: placeOnBoard
  }
})()
