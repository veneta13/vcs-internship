/* eslint-disable semi */
/* eslint-disable no-unused-vars */
function drawBoard () {
  const canvas = document.getElementById('board-layer');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, 0, 400, 10);
    ctx.fillRect(0, 0, 10, 400);
    ctx.fillRect(390, 0, 10, 400);
    ctx.fillRect(0, 390, 400, 10);

    for (let i = 10; i < 390; i += 20) {
      for (let j = 10; j < 390; j += 20) {
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(i, j, 10, 10);
      }
      for (let j = 20; j < 390; j += 20) {
        ctx.fillStyle = 'green';
        ctx.fillRect(i, j, 10, 10);
      }
    }

    for (let i = 20; i < 390; i += 20) {
      for (let j = 10; j < 390; j += 20) {
        ctx.fillStyle = 'green';
        ctx.fillRect(i, j, 10, 10);
      }
      for (let j = 20; j < 390; j += 20) {
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(i, j, 10, 10);
      }
    }
  }
}
