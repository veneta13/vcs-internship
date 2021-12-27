const speed = 1
let coordinates = [[20, 20]]

const draw = () => {
  var canvas = document.getElementById('game-layer')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'yellow'
    for (let i = 0; i < coordinates.length; i++) {
      ctx.fillRect(coordinates[0] * 10, coordinates[1] * 10, 10, 10)
    }
  }
}

const move = direction => {
  const head = coordinates[0]
  switch (direction) {
    case 1:
      head[0] += 1
      coordinates = coordinates.concat(coordinates)
      break
    case 2:
      head[0] -= 1
      coordinates = coordinates.concat(coordinates)
      break
    case 3:
      head[1] += 1
      coordinates = coordinates.concat(coordinates)
      break
    default:
      head[1] -= 1
      coordinates = coordinates.concat(coordinates)
  }
}

const shrink = () => {
  coordinates = coordinates.slice(1)
}

const elongate = newCoords => {
  coordinates = newCoords.concat(coordinates)
}

const snake = {
  shrink: shrink,
  elongate: elongate,
  speed: speed,
  draw: draw,
  move: move
}

export default snake
