var without = function (exclude, arr) {
  return arr.filter(arrItem => !exclude.includes(arrItem))
}

console.log(without([5, 6], [1, 2, 3, 4, 5, 6])) // [1,2,3,4]
