const occupied = []

const isFree = coord => {
  var flag = true
  occupied.forEach(function (element) {
    if (element[0] === coord[0] && element[1] === coord[1]) {
      flag = false
    }
  })
  return flag
}

const place = coord => {
  occupied.push(coord)
}

const remove = coord => {
  occupied.filter(function (element) {
    return element[0] !== coord[0] && element[1] !== coord[1]
  })
}

const board = {
  place: place,
  isFree: isFree,
  remove: remove
}

export default board
