var range = function (from, to) {
  if (from <= to) {
    return [from].concat(range(from + 1, to))
  } else {
    return []
  }
}

console.log(range(1, 10))
