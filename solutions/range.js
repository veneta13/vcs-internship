var range = function (from, to) {
  if (from === to) {
    return to
  } else {
    return [range(from, to - 1)].flat().concat(to)
  }
}

console.log(range(1, 10))
